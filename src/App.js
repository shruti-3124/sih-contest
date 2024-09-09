import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContestPage from "./ContestPage";
import CreateContest from "./Createcontest";
import WeeklyContest from "./Weeklycontest";
import QuestionSection from "./QuestionSection"

function App() {
  return (
    <Router>
      <Routes>
        {/* Contest Page with navigation links */}
        <Route path="/contest" element={<ContestPage />} />
        <Route path="/contestquestion" element={<QuestionSection />} />

        {/* Create Contest Page */}
        <Route path="/contest/create" element={<CreateContest />} />

        {/* Weekly Contest Page */}
        <Route path="/contest/weekly" element={<WeeklyContest />} />

        {/* Other routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
