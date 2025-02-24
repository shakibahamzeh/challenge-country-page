🌍 countryRanking

A web application for displaying and ranking countries based on population, area, and name, with sorting, filtering, and search functionalities.
🚀 Features

✅ Displays a list of all countries sorted by population by default
✅ Sorting options: Name (A-Z), Population, or Area
✅ Filtering options:

By multiple regions (Americas, Africa, Asia, Europe, Oceania, Antarctic)
By United Nations membership
By Independence status
✅ Search functionality: Find countries by name, region, or subregion
✅ Shows the total number of countries
✅ Select a country to view more details
✅ Displays key country details such as population, area, capital, etc.
✅ Shows neighboring countries and allows navigation to their details
✅ Implements pagination for better country list management.

🛠️ Tech Stack

Next.js (App Router)
TypeScript
Tailwind CSS
Axios (for API requests)
Framer Motion (for animations)
TanStack React Query (for API caching and state management)
React Icons (for icons)

🔗 API Endpoints

Fetch all countries (sorted by population):

```
GET https://restcountries.com/v3.1/all?sort=population

```

Fetch details of a specific country by code:

```
GET https://restcountries.com/v3.1/alpha/{countryCode}

```

⚙️ Installation & Running the Project

Clone the repository:

```
git clone https://github.com/shakibahamzeh/challenge-country-page.git
cd countryRanking

```

Install dependencies:

```
npm install

```
Start the development server:

```
npm run dev

```

Open http://localhost:3000 in your browser.

📂 Project Structure

```
📦 countryRanking
 ┣ 📂 src
 ┃ ┣ 📂 app            # Next.js App Router pages
 ┃ ┣ 📂 components     # Reusable UI components
 ┃ ┣ 📂 hooks          # Custom hooks
 ┃ ┣ 📂 provider       # React Query providers
 ┃ ┣ 📂 services       # API calls and data fetching logic
 ┃ ┣ 📂 types          # TypeScript types
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┣ 📜 eslint.config.mjs
 ┣ 📜 postcss.config.mjs
 ┣ 📜 tailwind.config.ts
 ┣ 📜 next.config.ts
 ┗ 📜 tsconfig.json

```

📢 Demo

🔗 Live Demo: 
 