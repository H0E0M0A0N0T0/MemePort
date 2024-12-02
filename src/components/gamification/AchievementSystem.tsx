import React from 'react';
import { Trophy, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export function AchievementSystem() {
  const achievements = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Meme Lord",
      progress: 75,
      description: "Complete 100 swaps",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Volume King",
      progress: 45,
      description: "$100K in volume",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Chain Master",
      progress: 60,
      description: "Use 5 different chains",
    },
  ];

  return (
    <div className="bg-[#141414] rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 rounded-lg p-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600/20 to-indigo-600/20 flex items-center justify-center text-[#00FF94]">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{achievement.title}</h4>
                <p className="text-sm text-gray-400">{achievement.description}</p>
                <div className="mt-2 h-2 bg-gray-700 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#00FF94] to-[#FF00F5]"
                  />
                </div>
              </div>
              <span className="text-white font-medium">{achievement.progress}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}