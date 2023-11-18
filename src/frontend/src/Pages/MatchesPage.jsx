import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MatchDetail from "../Components/MatchDetail";

function MatchesPage() {
  const [teamDetails, setTeamDetails] = useState([]);
  let { teamName, year } = useParams();
  const [show, setShow] = useState(false);
  const dropDown = () => {
    setShow(!show);
  };
  let ListYear = [];
  for (let i = 2008; i < 2021; i++) {
    ListYear.push(i);
  }

  const changeYear = (e) => {
    year = e.target.value;
    fetchMatch();
    dropDown();
  };
  const fetchMatchFirstRender = async () => {
    for (let x = year; x > 2008; x--) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL_ROOT}/teams/${teamName}/matches?year=${x}`
      );
      const data = await res.json();
      if (data !== null && data.length !== 0) {
        setTeamDetails(data);
        break;
      }
    }
  };

  const fetchMatch = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL_ROOT}/teams/${teamName}/matches?year=${year}`
    );
    const data = await res.json();
    setTeamDetails(data);
  };

  useEffect(() => {
    fetchMatchFirstRender();
  }, []);
  if (teamDetails != null) {
    return (
      <div>
        <button
          onClick={dropDown}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Select Year
        </button>
        <div
          className={
            show
              ? "z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow "
              : "z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow "
          }
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700">
            {ListYear.map((particularYear) => {
              return (
                <li>
                  <div className="flex items-center">
                    <input
                      id={particularYear}
                      type="radio"
                      value={particularYear}
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      onChange={changeYear}
                    />
                    <label
                      for={particularYear}
                      className="ml-2 text-sm font-medium text-gray-900 "
                    >
                      {particularYear}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {teamDetails.length !== 0 ? (
          teamDetails.map((match) => (
            <MatchDetail key={match.id} teamName={teamName} match={match} />
          ))
        ) : (
          <h1 className="my-4 text-2xl font-bold">
            {teamName} has not played any match in this particular year
          </h1>
        )}
      </div>
    );
  }
}

export default MatchesPage;
