# 🏢 Namma Warehouse

> **Smart Warehouse Location & Logistics Network Optimization Platform**

Namma Warehouse is an intelligent warehouse location optimization platform that leverages spatial data, demand patterns, traffic density, labor availability, and property costs to determine cost-efficient warehouse locations and customer assignments using facility-location optimization and Gemini AI insights.

---

## 📁 Project Structure

```text
namma-warehouse/
├── frontend/                # React + Vite frontend application
│   ├── public/              # Static assets
│   ├── src/                 # Application source code
│   │   ├── components/      # UI components and widgets
│   │   ├── data/            # Sample datasets and geospatial configurations
│   │   ├── pages/           # View pages and dashboard views
│   │   ├── services/        # Gemini AI and optimization services
│   │   ├── utils/           # Helper functions and algorithms
│   │   ├── App.tsx          # Main application component
│   │   ├── main.tsx         # Entry point
│   │   ├── types.ts         # TypeScript definitions
│   │   └── index.css        # Stylesheet
│   ├── package.json         # Frontend dependencies and scripts
│   ├── vite.config.ts       # Vite build configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── .env.example         # Environment variables template
└── README.md                # Project documentation
```

---

## ✨ Features

- 📍 **Spatial & Multi-Factor Optimization**: Evaluates candidate locations using demand, transit time, real estate costs, and labor metrics.
- 🗺️ **Interactive Geospatial Visualization**: Integrated mapping with Leaflet / React-Leaflet to visualize warehouse hubs, service radiuses, and demand nodes.
- 🤖 **AI-Powered Analytics**: Powered by Google Gemini API (`@google/genai`) to generate automated logistics insights and executive summaries.
- 📊 **Dynamic Charts & Metrics**: Built with Recharts and Lucide icons for rich telemetry, cost breakdowns, and capacity utilization.
- ⚡ **Modern Reactive Stack**: Powered by React 19, Vite, Tailwind CSS, and Framer Motion.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`

### Installation & Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local` and provide your Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API key:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key"
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the URL shown in your terminal).

---

## 🛠️ Available Scripts

Run these inside the `frontend/` directory:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:3000` |
| `npm run build` | Compiles and builds the production bundle into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checks (`tsc --noEmit`) |
| `npm run clean` | Removes build artifacts (`dist/`) |

---

## 🧰 Tech Stack

- **Framework**: React 19, Vite
- **AI Integration**: Google Gen AI SDK (`@google/genai`)
- **Mapping**: Leaflet, React-Leaflet
- **Styling & UI**: Tailwind CSS, Lucide React, Motion
- **Charts**: Recharts
- **Data Parsing**: PapaParse
- **Language**: TypeScript

---

## 📄 License

This project is licensed under the MIT License.
