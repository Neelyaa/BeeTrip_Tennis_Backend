function calculateScore(points, player1, player2) {
    let sets = [[0, 0], [0, 0], [0, 0]];
    let gamePoints = [0, 0];
    let winner = null;
    let currentSet = 0;
  
    points.forEach((point) => {
      const winnerIndex = point.includes(player1) ? 0 : 1;
      gamePoints[winnerIndex]++;
  
      if (
        gamePoints[winnerIndex] >= 4 &&
        gamePoints[winnerIndex] - gamePoints[1 - winnerIndex] >= 2
      ) {
        sets[currentSet][winnerIndex]++;
        gamePoints = [0, 0];
  
        if (
          sets[currentSet][winnerIndex] >= 6 &&
          sets[currentSet][winnerIndex] - sets[currentSet][1 - winnerIndex] >= 2
        ) {
          currentSet++;
          if (sets.filter(set => set[0] > set[1]).length === 3) {
            winner = player1;
          } else if (sets.filter(set => set[1] > set[0]).length === 3) {
            winner = player2;
          }
        }
      }
    });
  
    return { winner, sets, currentGame: gamePoints };
  }
  
  module.exports = { calculateScore };
  