
'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import CSVReader from 'react-csv-reader';

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, "_"),
};

const Leaderboard = () => {
  interface Leader {
    name: string;
    badges: number;
  }

  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch and parse the initial CSV file
    const fetchData = async () => {
      try {
        const response = await fetch('/path-to-your-csv-file.csv'); // Add the path to your CSV file
        const csvText = await response.text();

        // Parse CSV file
        Papa.parse<any>(csvText, {
          header: true,
          complete: (result) => {
            // Extract relevant data (Name and # of Skill Badges Completed)
            const parsedData = result.data.map((row) => ({
              name: (row as any)['User Name'],
              badges: parseInt(row['# of Skill Badges Completed'], 10),
            }));

            // Sort data based on number of badges
            parsedData.sort((a, b) => b.badges - a.badges);
            setLeaders(parsedData);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCSVUpload = (uploadedData: any[]) => {
    const leaderboardData = uploadedData.map((entry) => ({
      name: entry.name,
      badges: parseInt(entry.skill_badges_completed),
    }));

    // Sort data based on number of badges
    leaderboardData.sort((a, b) => b.badges - a.badges);
    setLeaders(leaderboardData);
  };

  return (
    <div>
      <h1>GDG Leaderboard</h1>

      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV with Skill Badges Data"
        onFileLoaded={handleCSVUpload}
        parserOptions={papaparseOptions}
      />
      <p>Upload the CSV to update leaderboard data.</p>

      <div>
        {loading ? (
          <p>Loading leaderboard...</p>
        ) : (
          <ul>
            {leaders.map((leader, index) => (
              <li key={index}>
                <span>{index + 1}. {leader.name}</span>
                <span> - {leader.badges} badges</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
