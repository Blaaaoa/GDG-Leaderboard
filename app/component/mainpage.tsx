'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import { MagicCard } from "./ui/magic-card";
import ParticlesBackground from "./ui/particles";

const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    // Fetch leaderboard data from localStorage or API if needed
    const storedData = localStorage.getItem('leaderboardData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLeaderboardData(parsedData.sort((a: any, b: any) => b.score - a.score));
    }
  }, []);

  // Animation settings for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  console.log(leaderboardData);

  return (
    <div className="relative min-h-screen w-full bg-transparent dark:bg-gray-800 overflow-hidden">
      <ParticlesBackground />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="container mx-auto p-12">
          <motion.div
            className="grid grid-cols-1 gap-4 lg:grid-cols-1"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {leaderboardData.map((leader, index) => (
              <motion.div key={index} variants={cardVariants}>
                <MagicCard
                  className="flex-row items-center justify-between p-4 shadow-lg rounded-lg w-full max-w-2xl mx-auto"
                  gradientColor="#D9D9D955"
                >
                  <div className="flex justify-between w-full">
                    <h3 className="text-base font-medium">{leader.name}</h3>
                    <p className="text-base font-semibold float-right ml-auto">Score: {leader.score}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
