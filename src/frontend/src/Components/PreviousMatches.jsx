import React from "react";
import { Link } from "react-router-dom";

function PreviousMatches({ teamName, match }) {
  if (match != null) {
    const oppositionTeam = match.team1 === teamName ? match.team2 : match.team1;
    const style =
      match.winner === teamName
        ? " w-[70%] p-4 text-center border border-gray-200 rounded-lg shadow sm:p-8 mb-8 bg-green-600"
        : " w-[70%] p-4 text-center border border-gray-200 rounded-lg shadow sm:p-8 mb-8 bg-red-600";
    const oppositionRoute = `/teams/${oppositionTeam}`;
    return (
      <>
        <div className="flex justify-center">
          <div className={style}>
            <h6 className="mb-2 text-base md:text-3xl font-bold text-gray-900 ">
              vs <Link to={oppositionRoute}> {oppositionTeam} </Link>
            </h6>
            <p className="mb-5 text-normal md:text-1xl font-bold text-gray-500 sm:text-lg">
              {match.winner} won by {match.resultMargin} {match.result}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default PreviousMatches;
