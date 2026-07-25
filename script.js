// This makes the nav links turn active when you click on them.
const navLinks = document.querySelectorAll('.topnav .nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// This stores all the quiz questions and the type/instinct tags that go with each one.
const questions = [
  { 
    text: "I like things to feel correct, fair, and well planned.",
    tags: { enneagram: [1, 6], instinct: ["so", "sp"] } 
  },
  { 
    text: "I notice when a plan is messy or when details are missing.", 
    tags: { enneagram: [1, 5, 6], instinct: ["so", "sp"] } 
  },
  { 
    text: "I detect errors down to the last detail and I am tempted to correct them even when they are not my own.", 
    tags: { enneagram: [1, 5, 6], instinct: ["so", "sp"] } 
  },
  { 
    text: "I am always bothered because things are not as ethical as they should be.", 
    tags: { enneagram: [1, 2, 6], instinct: ["so", "sp", "sx"] } 
  },
  { 
    text: "I have an \"inner critic\" that guards my thoughts and actions to make sure that what I do is morally correct.", 
    tags: { enneagram: [1, 5, 6], instinct: ["sp", "sx"] } 
  },
  { 
    text: "I criticize myself a lot internally if I am not able to do things ethically and morally.", 
    tags: { enneagram: [1, 4, 6], instinct: ["sp", "sx"] } 
  },
  { 
    text: "I invest a lot of time and effort into correcting my mistakes, whatever they are.", 
    tags: { enneagram: [1, 3, 6], instinct: ["sp", "sx"] } 
  }
];

// These are the main variables that keep track of where the quiz is and what scores each type has.
let current = 0;
let typeScores = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };
let instinctScores = { sp:0, so:0, sx:0 };
let subtypeScores = {};
let history = [];

// These are the colors for each enneagram type so the result card matches the type pages.
const typeColors = {
  1: "#6e88bf",
  2: "#fed557",
  3: "#6cf3a7",
  4: "#000000",
  5: "#7b5fac",
  6: "#153cb9",
  7: "#c622b7",
  8: "#b30b12",
  9: "#fdbf93"
};

// These turn the short instinct names into words like Social or Sexual.
const instinctLabels = {
  so: "Social",
  sp: "Self-preservation",
  sx: "Sexual"
};

// This checks all the subtype scores and picks the one that came out highest.
function getResultSummary() {
    const bestSubtypeEntry = Object.entries(subtypeScores).reduce((best, [subtype, score]) => {
        return score > best.score ? { subtype, score } : best;
    }, { subtype: "so1", score: -Infinity });

    const subtypeKey = bestSubtypeEntry.subtype;
    const instinctKey = subtypeKey.replace(/\d+/g, "");
    const typeNumber = Number(subtypeKey.replace(/[^\d]/g, ""));
    const instinctName = instinctLabels[instinctKey] || "Social";
    const resultTitle = `${instinctName} ${typeNumber}`;
    const pageName = `${instinctKey.toUpperCase()}${typeNumber}.html`;
    const imagePath = `E${typeNumber}/${instinctKey.toUpperCase()} dom/${instinctKey.toUpperCase()}${typeNumber} description.png`;
    const accentColor = typeColors[typeNumber] || "#6e88bf";

    return {
        typeNumber,
        instinctKey,
        resultTitle,
        pageName,
        imagePath,
        accentColor
    };
}

// This switches the quiz into the finished state so the result card shows up.
function toggleQuizCompletionState() {
    const beigeBg = document.querySelector('.beige-bg');
    const resultContainer = document.getElementById('quiz-result');

    if (beigeBg) {
        beigeBg.classList.toggle('quiz-complete', current >= questions.length);
    }

    if (resultContainer) {
        resultContainer.hidden = current < questions.length;
    }
}

// This builds the result card with the right image, title, and page link based on the quiz answers.
function renderResult() {
    const resultContainer = document.getElementById("quiz-result");
    if (!resultContainer) return;

    const result = getResultSummary();
    resultContainer.hidden = false;
    resultContainer.innerHTML = `
        <div class="quiz-result-panel" style="--accent:${result.accentColor}">
            <header class="quiz-result-header">
                <p class="quiz-result-subtitle">Your result</p>
                <h2>${result.resultTitle}</h2>
            </header>
            <div class="quiz-result-body">
                <div class="quiz-result-image">
                    <img src="${result.imagePath}" alt="${result.resultTitle} description">
                </div>
                <div class="quiz-result-text">
                    <p class="quiz-result-lead">Your quiz answers point most strongly to ${result.resultTitle}.</p>
                    <p class="quiz-result-copy">The result below is shown directly from your matching subtype image and styled to match the color-coded type pages.</p>
                    <a class="result-open-link" href="${result.pageName}">Open full result page</a>
                </div>
            </div>
        </div>
    `;

    resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

// This shows the current question in the quiz box.
function showQuestion() {
    if (current < questions.length) {
        document.getElementById("question-text").textContent = questions[current].text;
    }
}

// This updates the progress bar and the percentage as you answer more questions.
function updateProgress() {
    const totalQuestions = questions.length;
    // Base progress directly on how many questions have been answered out of total
    const progress = (history.length / totalQuestions) * 100;
    document.querySelector(".progress-bar-fill").style.width = progress + "%";
    document.querySelector(".progress-percent").textContent = Math.round(progress) + "%";
}

// When you click one of the answer circles, this adds that value to the right type, instinct, and subtype totals.
function applyQuestionScore(q, value) {
    q.tags.enneagram.forEach(type => {
        typeScores[type] += value;
    });
    q.tags.instinct.forEach(inst => {
        instinctScores[inst] += value;
    });
    q.tags.enneagram.forEach(type => {
        q.tags.instinct.forEach(inst => {
            const subtypeKey = `${inst}${type}`;
            subtypeScores[subtypeKey] = (subtypeScores[subtypeKey] || 0) + value;
        });
    });
}

// This runs when the page loads so the quiz starts fresh and the first question shows up right away.
document.addEventListener("DOMContentLoaded", () => {
    current = 0;
    history = [];
    Object.keys(typeScores).forEach(key => typeScores[key] = 0);
    Object.keys(instinctScores).forEach(key => instinctScores[key] = 0);
    Object.keys(subtypeScores).forEach(key => delete subtypeScores[key]);
    const resultContainer = document.getElementById("quiz-result");
    if (resultContainer) {
        resultContainer.hidden = true;
        resultContainer.innerHTML = "";
    }
    toggleQuizCompletionState();
    showQuestion();
    updateProgress();
});

// This checks for clicks on the answer buttons and records the user's answer for the current question.
document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        // Prevent clicking if quiz is already over
        if (current >= questions.length) return;

        const value = Number(btn.dataset.value);
        const q = questions[current];
        
        applyQuestionScore(q, value);
        history.push({ questionIndex: current, value });
        
        current++; 

        if (current === questions.length) {
            document.querySelector(".progress-bar-fill").style.width = "100%";
            document.querySelector(".progress-percent").textContent = "100%";
            document.getElementById("question-text").textContent = "Quiz completed! :D";
            toggleQuizCompletionState();
            renderResult();
            return;
        }
        
        // If there are more questions, this updates the progress bar and shows the next question normally
        updateProgress();
        showQuestion();
    });
});

// This lets you go back to the last question and undo that answer if the user wants to change it.
document.querySelector(".back-btn").addEventListener("click", () => {
    if (current === 0 || history.length === 0) return;

    const last = history.pop();
    current = last.questionIndex; 

    const q = questions[current];
    q.tags.enneagram.forEach(type => {
        typeScores[type] -= last.value;
    });
    q.tags.instinct.forEach(inst => {
        instinctScores[inst] -= last.value;
    });
    q.tags.enneagram.forEach(type => {
        q.tags.instinct.forEach(inst => {
            const subtypeKey = `${inst}${type}`;
            subtypeScores[subtypeKey] = (subtypeScores[subtypeKey] || 0) - last.value;
        });
    });

    toggleQuizCompletionState();
    showQuestion();
    updateProgress();
});

