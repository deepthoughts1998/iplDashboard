import React from "react";
import { Link } from "react-router-dom";

function MatchDetail({ teamName, match }) {
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
            <h6 className="mb-5 text-3xl font-bold text-gray-900 ">
              vs <Link to={oppositionRoute}> {oppositionTeam} </Link>
            </h6>
            <p className="mb-2 text-base font-bold sm:text-lg">
              on {match.date} at {match.venue}
            </p>
            <p className="mb-2 text-base text-gray-500 sm:text-lg">
              {match.tossWinner} won the toss and chose to {match.tossDecision}
            </p>
            <p className="mb-5 text-xl md:text-2xl font-bold text-gray-500 sm:text-lg">
              {match.winner} won by {match.resultMargin} {match.result}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default MatchDetail;
