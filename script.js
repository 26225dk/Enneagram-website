// Make the top nav links light up when you click them so it shows to the end user what page they selected.
const navLinks = document.querySelectorAll('.topnav .nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// My search bar 
const searchEntries = [
  { label: 'Home', url: 'index.html' },
  { label: 'More about enneagram', url: 'moreabtennea.html' },
  { label: 'Resources', url: 'resources.html' },
  { label: 'E1', url: 'e1.html' },
  { label: 'E2', url: 'e2.html' },
  { label: 'E3', url: 'e3.html' },
  { label: 'E4', url: 'e4.html' },
  { label: 'E5', url: 'e5.html' },
  { label: 'E6', url: 'e6.html' },
  { label: 'E7', url: 'e7.html' },
  { label: 'E8', url: 'e8.html' },
  { label: 'E9', url: 'e9.html' },
  { label: 'SO1', url: 'SO1.html' },
  { label: 'SO2', url: 'SO2.html' },
  { label: 'SO3', url: 'SO3.html' },
  { label: 'SO4', url: 'SO4.html' },
  { label: 'SO5', url: 'SO5.html' },
  { label: 'SO6', url: 'SO6.html' },
  { label: 'SO7', url: 'SO7.html' },
  { label: 'SO8', url: 'SO8.html' },
  { label: 'SO9', url: 'SO9.html' },
  { label: 'SP1', url: 'SP1.html' },
  { label: 'SP2', url: 'SP2.html' },
  { label: 'SP3', url: 'SP3.html' },
  { label: 'SP4', url: 'SP4.html' },
  { label: 'SP5', url: 'SP5.html' },
  { label: 'SP6', url: 'SP6.html' },
  { label: 'SP7', url: 'SP7.html' },
  { label: 'SP8', url: 'SP8.html' },
  { label: 'SP9', url: 'SP9.html' },
  { label: 'SX1', url: 'SX1.html' },
  { label: 'SX2', url: 'SX2.html' },
  { label: 'SX3', url: 'SX3.html' },
  { label: 'SX4', url: 'SX4.html' },
  { label: 'SX5', url: 'SX5.html' },
  { label: 'SX6', url: 'SX6.html' },
  { label: 'SX7', url: 'SX7.html' },
  { label: 'SX8', url: 'SX8.html' },
  { label: 'SX9', url: 'SX9.html' }
];

function normalizeSearchText(value) {
  return value.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
}

function showSearchResults(input, query) {
  const wrapper = input.parentElement;
  if (!wrapper) return;

  let results = searchEntries.filter(entry => {
    const normalizedLabel = normalizeSearchText(entry.label);
    const normalizedQuery = normalizeSearchText(query);
    return normalizedLabel.includes(normalizedQuery) || entry.url.toLowerCase().includes(normalizedQuery);
  });

  if (results.length > 8) {
    results = results.slice(0, 8);
  }

  let dropdown = wrapper.querySelector('.search-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.top = 'calc(100% + 0.25rem)';
    dropdown.style.left = '0';
    dropdown.style.right = '0';
    dropdown.style.background = '#ffffff';
    dropdown.style.border = '1px solid #000000';
    dropdown.style.boxShadow = 'none';
    dropdown.style.zIndex = '1000';
    dropdown.style.maxHeight = '220px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.display = 'none';
    wrapper.style.position = 'relative';
    wrapper.appendChild(dropdown);
  }

  if (!query.trim() || results.length === 0) {
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
    return;
  }

  dropdown.innerHTML = results.map(entry => `
    <button type="button" class="search-dropdown-item" data-url="${entry.url}" style="display:block;width:100%;text-align:left;padding:0.7rem 0.8rem;border:none;background:#fff;color:#000;cursor:pointer;font-size:0.95rem;">
      ${entry.label}
    </button>
  `).join('');

  dropdown.style.display = 'block';

  dropdown.querySelectorAll('.search-dropdown-item').forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = button.getAttribute('data-url');
    });
  });
}


document.querySelectorAll('.topnav input[type="text"]').forEach(input => {
  input.addEventListener('input', event => {
    showSearchResults(input, event.target.value);
  });

  input.addEventListener('focus', () => {
    showSearchResults(input, input.value);
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      const dropdown = input.parentElement?.querySelector('.search-dropdown');
      if (dropdown) {
        dropdown.style.display = 'none';
      }
    }, 120);
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

// A profile for each of the 27 subtype combinations so the quiz can show tailored strengths, weaknesses, and career ideas.
const subtypeProfiles = {
  so1: { title: "Social 1", strengths: ["Steady service", "Clear standards", "Responsible leadership"], weaknesses: ["Can be rigid", "Over-responsible", "Critical of self and others"], careers: ["Teacher", "HR manager", "Operations coordinator"] },
  sp1: { title: "Self-preservation 1", strengths: ["Reliable", "Organized", "Practical"], weaknesses: ["Perfectionistic", "Controlling", "Hard on yourself"], careers: ["Project manager", "Compliance officer", "Quality analyst"] },
  sx1: { title: "Sexual 1", strengths: ["Passionate", "Focused", "Integrity-driven"], weaknesses: ["Intense", "Judgmental", "Self-denying"], careers: ["Ethics consultant", "Legal researcher", "Healthcare administrator"] },

  so2: { title: "Social 2", strengths: ["Supportive", "Warm", "People-focused"], weaknesses: ["People-pleasing", "Over-giving", "Emotionally dependent"], careers: ["Counselor", "Community manager", "Nonprofit coordinator"] },
  sp2: { title: "Self-preservation 2", strengths: ["Helpful", "Reliable", "Resourceful"], weaknesses: ["Can feel taken for granted", "Overprotective", "Needs reassurance"], careers: ["Care coordinator", "Customer success lead", "Operations support"] },
  sx2: { title: "Sexual 2", strengths: ["Magnetic", "Attentive", "Deeply loyal"], weaknesses: ["Can become possessive", "Needs validation", "Emotionally intense"], careers: ["Relationship coach", "Event host", "Brand ambassador"] },

  so3: { title: "Social 3", strengths: ["Confident", "Energetic", "Goal-oriented"], weaknesses: ["Can be image-conscious", "Workaholic", "Avoids vulnerability"], careers: ["Sales manager", "Marketing lead", "Executive assistant"] },
  sp3: { title: "Self-preservation 3", strengths: ["Efficient", "Adaptable", "Ambitious"], weaknesses: ["Can be status-driven", "Insensitive to rest", "Too competitive"], careers: ["Business analyst", "Operations manager", "Entrepreneur"] },
  sx3: { title: "Sexual 3", strengths: ["Charismatic", "Competitive", "High-impact"], weaknesses: ["Can seem superficial", "Needs admiration", "Emotionally guarded"], careers: ["Public relations", "Talent recruiter", "Performance marketer"] },

  so4: { title: "Social 4", strengths: ["Expressive", "Emotionally intelligent", "Creative"], weaknesses: ["Can be moody", "Identity-focused", "Self-conscious"], careers: ["Designer", "Writer", "Brand storyteller"] },
  sp4: { title: "Self-preservation 4", strengths: ["Sensitive", "Original", "Aesthetic"], weaknesses: ["Can isolate", "Self-protective", "Feels misunderstood"], careers: ["Curator", "Interior designer", "Content creator"] },
  sx4: { title: "Sexual 4", strengths: ["Passionate", "Intense", "Authentic"], weaknesses: ["Can be dramatic", "Highly reactive", "Emotionally consuming"], careers: ["Artist", "Fashion stylist", "Creative director"] },

  so5: { title: "Social 5", strengths: ["Thoughtful", "Observant", "Analytical"], weaknesses: ["Can withdraw", "Overthinks", "Socially detached"], careers: ["Researcher", "Data analyst", "Librarian"] },
  sp5: { title: "Self-preservation 5", strengths: ["Independent", "Prepared", "Resourceful"], weaknesses: ["Can hoard energy", "Detached", "Avoids dependency"], careers: ["Systems analyst", "Archivist", "Technical specialist"] },
  sx5: { title: "Sexual 5", strengths: ["Intellectually intense", "Private", "Deeply perceptive"], weaknesses: ["Can be elusive", "Emotionally guarded", "Hard to access"], careers: ["Strategic advisor", "Investigator", "Cybersecurity analyst"] },

  so6: { title: "Social 6", strengths: ["Loyal", "Responsible", "Collaborative"], weaknesses: ["Can be anxious", "Overly cautious", "Needs reassurance"], careers: ["Project coordinator", "Risk analyst", "Community outreach"] },
  sp6: { title: "Self-preservation 6", strengths: ["Practical", "Prepared", "Dependable"], weaknesses: ["Can be suspicious", "Security-focused", "Over-prepared"], careers: ["Safety coordinator", "Logistics planner", "Operations analyst"] },
  sx6: { title: "Sexual 6", strengths: ["Protective", "Attentive", "Strong intuition"], weaknesses: ["Can be reactive", "Distrustful", "Highly alert"], careers: ["Security consultant", "Investigative journalist", "Emergency planner"] },

  so7: { title: "Social 7", strengths: ["Optimistic", "Charismatic", "Quick to connect"], weaknesses: ["Can avoid depth", "Distractible", "Overcommits"], careers: ["Event planner", "Travel consultant", "Marketing coordinator"] },
  sp7: { title: "Self-preservation 7", strengths: ["Adaptable", "Practical", "Resourceful"], weaknesses: ["Can be restless", "Avoids discomfort", "Impulsive"], careers: ["Entrepreneur", "Sales rep", "Business developer"] },
  sx7: { title: "Sexual 7", strengths: ["Fun-loving", "Flirtatious", "High-energy"], weaknesses: ["Can seem superficial", "Avoids commitment", "Needs stimulation"], careers: ["Lifestyle brand manager", "Social media strategist", "Entertainment producer"] },

  so8: { title: "Social 8", strengths: ["Bold", "Protective", "Decisive"], weaknesses: ["Can be confrontational", "Dominating", "Too forceful"], careers: ["Leadership roles", "Law enforcement", "Operations director"] },
  sp8: { title: "Self-preservation 8", strengths: ["Strong", "Tactical", "Independent"], weaknesses: ["Can be stubborn", "Angry", "Control-oriented"], careers: ["Security manager", "Construction lead", "Defense contractor"] },
  sx8: { title: "Sexual 8", strengths: ["Powerful", "Passionate", "Protective"], weaknesses: ["Can be intimidating", "Intense", "Highly reactive"], careers: ["Executive", "Negotiator", "Crisis manager"] },

  so9: { title: "Social 9", strengths: ["Peaceful", "Patient", "Empathetic"], weaknesses: ["Can avoid conflict", "Passive", "Understates needs"], careers: ["Mediator", "Teacher", "Social worker"] },
  sp9: { title: "Self-preservation 9", strengths: ["Calm", "Steady", "Comforting"], weaknesses: ["Can disengage", "Avoids change", "Comfort-seeking"], careers: ["Caregiver", "Facilities manager", "Wellness coordinator"] },
  sx9: { title: "Sexual 9", strengths: ["Gentle", "Deeply accepting", "Grounding"], weaknesses: ["Can merge with others", "Avoids boundaries", "Over-accommodating"], careers: ["Therapist", "Mediator", "Community facilitator"] }
};

// Pick the Enneagram subtype with the highest score and use it to shape the result card.
function getResultSummary() {
  let bestSubtypeKey = null;
  let bestSubtypeScore = -Infinity;

  Object.entries(subtypeScores).forEach(([subtypeKey, score]) => {
    if (score > bestSubtypeScore || (score === bestSubtypeScore && (bestSubtypeKey === null || subtypeKey < bestSubtypeKey))) {
      bestSubtypeScore = score;
      bestSubtypeKey = subtypeKey;
    }
  });

  const subtypeMatch = (bestSubtypeKey || "sp1").match(/^([a-z]+)(\d+)$/i);
  const instinctKey = subtypeMatch ? subtypeMatch[1].toLowerCase() : "sp";
  const typeNumber = Number(subtypeMatch ? subtypeMatch[2] : 1);
  const instinctName = instinctLabels[instinctKey] || "Social";
  const resultTitle = `${instinctName} ${typeNumber}`;
  const pageName = `${instinctKey.toUpperCase()}${typeNumber}.html`;
  const imagePath = `E${typeNumber}/${instinctKey.toUpperCase()} dom/${instinctKey.toUpperCase()}${typeNumber} chibi.png`;
  const accentColor = typeColors[typeNumber] || "#6e88bf";
  const profile = subtypeProfiles[bestSubtypeKey] || subtypeProfiles[`${instinctKey}${typeNumber}`] || subtypeProfiles.sp1;

  return {
    typeNumber,
    instinctKey,
    resultTitle,
    pageName,
    imagePath,
    accentColor,
    profile
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
    const profile = result.profile || {};
    const strengthsList = (profile.strengths || []).map(item => `<li>${item}</li>`).join("");
    const weaknessesList = (profile.weaknesses || []).map(item => `<li>${item}</li>`).join("");
    const careersList = (profile.careers || []).map(item => `<li>${item}</li>`).join("");

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
                    <div class="quiz-result-meta">
                        <p class="quiz-result-desc"><strong>Strengths:</strong><br>${profile.strengths.join("<br>")}</p>
                        <p class="quiz-result-desc"><strong>Weaknesses:</strong><br>${profile.weaknesses.join("<br>")}</p>
                        <p class="quiz-result-desc"><strong>Recommended careers:</strong><br>${profile.careers.join("<br>")}</p>
                    </div>
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

