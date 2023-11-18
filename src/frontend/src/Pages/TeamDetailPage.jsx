import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MatchDetail from "../Components/MatchDetail";
import PreviousMatches from "../Components/PreviousMatches";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function TeamDetailPage() {
  const [teamDetails, setTeamDetails] = useState({ matches: [] });
  const { teamName } = useParams();

  useEffect(() => {
    const fetchMatch = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL_ROOT}/teams/${teamName}`);
      const data = await res.json();
      setTeamDetails(data);
    };
    fetchMatch();
  }, [teamName]);

  if (teamDetails != null) {
    const routeMatches = `/teams/${teamName}/matches/2020`;
    const data = {
      labels: ["Wins", "Losses"],
      datasets: [
        {
          label: "# of matches",
          data: [
            teamDetails.totalNoWins,
            teamDetails.totalMatches - teamDetails.totalNoWins,
          ],
          backgroundColor: ["rgba(0,255,0, 0.7)", "rgba(255,0,0 ,0.7)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div className="bg-slate-500">
        <div className="flex justify-center">
          <div className=" w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-8">
            <div>
              <h4 className="mb-2 text-3xl font-bold text-gray-900 ">
                {teamDetails.teamName}
              </h4>
            </div>
            <div className="h-32">
              <Pie data={data} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <h5 className="mb-2 text-3xl font-bold text-gray-900 ">Latest Match</h5>
        <MatchDetail
          teamName={teamDetails.teamName}
          match={teamDetails.matches[0]}
        />

        <h5 className="mb-5 text-3xl font-bold text-gray-900 ">
          Previous Matches
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full bg-black h-auto p-4">
          {teamDetails.matches.slice(1).map((match) => (
            <PreviousMatches
              key={match.id}
              teamName={teamDetails.teamName}
              match={match}
            />
          ))}
          <button>
            <Link
              to={routeMatches}
              className="text-blue-700 text-2xl font-bold"
            >
              More Matches{">>"}
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default TeamDetailPage;
