import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Main Shield / Pin outline in deep navy */}
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="#0B1F3A"
          className="dark:fill-slate-900"
        />

        {/* Saffron (left) and Green (right) curved borders to represent India tricolor */}
        <path
          d="M12 3.5C9.5 3.5 7.5 5.5 7.5 9c0 3.5 3.5 7.5 4.5 8.5"
          stroke="#FF9933"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M12 3.5C14.5 3.5 16.5 5.5 16.5 9c0 3.5-3.5 7.5-4.5 8.5"
          stroke="#138808"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        {/* Central white chat bubble */}
        <path
          d="M9.5 7.5h5C15.3 7.5 16 8.2 16 9v2.5c0 .8-.7 1.5-1.5 1.5h-2.2l-1.5 1.5v-1.5h-1.3C8.7 13 8 12.3 8 11.5V9c0-.8.7-1.5 1.5-1.5z"
          fill="#FFFFFF"
        />

        {/* Tiny AI Sparkle/Orb in the center representing intelligence */}
        <circle cx="12" cy="10" r="1.5" fill="#fe9832" />
        <circle cx="10" cy="11.2" r="0.75" fill="#138808" />
        <circle cx="14" cy="8.8" r="0.75" fill="#FF9933" />
      </svg>
    </div>
  );
};
export default Logo;
