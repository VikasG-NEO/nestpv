import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
  xl: "h-16",
};

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function Logo({
  className,
  variant = "default",
  showWordmark = true,
  size = "md"
}: LogoProps) {
  const primaryColor = variant === "light" ? "#ffffff" : "hsl(213, 55%, 20%)";
  const accentColor = "hsl(25, 95%, 53%)";

  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
      {/* Logo Icon - Nest with Connected People */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size], "aspect-square")}
      >
        {/* Outer nest shape */}
        <path
          d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z"
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner nest arc */}
        <path
          d="M12 28c0-6.627 5.373-12 12-12s12 5.373 12 12"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Center person */}
        <circle cx="24" cy="22" r="4" fill={accentColor} />
        <path
          d="M24 28c-3 0-5 2-5 4v2h10v-2c0-2-2-4-5-4z"
          fill={accentColor}
        />
        {/* Left person */}
        <circle cx="14" cy="32" r="3" fill={primaryColor} />
        <path
          d="M14 36c-2 0-3.5 1.5-3.5 3v1.5h7V39c0-1.5-1.5-3-3.5-3z"
          fill={primaryColor}
        />
        {/* Right person */}
        <circle cx="34" cy="32" r="3" fill={primaryColor} />
        <path
          d="M34 36c-2 0-3.5 1.5-3.5 3v1.5h7V39c0-1.5-1.5-3-3.5-3z"
          fill={primaryColor}
        />
        {/* Connection lines */}
        <path
          d="M18 30L21 27M30 30L27 27"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-bold tracking-tight",
              textSizes[size],
              variant === "light" ? "text-white" : "text-black"
            )}
          >
            NestUnion
          </span>
        </div>
      )}
    </Link>
  );
}
