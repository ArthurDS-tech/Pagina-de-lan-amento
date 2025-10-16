import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const px = (value: number) => `${value}px`

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
