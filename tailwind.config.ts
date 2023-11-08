// Import necessary modules and configurations
import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

// Tailwind CSS configuration object
const config: Config = {
  // Specify the files to process for Tailwind CSS
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // Extend the default Tailwind CSS theme with custom modifications
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))", // Radial gradient background
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))", // Conic gradient background
      },
    },
  },
  // Enable dark mode and set its class
  darkMode: "class",
  // Use the nextui plugin to customize NextUI themes
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#FFD34E", // Light mode primary color
            secondary: "#EE457E", // Light mode secondary color
            background: "#F4E8D1", // Light mode background color
          },
        },
        dark: {
          colors: {
            primary: "#FFD34E", // Dark mode primary color
            secondary: "#EE457E", // Dark mode secondary color
            background: "#E1CA9E", // Dark mode background color
          },
        },
      },
    }),
  ],
};

// Export the Tailwind CSS configuration
export default config;
