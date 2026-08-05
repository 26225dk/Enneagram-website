// Make the top nav links light up when you click them so it shows to the end user what page they selected.
const navLinks = document.querySelectorAll('.topnav .nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// The quiz questions and their enneagram + instinct tags
const questions = [
  { 
    text: "I like things to feel correct, fair, and well planned.",
    tags: { enneagram: [1, 6], instinct: ["so", "sp"] } 
  },
  { 
    text: "I detect errors down to the last detail and I am tempted to correct them even when they are not my own.", 
    tags: { enneagram: [1, 5, 6], instinct: ["so", "sp"] } 
  },
  { 
    text: "I am always bothered because the world is not as fair as it should be.", 
    tags: { enneagram: [1, 2, 6], instinct: ["so", "sp", "sx"] } 
  },
  { 
    text: "I like it better when I'm the one doing things for another person more often than them doing something for me.", 
    tags: { enneagram: [2, 8], instinct: ["so", "sx"] } 
  },
  { 
    text: "I prioritize and think that other people's satisfaction is more important than my own", 
    tags: { enneagram: [2], instinct: ["sp", "sx"] } 
  },
  { 
    text: "I cheer others up and want them to feel happy", 
    tags: { enneagram: [2], instinct: ["sp", "so"] } 
  },
  { 
    text: "I am often the role model for image and success and I like that.", 
    tags: { enneagram: [3], instinct: ["so", "sx"] } 
  },
  { 
    text: "I appreciate it when others admire my success.", 
    tags: { enneagram: [3], instinct: ["sp", "so"] } 
  },
  { 
    text: "If I am desirable and attractive, then I am valuable.", 
    tags: { enneagram: [3], instinct: ["sx", "so"] } 
  },
  { 
    text: "I have been accused of being overdramatic or too expressive, but this is because people don't understand what I'm feeling.", 
    tags: { enneagram: [4], instinct: ["sx", "so"] } 
  },
  { 
    text: "I feel that I am different and feel my emotions in a deeper way compared to others.", 
    tags: { enneagram: [4], instinct: ["so", "sx", "sp",] } 
  },
  { 
    text: "I am sensitive and usually express it through art-related activities like writing, painting, etc.", 
    tags: { enneagram: [4], instinct: ["sp", "so"] } 
  },
  { 
    text: "I am knowledgeable and competent but I'm not really sociable and I usually struggle with relationships.", 
    tags: { enneagram: [5], instinct: ["sp", "sx", "so"] } 
  },
  { 
    text: "I spend a lot of my free time learning new things to gain more knowledge, even if these topics won't be useful in practice.", 
    tags: { enneagram: [5], instinct: ["so", "sp", "sx"] } 
  },
  { 
    text: "I'm independent and keep my distance, but I yearn for a soulmate who can understand me without draining too much of my energy.", 
    tags: { enneagram: [5], instinct: ["sx", "sp", "so"] } 
  },
  { 
    text: "I need the opinion of my loved ones or an authority figure when making a decision.", 
    tags: { enneagram: [6], instinct: ["so", "sp", "sx"] } 
  },
  { 
    text: "I imagine the worst case scenario and emotionally prepare myself for it.", 
    tags: { enneagram: [6], instinct: ["sp", "sx", "so"] } 
  },
  { 
    text: "I am constantly anxious and aware of things that could go wrong.", 
    tags: { enneagram: [6], instinct: ["sx", "sp", "so"] } 
  },
  { 
    text: "I tend to see people and the world through an idealistic and romantic point of view.", 
    tags: { enneagram: [7], instinct: ["sx", "sp", "so"] } 
  },
  { 
    text: "I am a pure person because I sacrifice my selfish desires for a better social cause.", 
    tags: { enneagram: [7], instinct: ["so", "sx", "sp"] } 
  },
  { 
    text: "I am a charming person who loves the good things in life and good at getting what I want to have fun and feel safe.", 
    tags: { enneagram: [7], instinct: ["sp", "sx", "so"] } 
  },
  { 
    text: "I care about the people I love fiercely and expect the same loyalty.", 
    tags: { enneagram: [8], instinct: ["so", "sx"] } 
  },
  { 
    text: "I always feel the need to have control over my environment and can become aggressive otherwise.", 
    tags: { enneagram: [8], instinct: ["sx", "so", "sp"] } 
  },
  { 
    text: "I am protective of my personal space, resources, and independence.", 
    tags: { enneagram: [8], instinct: ["sp", "so", "sx"] } 
  },
  { 
    text: "If possible, I would spend the day doing nothing and resting.", 
    tags: { enneagram: [9], instinct: ["sp", "sx", "so"] } 
  },
  { 
    text: "I am great at listening to what others have to say and I have a lot of patience with them.", 
    tags: { enneagram: [9], instinct: ["so", "sx", "sp"] } 
  },
  { 
    text: "I am quiet about my needs because I assume that the other person doesn't care or it will burden them.", 
    tags: { enneagram: [9], instinct: ["sx", "sp", "so"] } 
  },
];

// Keeps track of what question the end user is on, scores for each type, instincts, subtypes, and the answer history.
let current = 0;
let typeScores = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };
let instinctScores = { sp:0, so:0, sx:0 };
let subtypeScores = {};
let history = [];

// Colors for each type so the result card matches the type pages and looks aesthetically pleasing.
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

// Turn shorthand instincts (so/sp/sx) into full words like "Social" so labels make sense.
const instinctLabels = {
  so: "Social",
  sp: "Self-preservation",
  sx: "Sexual"
};

// Pick the Enneagram type with the highest score.
function getResultSummary() {
  // Pick the top Enneagram type based on scores.
  let topType = null;
  let topTypeScore = -Infinity;
  Object.entries(typeScores).forEach(([type, score]) => {
    const numType = Number(type);
    if (score > topTypeScore || (score === topTypeScore && (topType === null || numType < topType))) {
      topTypeScore = score;
      topType = numType;
    }
  });

  // Recalculate instincts using only answers from questions that include that top type.
  const filteredInstinctScores = { sp: 0, so: 0, sx: 0 };
  history.forEach(entry => {
    const q = questions[entry.questionIndex];
    if (!q) return;
    if (q.tags.enneagram.includes(topType)) {
      q.tags.instinct.forEach(inst => {
        filteredInstinctScores[inst] = (filteredInstinctScores[inst] || 0) + entry.value;
      });
    }
  });

  // Choose the instinct with the highest score; if it's a tie, use the priority order.
  const instinctOrder = ["sp", "so", "sx"];
  let instinctKey = 'sp';
  let bestInstScore = -Infinity;
  instinctOrder.forEach(k => {
    const s = filteredInstinctScores[k] || 0;
    if (s > bestInstScore || (s === bestInstScore && instinctOrder.indexOf(k) < instinctOrder.indexOf(instinctKey))) {
      bestInstScore = s;
      instinctKey = k;
    }
  });

  const typeNumber = topType || 1;
  const instinctName = instinctLabels[instinctKey] || "Social";

  //"resultTitle" is a shortened way of making my javascript show the end-user's enneagram type and it changes accordingly depending what result they get. 
  const resultTitle = `${instinctName} ${typeNumber}`;
  const pageName = `${instinctKey.toUpperCase()}${typeNumber}.html`;
  const imagePath = `E${typeNumber}/${instinctKey.toUpperCase()} dom/${instinctKey.toUpperCase()}${typeNumber} chibi.png`;
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

// Show the result card.
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

// Show the result card with the right image, title, and a link to the full page.
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
                    <p class="quiz-result-lead">You are a ${result.resultTitle}!</p>
                    <p class="quiz-result-desc"> Strengths:  <br>
                     Weaknesses: <br>
                     Recommended Careers: </p>
                    <a class="result-open-link" href="${result.pageName}">Open full result page</a>
                </div>
            </div>
        </div>
    `;

    resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Show the current question text in the quiz box.
function showQuestion() {
    if (current < questions.length) {
        document.getElementById("question-text").textContent = questions[current].text;
    }
}

// Update the progress bar and percent as the user answers questions.
function updateProgress() {
    const totalQuestions = questions.length;
    // Base progress directly on how many questions have been answered out of total
    const progress = (history.length / totalQuestions) * 100;
    document.querySelector(".progress-bar-fill").style.width = progress + "%";
    document.querySelector(".progress-percent").textContent = Math.round(progress) + "%";
}

// When an answer button gets clicked, add its value to the matching type/instinct/subtype totals.
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

// On page load: reset everything and show the first question so the quiz is ready.
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

// Handle clicks on answer buttons and saves the choice, push history, and move to the next question.
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

// Back button to undo the last answer and go back one question if the end user made a mistake.
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

