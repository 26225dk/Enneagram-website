//Makes the navigation bar links active when clicked
const navLinks = document.querySelectorAll('.topnav .nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});


const questions = [
  {
    text: "I like things to feel correct, fair, and well planned.", //The question the user will see on screen

    tags: {
      enneagram: [1, 6], //These are the enneagram types this question is linked to, meaning when the user picks an answer then both Type 1 and 6 will get points added to their score.
      instinct: ["so", "sp"] //These are instinctual variants this question is linked to. So (social) and sp (self-preservation) will get points added to their score when the user picks an answer.
    }
  },

  {
    text: "I notice when a plan is messy or when details are missing.",

    tags: {
      enneagram: [1, 5, 6],
      instinct: ["so", "sp"]
    }
  },

  {
    text: "I detect errors down to the last detail and I am tempted to correct them even when they are not my own.",

    tags: {
      enneagram: [1, 5, 6],
      instinct: ["so", "sp"]
    }
  },

  {
    text: "I am always bothered because things are not as ethical as they should be.",

    tags: {
      enneagram: [1, 2, 6],
      instinct: ["so", "sp", "sx"]
    }
  },

  {
    text: "I have an \"inner critic\" that guards my thoughts and actions to make sure that what I do is morally correct.",

    tags: {
      enneagram: [1, 5, 6],
      instinct: ["sp", "sx"]
    }
  },

  {
    text: "I criticize myself a lot internally if I am not able to do things ethically and morally.",

    tags: {
      enneagram: [1, 4, 6],
      instinct: ["sp", "sx"]
    }
  },

  {
    text: "I invest a lot of time and effort into correcting my mistakes, whatever they are.",

    tags: {
      enneagram: [1, 3, 6],
      instinct: ["sp", "sx"]
    }
  }
];


let current = 0;

let typeScores = { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };
let instinctScores = { sp:0, so:0, sx:0 };

let history = [];

function showQuestion() {
  document.getElementById("question-text").textContent =
    questions[current].text;
}

function updateProgress() {
  const progress = (current / questions.length) * 100;

  document.querySelector(".progress-bar-fill").style.width = progress + "%";
  document.querySelector(".progress-percent").textContent =
    Math.round(progress) + "%";
}

function applyQuestionScore(q, value) {
  q.tags.enneagram.forEach(type => {
    typeScores[type] += value;
  });

  q.tags.instinct.forEach(inst => {
    instinctScores[inst] += value;
  });
}

document.querySelectorAll(".answer-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    const value = Number(btn.dataset.value);
    const q = questions[current];

    applyQuestionScore(q, value);

    history.push({ questionIndex: current, value });

    current++;

    if (current === questions.length) {
      updateProgress(); 
      showResult();
      return;
    }

    showQuestion();
    updateProgress();
  });
});

document.querySelector(".back-btn").addEventListener("click", () => {

  if (current === 0) return;

  current--;

  const last = history.pop();
  const q = questions[last.questionIndex];

  q.tags.enneagram.forEach(type => {
    typeScores[type] -= last.value;
  });

  q.tags.instinct.forEach(inst => {
    instinctScores[inst] -= last.value;
  });

  showQuestion();
  updateProgress();
});