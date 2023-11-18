import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeamPage() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const getTeams = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL_ROOT}/teams`);
      const data = await res.json();
      setTeams(data);
    };
    getTeams();
  }, []);

  if (teams != null) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:py-32 p-4">
          {teams.map((team) => {
            return (
              <div className="flex justify-center items-center bg-slate-300 rounded-lg shadow-lg">
                <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <Link
                      className="no-underline hover:underline text-black"
                      to={`/teams/${team.teamName}`}
                    >
                      {team.teamName}
                    </Link>
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default TeamPage;
