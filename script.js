
// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Quiz Questions
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        answers: ["HTML", "CSS", "Python", "Java"],
        correct: 1
    },
    {
        question: "Which language makes websites interactive?",
        answers: ["CSS", "HTML", "JavaScript", "SQL"],
        correct: 2
    },
    {
        question: "Which HTML tag is used for images?",
        answers: ["<image>", "<img>", "<picture>", "<src>"],
        correct: 1
    },
    {
        question: "Which method displays a message in JavaScript?",
        answers: [
            "console.log()",
            "print()",
            "display()",
            "show()"
        ],
        correct: 0
    }
];

// Quiz Variables
let currentQuestion = 0;
let totalScore = 0;
let answered = false;

// HTML Elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");

// Display Question
function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent =
        `Question ${currentQuestion + 1}: ${current.question}`;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    scoreElement.textContent = "";

    nextBtn.disabled = true;
    nextBtn.textContent = "Next Question";

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer-btn";

        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

// Check Answer
function checkAnswer(selected, selectedButton) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;
    const allButtons = document.querySelectorAll(".answer-btn");

    allButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctAnswer) {
            button.style.background = "#c8f7d2";
            button.style.borderColor = "green";
        }
    });

    if (selected === correctAnswer) {
        totalScore++;

        feedbackElement.textContent = "Correct Answer! Well done!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = "Incorrect! Try the next question.";
        feedbackElement.style.color = "red";

        selectedButton.style.background = "#ffd6d6";
    }

    nextBtn.disabled = false;
}

// Next Question
nextBtn.addEventListener("click", function () {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Show Final Result
function showResult() {
    questionElement.textContent = "Quiz Completed!";

    answersElement.innerHTML = "";
    feedbackElement.textContent =
        "You have successfully completed the quiz!";

    nextBtn.textContent = "Restart Quiz";
    nextBtn.disabled = false;

    scoreElement.textContent =
        `Your Score: ${totalScore} / ${questions.length}`;
}

// Restart Quiz
nextBtn.addEventListener("click", function () {
    if (currentQuestion === questions.length) {
        currentQuestion = 0;
        totalScore = 0;
        showQuestion();
    }
});

// Load First Question
showQuestion();


// Fetch Data from Public API
const jokeBtn = document.getElementById("jokeBtn");
const jokeElement = document.getElementById("joke");

jokeBtn.addEventListener("click", async function () {
    jokeElement.textContent = "Loading joke...";
    jokeBtn.disabled = true;

    try {
        const response = await fetch(
            "https://v2.jokeapi.dev/joke/Any?safe-mode"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        if (data.error) {
            throw new Error("API returned an error");
        }

        if (data.type === "single") {
            jokeElement.textContent = data.joke;
        } else {
            jokeElement.textContent =
                data.setup + " — " + data.delivery;
        }

    } catch (error) {
        jokeElement.textContent =
            "Sorry! Unable to load a joke. Please try again.";

        console.error("API Error:", error);

    } finally {
        jokeBtn.disabled = false;
    }
});
