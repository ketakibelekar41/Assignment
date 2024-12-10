let sequence = [];
let userSequence = [];
let score = 0;
const buttons = ["red", "blue", "yellow", "green"];

// Highlight a button
function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("flash");
    setTimeout(() => button.classList.remove("flash"), 300);
}

// Play the sequence
function playSequence() {
    userSequence = []; // Reset user input for the new round

    if (sequence.length === 0) {
        // Add the first color if starting fresh
        const nextColor = buttons[Math.floor(Math.random() * buttons.length)];
        sequence.push(nextColor);
    }

    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color);
        }, 600 * index);
    });
}

// Handle user clicks
function handleClick(color) {
    userSequence.push(color);

    const isCorrect = userSequence.every((val, idx) => val === sequence[idx]);

    if (!isCorrect) {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
    } else if (userSequence.length === sequence.length) {
        score++;
        updateScore();
        setTimeout(() => {
            // Add the next color and start the next round
            sequence.push(buttons[Math.floor(Math.random() * buttons.length)]);
            playSequence();
        }, 1000);
    }
}

// Reset the game
function resetGame() {
    sequence = [];
    userSequence = [];
    score = 0;
    updateScore();
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

// Initialize the game
document.getElementById("start").addEventListener("click", () => {
    resetGame();
    playSequence();
});

buttons.forEach((color) => {
    document.getElementById(color).addEventListener("click", () => handleClick(color));
});
