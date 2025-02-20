function formatGameScore(points, tieBreak) {
    console.log("🎾 Données reçues par formatGameScore :", points, "Tie-break :", tieBreak);

    if (tieBreak) return `${points[0]} - ${points[1]}`; // Notation en tie-break

    const tennisScores = ["0", "15", "30", "40"];
    let [p1, p2] = points;

    if (p1 >= 3 && p2 >= 3) { // Cas où les deux joueurs sont à 40 ou plus
        if (p1 === p2) return ["40", "40"];
        if (p1 > p2) return ["AV -", "-"]; 
        if (p2 > p1) return ["-", "- AV"]; 
    }

    return [tennisScores[p1] || "40", tennisScores[p2] || "40"];
}

function calculateScore(points, player1, player2) {
    let sets = [[0, 0], [0, 0], [0, 0]];
    let gamePoints = [0, 0];
    let currentSet = 0;
    let winner = null;
    let tieBreak = false;
    let tieBreakPoints = [0, 0];

    points.forEach((point) => {
        if (!point.includes(player1) && !point.includes(player2)) {
            console.warn(`Point ignoré : "${point}" ne contient ni ${player1} ni ${player2}`);
            return; // On ignore les points invalides
        }

        const winnerIndex = point.includes(player1) ? 0 : 1;

        if (tieBreak) {
            tieBreakPoints[winnerIndex]++;
            if (tieBreakPoints[winnerIndex] >= 7 && tieBreakPoints[winnerIndex] - tieBreakPoints[1 - winnerIndex] >= 2) {
                sets[currentSet][winnerIndex]++;
                tieBreak = false;
                tieBreakPoints = [0, 0];
                currentSet++;
            }
        } else {
            gamePoints[winnerIndex]++;
            if (gamePoints[winnerIndex] >= 4 && gamePoints[winnerIndex] - gamePoints[1 - winnerIndex] >= 2) {
                sets[currentSet][winnerIndex]++;
                gamePoints = [0, 0];

                if (sets[currentSet][winnerIndex] >= 6) {
                    if (sets[currentSet][winnerIndex] - sets[currentSet][1 - winnerIndex] >= 2) {
                        currentSet++;
                    } else if (sets[currentSet][winnerIndex] === 6 && sets[currentSet][1 - winnerIndex] === 6) {
                        tieBreak = true;
                    }
                }
            }
        }
});

    return {
        winner,
        sets,
        currentGame: gamePoints,
        currentGameStatus: formatGameScore(gamePoints, tieBreak)
    };
}

module.exports = { calculateScore };
