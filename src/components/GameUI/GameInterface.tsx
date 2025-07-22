import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Trophy, 
  Target, 
  Star, 
  Gamepad2,
  TrendingUp,
  Package,
  DollarSign,
  Users
} from 'lucide-react';

interface GameStats {
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  streak: number;
  achievements: string[];
}

export const GameInterface: React.FC = () => {
  const [stats, setStats] = useState<GameStats>({
    level: 12,
    xp: 2450,
    maxXp: 3000,
    coins: 15750,
    streak: 7,
    achievements: ['First Sale', 'Inventory Master', 'Customer Champion']
  });

  const [showLevelUp, setShowLevelUp] = useState(false);

  const xpPercentage = (stats.xp / stats.maxXp) * 100;

  const addXP = (amount: number) => {
    setStats(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 1000) + 1;
      
      if (newLevel > prev.level) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
      
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        coins: prev.coins + (amount * 2)
      };
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-4 rounded-lg shadow-2xl">
      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-2xl font-bold animate-bounce shadow-2xl">
            🎉 LEVEL UP! Level {stats.level} 🎉
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">MedWholesale Pro</h3>
            <p className="text-sm opacity-80">Business Management Game</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="font-bold">Level {stats.level}</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-green-300" />
              <span className="font-bold">{stats.coins.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Experience</span>
          <span>{stats.xp} / {stats.maxXp} XP</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
          <Package className="w-6 h-6 mx-auto mb-1 text-blue-300" />
          <div className="text-lg font-bold">1,247</div>
          <div className="text-xs opacity-80">Products</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
          <Users className="w-6 h-6 mx-auto mb-1 text-green-300" />
          <div className="text-lg font-bold">456</div>
          <div className="text-xs opacity-80">Customers</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
          <TrendingUp className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
          <div className="text-lg font-bold">₹2.4M</div>
          <div className="text-xs opacity-80">Revenue</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
          <Target className="w-6 h-6 mx-auto mb-1 text-red-300" />
          <div className="text-lg font-bold">{stats.streak}</div>
          <div className="text-xs opacity-80">Day Streak</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <button 
          onClick={() => addXP(100)}
          className="flex-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          <Zap className="w-4 h-4 inline mr-1" />
          Complete Sale (+100 XP)
        </button>
        
        <button 
          onClick={() => addXP(50)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          <Trophy className="w-4 h-4 inline mr-1" />
          Add Product (+50 XP)
        </button>
      </div>

      {/* Achievements */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
        <div className="flex space-x-2">
          {stats.achievements.slice(0, 3).map((achievement, index) => (
            <div key={index} className="bg-yellow-500/20 px-2 py-1 rounded text-xs">
              🏆 {achievement}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};