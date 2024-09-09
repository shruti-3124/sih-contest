import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./weeklycontest.css"

// Helper function to calculate the next Sunday at 11 AM
const getNextSundayAt11AM = (startNowForTesting = false) => {
  const now = new Date();

  // For testing purposes, start the contest now
  if (startNowForTesting) {
    const contestStartTime = new Date();
    const contestEndTime = new Date(contestStartTime);
    contestEndTime.setSeconds(contestEndTime.getSeconds() + 5); // Contest lasts 5 seconds for testing
    return { contestStartTime, contestEndTime };
  }

  // Calculate the next Sunday 11 AM
  let nextSunday = new Date(now);

  const dayOfWeek = now.getDay(); // Get current day of the week (0 = Sunday, 6 = Saturday)
  const hourOfDay = now.getHours(); // Get the current hour
  
  // If today is Sunday and it's after 11 AM, set it to the next Sunday
  if (dayOfWeek === 0 && hourOfDay >= 11) {
    nextSunday.setDate(nextSunday.getDate() + 7); // Set to the next Sunday (7 days later)
  } else {
    // Otherwise, calculate how many days until the upcoming Sunday
    const daysUntilNextSunday = (7 - dayOfWeek) % 7 || 7;
    nextSunday.setDate(now.getDate() + daysUntilNextSunday); // Set to the upcoming Sunday
  }

  // Set the contest to start at 11 AM on Sunday
  nextSunday.setHours(11, 0, 0, 0); // Set time to 11 AM

  const contestStartTime = nextSunday;
  const contestEndTime = new Date(contestStartTime);
  contestEndTime.setHours(contestEndTime.getHours() + 1); // Contest lasts 1 hour

  return { contestStartTime, contestEndTime };
};


const WeeklyContest = ({ startNowForTesting = false }) => {
  const [{ contestStartTime, contestEndTime }, setContestTimes] = useState(
    getNextSundayAt11AM(startNowForTesting)
  );
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("upcoming"); // 'upcoming', 'ongoing', 'ended'
  const [hasSubmitted, setHasSubmitted] = useState(
    localStorage.getItem("hasSubmitted") === "true"
  ); // Check if the user has submitted
  useEffect(() => {
     if (status === "upcoming") {
       // Clear the submission when the contest is upcoming (i.e., new contest)
       localStorage.removeItem("hasSubmitted");
       setHasSubmitted(false);
     }
   }, [status])
  useEffect(() => {
    const updateStatusAndTime = () => {
      const now = new Date();

      if (now >= contestStartTime && now < contestEndTime) {
        setStatus("ongoing");
        setTimeLeft(getTimeDifference(contestEndTime));
      } else if (now < contestStartTime) {
        setStatus("upcoming");
        setTimeLeft(getTimeDifference(contestStartTime));
      } else {
        setStatus("ended");

        // Reset for the next contest
        const nextTimes = getNextSundayAt11AM();
        setContestTimes(nextTimes);
        setStatus("upcoming");
        setTimeLeft(getTimeDifference(nextTimes.contestStartTime));
      }
    };

    updateStatusAndTime();
    const interval = setInterval(updateStatusAndTime, 1000);
    return () => clearInterval(interval);
  }, [contestStartTime, contestEndTime]);

  const handleContestSubmit = () => {
    setHasSubmitted(true);
    localStorage.setItem("hasSubmitted", "true"); // Store in localStorage
  };

  return (
    <section>
      <h1>Weekly Contest</h1>

      {status === "upcoming" && timeLeft ? (
        <p>Next contest starts in: {timeLeft}</p>
      ) : status === "ongoing" && timeLeft ? (
        <p>Contest ends in: {timeLeft}</p>
      ) : (
        <p>The contest has ended. Please come back next Sunday!</p>
      )}

      {/* Button to go to contest questions page */}
      <div>
        {status === "ongoing" && !hasSubmitted ? (
          <Link to="/contestquestion">
            <button>Go to Contest Questions</button>
          </Link>
        ) : (
          <button disabled>
            {status === "ended" ? "Contest Ended" : "Contest Submitted"}
          </button>
        )}
      </div>

      {/* Submit button (you can put this on the contest questions page) */}
      {status === "ongoing" && !hasSubmitted && (
        <button onClick={handleContestSubmit}>Submit Contest</button>
      )}
    </section>
  );
};

// Helper function to calculate time difference for the timer
const getTimeDifference = (futureTime) => {
  const now = new Date();
  const diff = futureTime - now;

  if (diff <= 0) return null; // Contest has ended or the time is up

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};


export default WeeklyContest;
