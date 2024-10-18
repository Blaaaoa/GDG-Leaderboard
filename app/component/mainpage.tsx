"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import { MagicCard } from "./ui/magic-card"; // Import the MagicCard component
import Particles from "./ui/meteors"; // Import the particles background

const HomePage = () => {
  const theme: string = "light"; // Can toggle between "light" and "dark"

  // Dummy leaderboard data
  const leaderboardData = [
    { name: "John Doe", score: 95 },
    { name: "Jane Smith", score: 90 },
    { name: "Alice Johnson", score: 85 },
  ];

  // Animation settings for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slightly faster delay between cards
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-800 overflow-hidden">
      {/* Particles background */}
      <Particles
        className="absolute inset-0 z-0" // Ensure it's behind other elements
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="container mx-auto p-12">
          {/* Staggered animation for MagicCard components */}
          <motion.div
            className="grid grid-cols-1 gap-4 lg:grid-cols-1"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {leaderboardData.map((leader, index) => (
              <motion.div key={index} variants={cardVariants}>
                <MagicCard
                  className="flex-row items-center justify-between text-left p-4 shadow-lg rounded-lg w-full max-w-2xl mx-auto" // Increased max width
                  gradientColor="#D9D9D955"
                >
                  <div className="flex justify-between w-full">
                    <h3 className="text-base font-medium">{leader.name}</h3>
                    <p className="text-base font-semibold">Score: {leader.score}</p>
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
