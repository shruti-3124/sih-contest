import React from "react";
import { Link } from "react-router-dom";
import WeeklyContest from "./Weeklycontest";

const ContestPage = () => {
  return (
    <>
      <section>
        <h1>Contests</h1>
        <div>
          <h2>Weekly Contest</h2>
          <WeeklyContest startNowForTesting={true} />
          <Link to="/contest/weekly">
            <button>Go to Weekly Contest</button>
          </Link>
        </div>
        <div>
          <h2>Create Your Own Contest</h2>
          <Link to="/contest/create">
            <button>Create a Contest</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ContestPage;
