// This makes the nav links look active when you click them.
const navLinks = document.querySelectorAll('.topnav .nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// This is the list of pages the search bar can find.
const searchEntries = [
  { label: 'Home', url: 'index.html' },
  { label: 'More about enneagram', url: 'moreabtennea.html' },
  { label: 'Resources', url: 'resources.html' },
  { label: 'E1', url: 'e1.html' },
  { label: 'Enneagram 1', url: 'e1.html' },
  { label: 'E2', url: 'e2.html' },
  { label: 'Enneagram 2', url: 'e2.html' },
  { label: 'E3', url: 'e3.html' },
  { label: 'Enneagram 3', url: 'e3.html' },
  { label: 'E4', url: 'e4.html' },
  { label: 'Enneagram 4', url: 'e4.html' },
  { label: 'E5', url: 'e5.html' },
  { label: 'Enneagram 5', url: 'e5.html' },
  { label: 'E6', url: 'e6.html' },
  { label: 'Enneagram 6', url: 'e6.html' },
  { label: 'E7', url: 'e7.html' },
  { label: 'Enneagram 7', url: 'e7.html' },
  { label: 'E8', url: 'e8.html' },
  { label: 'Enneagram 8', url: 'e8.html' },
  { label: 'E9', url: 'e9.html' },
  { label: 'Enneagram 9', url: 'e9.html' },
  { label: 'SO1', url: 'SO1.html' },
  { label: 'Social One', url: 'SO1.html' },
  { label: 'SO2', url: 'SO2.html' },
  { label: 'Social Two', url: 'SO2.html' },
  { label: 'SO3', url: 'SO3.html' },
  { label: 'Social Three', url: 'SO3.html' },
  { label: 'SO4', url: 'SO4.html' },
  { label: 'Social Four', url: 'SO4.html' },
  { label: 'SO5', url: 'SO5.html' },
  { label: 'Social Five', url: 'SO5.html' },
  { label: 'SO6', url: 'SO6.html' },
  { label: 'Social Six', url: 'SO6.html' },
  { label: 'SO7', url: 'SO7.html' },
  { label: 'Social Seven', url: 'SO7.html' },
  { label: 'SO8', url: 'SO8.html' },
  { label: 'Social Eight', url: 'SO8.html' },
  { label: 'SO9', url: 'SO9.html' },
  { label: 'Social Nine', url: 'SO9.html' },
  { label: 'SP1', url: 'SP1.html' },
  { label: 'Self-preservation One', url: 'SP1.html' },
  { label: 'Self preservation One', url: 'SP1.html' },
  { label: 'SP2', url: 'SP2.html' },
  { label: 'Self-preservation Two', url: 'SP2.html' },
  { label: 'Self preservation Two', url: 'SP2.html' },
  { label: 'SP3', url: 'SP3.html' },
  { label: 'Self-preservation Three', url: 'SP3.html' },
  { label: 'Self preservation Three', url: 'SP3.html' },
  { label: 'SP4', url: 'SP4.html' },
  { label: 'Self-preservation Four', url: 'SP4.html' },
  { label: 'Self preservation Four', url: 'SP4.html' },
  { label: 'SP5', url: 'SP5.html' },
  { label: 'Self-preservation Five', url: 'SP5.html' },
  { label: 'Self preservation Five', url: 'SP5.html' },
  { label: 'SP6', url: 'SP6.html' },
  { label: 'Self-preservation Six', url: 'SP6.html' },
  { label: 'Self preservation Six', url: 'SP6.html' },
  { label: 'SP7', url: 'SP7.html' },
  { label: 'Self-preservation Seven', url: 'SP7.html' },  
  { label: 'Self preservation Seven', url: 'SP7.html' },
  { label: 'SP8', url: 'SP8.html' },
  { label: 'Self-preservation Eight', url: 'SP8.html' },
  { label: 'Self preservation Eight', url: 'SP8.html' },
  { label: 'SP9', url: 'SP9.html' },
  { label: 'Self-preservation Nine', url: 'SP9.html' },
  { label: 'Self preservation Nine', url: 'SP9.html' },
  { label: 'SX1', url: 'SX1.html' },
  { label: 'Sexual One', url: 'SX1.html' },
  { label: 'SX2', url: 'SX2.html' },
  { label: 'Sexual Two', url: 'SX2.html' },
  { label: 'SX3', url: 'SX3.html' },
  { label: 'Sexual Three', url: 'SX3.html' },
  { label: 'SX4', url: 'SX4.html' },
  { label: 'Sexual Four', url: 'SX4.html' },
  { label: 'SX5', url: 'SX5.html' },
  { label: 'Sexual Five', url: 'SX5.html' },
  { label: 'SX6', url: 'SX6.html' },
  { label: 'Sexual Six', url: 'SX6.html' },
  { label: 'SX7', url: 'SX7.html' },
  { label: 'Sexual Seven', url: 'SX7.html' },
  { label: 'SX8', url: 'SX8.html' },
  { label: 'Sexual Eight', url: 'SX8.html' },
  { label: 'SX9', url: 'SX9.html' },
  { label: 'Sexual Nine', url: 'SX9.html' }
];

// This cleans the text so the search is easier to match.
function normalizeSearchText(value) {
  return value.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
}

// This checks the search input and shows matching pages in a dropdown.
function showSearchResults(input, query) {
  const wrapper = input.parentElement;
  if (!wrapper) return;

  let results = searchEntries.filter(entry => {
    const normalizedLabel = normalizeSearchText(entry.label);
    const normalizedQuery = normalizeSearchText(query);
    return normalizedLabel.includes(normalizedQuery) || entry.url.toLowerCase().includes(normalizedQuery);
  });

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

// This makes the search box react live while you type.
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

// These are all the quiz questions and the type tags tied to each one.
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
    tags: { enneagram: [5], instinct: ["sp", "so", "sx"] } 
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
    tags: { enneagram: [9], instinct: ["sp", "sx"] } 
  },
  { 
    text: "I am great at listening to what others have to say and I have a lot of patience with them.", 
    tags: { enneagram: [9], instinct: ["so", "sx", "sp"] } 
  },
  { 
    text: "I am quiet about my needs because I assume that the other person doesn't care or it will burden them.", 
    tags: { enneagram: [9], instinct: ["sx", "sp"] } 
  },
];

// This keeps track of the quiz progress and all the score totals.
let current = 0;
let typeScores = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };
let instinctScores = { sp:0, so:0, sx:0 };
let subtypeScores = {};
let history = [];

// This is the answer scale: negative means disagree, positive means agree.
const answerScale = {
  stronglyDisagree: -3,
  disagree: -2,
  slightlyDisagree: -1,
  neutral: 0,
  slightlyAgree: 1,
  agree: 2,
  stronglyAgree: 3,
};

// These colors match each Enneagram type for the result card.
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

// This turns short instinct names into nicer labels like Social and Sexual.
const instinctLabels = {
  so: "Social",
  sp: "Self-preservation",
  sx: "Sexual"
};

// These are the little profile cards for each subtype combo.
const subtypeProfiles = {
  so1: { title: "Social 1", strengths: ["Steady service", "Clear standards", "Responsible leadership"], weaknesses: ["Can be rigid", "Over-responsible", "Critical of self and others"], careers: ["Teacher", "Lawyer", "Judge"] },
  sp1: { title: "Self-preservation 1", strengths: ["Reliable", "Organized", "Practical"], weaknesses: ["Perfectionistic", "Controlling", "Hard on themselves"], careers: ["Accounting", "Systems administrator", "Quality assurance specialist"] },
  sx1: { title: "Sexual 1", strengths: ["Passionate", "Focused", "Integrity-driven"], weaknesses: ["Intense", "Judgmental", "Self-denying"], careers: ["Civil rights lawyer", "Life/Leadership Coaching", "Therapist", "Nonprofit leader"] },

  so2: { title: "Social 2", strengths: ["Supportive", "Warm", "People-focused"], weaknesses: ["People-pleasing", "Over-giving", "Emotionally dependent"], careers: ["Counselor", "School counselor", "Community outreach coordinator"] },
  sp2: { title: "Self-preservation 2", strengths: ["Helpful", "Reliable", "Resourceful"], weaknesses: ["Can feel taken for granted", "Overprotective", "Needs reassurance"], careers: ["Care coordinator", "Nurse aide", "Office manager"] },
  sx2: { title: "Sexual 2", strengths: ["Magnetic", "Attentive", "Deeply loyal"], weaknesses: ["Can become possessive", "Needs validation", "Emotionally intense"], careers: ["Relationship coach", "Event planner", "Brand ambassador"] },

  so3: { title: "Social 3", strengths: ["Confident", "Energetic", "Goal-oriented"], weaknesses: ["Can be image-conscious", "Workaholic", "Avoids vulnerability"], careers: ["Sales representative", "Marketing specialist", "Executive assistant"] },
  sp3: { title: "Self-preservation 3", strengths: ["Efficient", "Adaptable", "Ambitious"], weaknesses: ["Can be status-driven", "Insensitive to rest", "Too competitive"], careers: ["Business analyst", "Operations manager", "Recruiter"] },
  sx3: { title: "Sexual 3", strengths: ["Charismatic", "Competitive", "High-impact"], weaknesses: ["Can seem superficial", "Needs admiration", "Emotionally guarded"], careers: ["Public relations specialist", "Sales manager", "Recruitment consultant"] },

  so4: { title: "Social 4", strengths: ["Expressive", "Emotionally intelligent", "Creative"], weaknesses: ["Can be moody", "Identity-focused", "Self-conscious"], careers: ["Writer", "Graphic designer", "Creative director"] },
  sp4: { title: "Self-preservation 4", strengths: ["Sensitive", "Original", "Aesthetic"], weaknesses: ["Can isolate", "Self-protective", "Feels misunderstood"], careers: ["Interior designer", "Photographer", "Content creator"] },
  sx4: { title: "Sexual 4", strengths: ["Passionate", "Intense", "Authentic"], weaknesses: ["Can be dramatic", "Highly reactive", "Emotionally consuming"], careers: ["Artist", "Fashion stylist", "Creative director"] },

  so5: { title: "Social 5", strengths: ["Thoughtful", "Observant", "Analytical"], weaknesses: ["Can withdraw", "Overthinks", "Socially detached"], careers: ["Researcher", "Data analyst", "Librarian"] },
  sp5: { title: "Self-preservation 5", strengths: ["Independent", "Prepared", "Resourceful"], weaknesses: ["Can hoard energy", "Detached", "Avoids dependency"], careers: ["Systems analyst", "Technical support specialist", "Archivist"] },
  sx5: { title: "Sexual 5", strengths: ["Intellectually intense", "Private", "Deeply perceptive"], weaknesses: ["Can be elusive", "Emotionally guarded", "Hard to access"], careers: ["Strategic advisor", "Investigator", "Cybersecurity analyst"] },

  so6: { title: "Social 6", strengths: ["Loyal", "Responsible", "Collaborative"], weaknesses: ["Can be anxious", "Overly cautious", "Needs reassurance"], careers: ["Project coordinator", "Risk analyst", "Police officer"] },
  sp6: { title: "Self-preservation 6", strengths: ["Practical", "Prepared", "Dependable"], weaknesses: ["Can be suspicious", "Security-focused", "Over-prepared"], careers: ["Logistics coordinator", "Safety specialist", "Operations analyst"] },
  sx6: { title: "Sexual 6", strengths: ["Protective", "Attentive", "Strong intuition"], weaknesses: ["Can be reactive", "Distrustful", "Highly alert"], careers: ["Security consultant", "Emergency planner", "Investigative journalist"] },

  so7: { title: "Social 7", strengths: ["Optimistic", "Charismatic", "Quick to connect"], weaknesses: ["Can avoid depth", "Distractible", "Overcommits"], careers: ["Event planner", "Travel agent", "Marketing coordinator"] },
  sp7: { title: "Self-preservation 7", strengths: ["Adaptable", "Practical", "Resourceful"], weaknesses: ["Can be restless", "Avoids discomfort", "Impulsive"], careers: ["Sales representative", "Business developer", "Entrepreneur"] },
  sx7: { title: "Sexual 7", strengths: ["Fun-loving", "Flirtatious", "High-energy"], weaknesses: ["Can seem superficial", "Avoids commitment", "Needs stimulation"], careers: ["Social media manager", "Event producer", "Travel host"] },

  so8: { title: "Social 8", strengths: ["Bold", "Protective", "Decisive"], weaknesses: ["Can be confrontational", "Dominating", "Too forceful"], careers: ["Manager", "Law enforcement officer", "Operations director"] },
  sp8: { title: "Self-preservation 8", strengths: ["Strong", "Tactical", "Independent"], weaknesses: ["Can be stubborn", "Angry", "Control-oriented"], careers: ["Security manager", "Construction supervisor", "Logistics manager"] },
  sx8: { title: "Sexual 8", strengths: ["Powerful", "Passionate", "Protective"], weaknesses: ["Can be intimidating", "Intense", "Highly reactive"], careers: ["Executive", "Negotiator", "Crisis manager"] },

  so9: { title: "Social 9", strengths: ["Peaceful", "Patient", "Empathetic"], weaknesses: ["Can avoid conflict", "Passive", "Understates needs"], careers: ["Mediator", "Teacher", "Social worker"] },
  sp9: { title: "Self-preservation 9", strengths: ["Calm", "Steady", "Comforting"], weaknesses: ["Disengages with people/surroundings", "Avoids change", "Comfort-seeking"], careers: ["Librarian", "Customer service manager", "Accountant"] },
  sx9: { title: "Sexual 9", strengths: ["Gentle", "Deeply accepting", "Grounding"], weaknesses: ["Can merge with others", "Avoids boundaries", "Over-accommodating"], careers: ["Therapist", "Mediator", "Community facilitator"] }
};

// This picks the winner and builds the final result title and page link.
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

// This shows or hides the result card when the quiz is done.
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

// This builds the final result box with the image, strengths, and page link.
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
                    <div class="result-actions">
                        <a class="result-open-link" href="${result.pageName}">Open full result page</a>
                        <button type="button" class="retake-btn" onclick="location.reload()">Retake quiz</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

// This puts the current question on screen.
function showQuestion() {
    if (current < questions.length) {
        document.getElementById("question-text").textContent = questions[current].text;
    }
}

// This updates the progress bar based on how many answers are done.
function updateProgress() {
    const totalQuestions = questions.length;
    // Base progress directly on how many questions have been answered out of total
    const progress = (history.length / totalQuestions) * 100;
    document.querySelector(".progress-bar-fill").style.width = progress + "%";
    document.querySelector(".progress-percent").textContent = Math.round(progress) + "%";
}

function normalizeAnswerValue(value) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return 0;
    return Math.max(-3, Math.min(3, numericValue));
}

// This adds the selected score to the matching type and instinct totals.
function applyQuestionScore(q, value) {
    const normalizedValue = normalizeAnswerValue(value);
    const typeShare = q.tags.enneagram.length ? normalizedValue / q.tags.enneagram.length : 0;
    const instinctShare = q.tags.instinct.length ? normalizedValue / q.tags.instinct.length : 0;
    const subtypeShare = q.tags.enneagram.length && q.tags.instinct.length ? normalizedValue / (q.tags.enneagram.length * q.tags.instinct.length) : 0;

    q.tags.enneagram.forEach(type => {
        typeScores[type] += typeShare;
    });
    q.tags.instinct.forEach(inst => {
        instinctScores[inst] += instinctShare;
    });
    q.tags.enneagram.forEach(type => {
        q.tags.instinct.forEach(inst => {
            const subtypeKey = `${inst}${type}`;
            subtypeScores[subtypeKey] = (subtypeScores[subtypeKey] || 0) + subtypeShare;
        });
    });
}

// This resets the quiz when the page loads and starts at question 1.
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

// This listens for answer clicks, saves the score, and moves to the next question.
document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        // Prevent clicking if quiz is already over
        if (current >= questions.length) return;

        const value = normalizeAnswerValue(btn.dataset.value ?? answerScale[btn.classList[1]] ?? 0);
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

// This lets the user undo the last answer if they made a mistake.
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

