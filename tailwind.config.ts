import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        outerBackground: "var(--outerBackground)",
        innerBackground: "var(--innerBackground)",
        textColor: "var(--textColor)"
      },
    },
  },
  plugins: [],
} satisfies Config;
