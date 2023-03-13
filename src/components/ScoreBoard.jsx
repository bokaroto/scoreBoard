import React, { useState } from 'react';

// A simple in-memory store for the scores
const initialScores = [
  { home: 'Mexico', away: 'Canada', homeScore: 0, awayScore: 5 },
  { home: 'Spain', away: 'Brazil', homeScore: 10, awayScore: 2 },
  { home: 'Germany', away: 'France', homeScore: 2, awayScore: 2 },
  { home: 'Uruguay', away: 'Italy', homeScore: 6, awayScore: 6 },
  { home: 'Argentina', away: 'Australia', homeScore: 3, awayScore: 1 },
];

function ScoreBoard() {
  const [scores, setScores] = useState(initialScores);

  // Function to start a new game
  function startGame(home, away) {
    const newScore = { home, away, homeScore: 0, awayScore: 0 };
    setScores([...scores, newScore]);
  }

  // Function to finish a game
  function finishGame(index) {
    const newScores = [...scores];
    newScores.splice(index, 1);
    setScores(newScores);
  }

  // Function to update the score of a game
  function updateScore(index, homeScore, awayScore) {
    const newScores = [...scores];
    newScores[index].homeScore = homeScore;
    newScores[index].awayScore = awayScore;
    setScores(newScores);
  }

  // Function to sort the games by total score
  function sortByTotalScore() {
    const sortedScores = [...scores].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      if (totalScoreA > totalScoreB) {
        return -1;
      } else if (totalScoreA < totalScoreB) {
        return 1;
      } else {
        return 0;
      }
    });
    setScores(sortedScores);
  }

  console.log('scores => ', scores);

  return (
    <div>
      <h2>Football World Cup Score Board</h2>
      <button onClick={() => startGame('New Team', 'New Team')}>
        Start a new game
      </button>
      <table>
        <thead>
          <tr>
            <th>Home team</th>
            <th>Score</th>
            <th>Away team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.home}</td>
              <td>
                {score.homeScore} - {score.awayScore}
              </td>
              <td>{score.away}</td>
              <td>
                <button onClick={() => finishGame(index)}>Finish game</button>
                <button
                  onClick={() =>
                    updateScore(index, score.homeScore + 1, score.awayScore)
                  }
                >
                  Add home point
                </button>
                <button
                  onClick={() =>
                    updateScore(index, score.homeScore, score.awayScore + 1)
                  }
                >
                  Add away point
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={sortByTotalScore}>Sort by total score</button>
    </div>
  );
}

export default ScoreBoard;
