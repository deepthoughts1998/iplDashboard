import { Link, Route, Routes } from "react-router-dom";
import TeamDetailPage from "./Pages/TeamDetailPage";
import MatchesPage from "./Pages/MatchesPage";
import TeamPage from "./Pages/TeamPage";

function App() {
  return (
    <div>
      <nav className="bg-black z-20 w-full  top-0 left-0 border-b border-gray-200 p-4">
        <Link
          to="/"
          className="self-center text-white flex justify-center  text-2xl font-semibold whitespace-nowrap"
        >
          Indian Premier League
        </Link>
      </nav>

      <Routes>
        <Route
          path="/teams/:teamName/matches/:year"
          element={<MatchesPage />}
        />
        <Route path="/teams/:teamName" element={<TeamDetailPage />} />
        <Route path="/" element={<TeamPage />} />
      </Routes>
    </div>
  );
}

export default App;
