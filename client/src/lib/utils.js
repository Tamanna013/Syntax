import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-hot-pink-translucent text-hot-pink border border-hot-pink-border",
  "bg-sunny-yellow-translucent text-sunny-yellow border border-sunny-yellow-border",
  "bg-mint-green-translucent text-mint-green border border-mint-green-border",
  "bg-sky-blue-translucent text-sky-blue border border-sky-blue-border"
];

export const getColor = (color) => {
  if(color>=0 && color<colors.length){
    return colors[color];
  }
  return colors[0];
}