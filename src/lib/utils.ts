import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AVATAR_COLORS = [
  "#2563EB", // blue-600
  "#DC2626", // red-600
  "#059669", // emerald-600
  "#7C3AED", // violet-600
  "#EA580C", // orange-600
  "#0891B2", // cyan-600
  "#D97706", // amber-600
  "#4F46E5", // indigo-600
  "#BE185D", // pink-700
  "#E11D48", // rose-600
] as const;

export function getAvatarColor(id: string | number): string {
  // Use the id to consistently get the same color for the same participant
  const index = typeof id === "string" ? Math.abs(hashString(id)) : id;
  return AVATAR_COLORS[index % AVATAR_COLORS.length] ?? AVATAR_COLORS[0];
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
