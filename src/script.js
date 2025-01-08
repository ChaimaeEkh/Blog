document.addEventListener('DOMContentLoaded', () => {
    // Fixed Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('mobile-menu-active');
        document.body.style.overflow = 'hidden';
    });

    function closeMenuHandler() {
        mobileMenu.classList.remove('mobile-menu-active');
        document.body.style.overflow = '';
    }

    closeMenu.addEventListener('click', closeMenuHandler);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenuHandler);
    });

    // Initialize Typed.js
    new Typed('#typed-output', {
        strings: [
            'Innovate Forward',
            'Transform Tomorrow',
            'Lead Technology'
        ],
        typeSpeed: 80,
        backSpeed: 40,
        loop: true
    });

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Progress Indicator
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-indicator').style.width = scrolled + '%';
    });

    // Animate elements on scroll
    gsap.utils.toArray('.tech-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Animate featured posts
    gsap.utils.toArray('.featured-post').forEach(post => {
        gsap.from(post, {
            scrollTrigger: {
                trigger: post,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
});

const quizData = {
    ai: {
        name: 'Artificial Intelligence',
        questions: [
            {
                question: 'Which of these is NOT a type of machine learning?',
                options: [
                    'Supervised Learning',
                    'Unsupervised Learning',
                    'Perpetual Learning',
                    'Reinforcement Learning'
                ],
                correct: 2
            },
            {
                question: 'What is the primary purpose of neural networks?',
                options: [
                    'To mimic human brain function',
                    'To store data efficiently',
                    'To process network traffic',
                    'To encrypt data'
                ],
                correct: 0
            }
        ]
    },
    web3: {
        name: 'Web3 & Blockchain',
        questions: [
            {
                question: 'What is a smart contract?',
                options: [
                    'A legal document',
                    'Self-executing code on blockchain',
                    'A type of cryptocurrency',
                    'An NFT marketplace'
                ],
                correct: 1
            },
            {
                question: 'Which consensus mechanism uses less energy?',
                options: [
                    'Proof of Work',
                    'Proof of Stake',
                    'Proof of Authority',
                    'Proof of Space'
                ],
                correct: 1
            }
        ]
    }
};

let currentQuiz = null;
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.dataset.topic;
            startQuiz(topic);
        });
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentQuestion < quizData[currentQuiz].questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showResults();
        }
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('quiz-start').classList.remove('hidden');
        resetQuiz();
    });
});

function startQuiz(topic) {
    if (quizData[topic]) {
        currentQuiz = topic;
        currentQuestion = 0;
        score = 0;
        document.getElementById('quiz-start').classList.add('hidden');
        document.getElementById('quiz-questions').classList.remove('hidden');
        loadQuestion();
    }
}

function loadQuestion() {
    const question = quizData[currentQuiz].questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-counter').textContent = 
        `Question ${currentQuestion + 1}/${quizData[currentQuiz].questions.length}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    document.getElementById('next-btn').classList.add('hidden');
    selectedOption = null;

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn scale-up';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function selectOption(index) {
    if (selectedOption !== null) return;

    selectedOption = index;
    const buttons = document.querySelectorAll('.option-btn');
    const correctAnswer = quizData[currentQuiz].questions[currentQuestion].correct;

    buttons[index].classList.add('selected');
    buttons[correctAnswer].classList.add('correct');
    
    if (index === correctAnswer) {
        score++;
    } else {
        buttons[index].classList.add('incorrect');
    }

    document.getElementById('next-btn').classList.remove('hidden');
}

function showResults() {
    document.getElementById('quiz-questions').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    
    const percentage = (score / quizData[currentQuiz].questions.length) * 100;
    document.getElementById('score-display').textContent = `${percentage}%`;
    
    let message;
    if (percentage === 100) {
        message = 'Perfect score! You\'re a tech expert! 🏆';
    } else if (percentage >= 70) {
        message = 'Great job! You know your stuff! 🌟';
    } else if (percentage >= 50) {
        message = 'Good effort! Keep learning! 📚';
    } else {
        message = 'Keep practicing! Technology is always evolving! 💪';
    }
    
    document.getElementById('result-message').textContent = message;
}

function resetQuiz() {
    currentQuiz = null;
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
}