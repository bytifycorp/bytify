import { type ClassValue, clsx } from "clsx"
import slugify from "slugify"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertToSlug = (str: string) => {
  return slugify(decodeURIComponent(str), {
    lower: true, // Convert to lower case
    strict: true, // Remove special characters
  })
}