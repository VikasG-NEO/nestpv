import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  showWordmark?: boolean; // Kept for interface compatibility
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
  xl: "h-16",
};

export function Logo({
  className,
  variant = "default",
  size = "md"
}: LogoProps) {

  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <img
        src="/nestunion.jpg"
        alt="NestUnion"
        className={cn(
          sizeClasses[size],
          "w-auto object-contain",
          // If variant is light (dark background), we might need brightness adjust or just mix-blend if background is white.
          // Since it's a JPG with white background, mix-blend-multiply works best on light backgrounds.
          // On dark backgrounds, a white-bg JPG looks boxy. Assuming most headers are light or have specific blending needs.
          variant === "light" ? "rounded-sm" : "mix-blend-multiply"
        )}
      />
    </Link>
  );
}
