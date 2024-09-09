import React, { useState } from "react";

const CreateContest = () => {
  const [newContest, setNewContest] = useState({
    name: "",
    date: "",
    time: "",
    friends: "",
  });
  const [createdContests, setCreatedContests] = useState([]);

  const handleCreateContest = (e) => {
    e.preventDefault();

    // Add new contest to the array
    setCreatedContests([
      ...createdContests,
      { ...newContest, id: createdContests.length + 1 },
    ]);

    // Reset the form
    setNewContest({
      name: "",
      date: "",
      time: "",
      friends: "",
    });

    alert("Contest created successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContest({
      ...newContest,
      [name]: value,
    });
  };

  return (
    <section>
      <h2>Create Your Own Contest</h2>
      <form onSubmit={handleCreateContest}>
        <div>
          <label>Contest Name:</label>
          <input
            type="text"
            name="name"
            value={newContest.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newContest.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={newContest.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Invite Friends (Comma Separated Emails):</label>
          <input
            type="text"
            name="friends"
            value={newContest.friends}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Contest</button>
      </form>

      {/* Display created contests */}
      <h3>Created Contests</h3>
      <ul>
        {createdContests.map((contest) => (
          <li key={contest.id}>
            <p>
              <strong>{contest.name}</strong> on {contest.date} at{" "}
              {contest.time}
            </p>
            <p>Invited Friends: {contest.friends}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CreateContest;
