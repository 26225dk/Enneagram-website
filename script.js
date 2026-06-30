const navLinks = document.querySelectorAll('.topnav .nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

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

let current = 0;
let typeScores = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };
let instinctScores = { sp:0, so:0, sx:0 };
let history = [];

function showQuestion() {
    if (current < questions.length) {
        document.getElementById("question-text").textContent = questions[current].text;
    }
}

function updateProgress() {
    const totalQuestions = questions.length;
    // Base progress directly on how many questions have been answered out of total
    const progress = (history.length / totalQuestions) * 100;
    document.querySelector(".progress-bar-fill").style.width = progress + "%";
    document.querySelector(".progress-percent").textContent = Math.round(progress) + "%";
}

function applyQuestionScore(q, value) {
    q.tags.enneagram.forEach(type => {
        typeScores[type] += value;
    });
    q.tags.instinct.forEach(inst => {
        instinctScores[inst] += value;
    });
}

// THIS FIXES THE REFRESH ISSUE: Forces browser to show first question instantly on load
document.addEventListener("DOMContentLoaded", () => {
    current = 0;
    history = [];
    showQuestion();
    updateProgress();
});

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
            // 1. Force the bar to 100% because they just answered the final question
            document.querySelector(".progress-bar-fill").style.width = "100%";
            document.querySelector(".progress-percent").textContent = "100%";
            
            // 2. Change the text to show it is finished
            document.getElementById("question-text").textContent = "Quiz Complete :D";
            return;
        }
        
        // If there are more questions, update the progress bar and show the next question normally
        updateProgress();
        showQuestion();
    });
});

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

    showQuestion();
    updateProgress();
});
