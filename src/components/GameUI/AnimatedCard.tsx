import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AnimatedCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  bgColor,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick?.();
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg
        transform transition-all duration-300 ease-out cursor-pointer
        ${isHovered ? 'scale-105 shadow-2xl -translate-y-2' : 'scale-100 shadow-lg'}
        ${isClicked ? 'scale-95' : ''}
        hover:border-gray-300
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Animated Background Gradient */}
      <div className={`
        absolute inset-0 opacity-0 transition-opacity duration-300
        ${isHovered ? 'opacity-10' : 'opacity-0'}
        bg-gradient-to-br ${bgColor}
      `} />
      
      {/* Floating Particles Effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 ${bgColor.split(' ')[1]} rounded-full
                animate-ping opacity-60
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 tracking-wide uppercase">
            {title}
          </p>
          <p className={`
            text-3xl font-bold transition-all duration-300
            ${isHovered ? 'text-4xl' : 'text-3xl'}
            text-gray-900
          `}>
            {value}
          </p>
          {change && (
            <p className={`
              text-sm font-medium transition-all duration-300
              ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}
              ${isHovered ? 'text-base' : 'text-sm'}
            `}>
              {change} from last month
            </p>
          )}
        </div>
        
        <div className={`
          p-4 rounded-full transition-all duration-300 transform
          ${bgColor} ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
        `}>
          <Icon className={`
            w-8 h-8 transition-all duration-300
            ${color} ${isHovered ? 'w-10 h-10' : 'w-8 h-8'}
          `} />
        </div>
      </div>

      {/* Pulse Effect on Click */}
      {isClicked && (
        <div className="absolute inset-0 bg-white opacity-30 animate-ping rounded-xl" />
      )}

      {/* Glow Effect */}
      <div className={`
        absolute inset-0 rounded-xl transition-all duration-300
        ${isHovered ? `shadow-2xl ${bgColor.replace('bg-', 'shadow-')}` : ''}
      `} />
    </div>
  );
};