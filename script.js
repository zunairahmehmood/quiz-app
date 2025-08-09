// signup
function getData(){
    return JSON.parse(localStorage.getItem("user")) || [];
}

function signUp(){
    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let user = getData();

    if (!name || !username || !email || !password || !confirmPassword) {
        Swal.fire("Please fill all fields!");
        return;
    }

    let existingUser = user.find(u => u.email === email || u.username === username || u.password === password);
    if (existingUser) {
        Swal.fire("User already exists!");
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire("Passwords do not match!");
        return;
    }

    let details = {
        name: name,
        username: username,
        email: email,
        password: password
    };
    user.push(details);
    localStorage.setItem("user", JSON.stringify(user));
    Swal.fire({
    title: "Account created successfully",
    icon: "success",
    draggable: true
    });
}
// signup end




// login
function login() {
    let usernameOrEmail = document.getElementById("login-username-email").value.trim();
    let loginPassword = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("user")) || [];

    let loginExistingUser = users.find(u => 
        (u.email === usernameOrEmail || u.username === usernameOrEmail) 
        && u.password === loginPassword
    );

    if (loginExistingUser) {
        window.location.href = "quiz.html";
    } else {
        let userExists = users.find(u => 
            u.email === usernameOrEmail || u.username === usernameOrEmail
        );
        if (!userExists) {
            Swal.fire({
                title: "Invalid username or email",
                text: "Please check your username/email",
                icon: "error",
                draggable: true
            });
        } else {
            Swal.fire({
                title: "Invalid Password",
                text: "Please check your password.",
                icon: "error",
                draggable: true
            });
        }
        
    }
}
// login end




// quiz
let questions = [
    // HTML Questions
    {
        question: "Q1: What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Hyperlinks Text Makeup Language",
            "High Text Machine Language",
            "Hyper Text Making Lines"
        ],
        correctAnswer: 0
    },
    {
        question: "Q2: Which tag is used to create the largest heading in HTML?",
        options: [
            "&lt;h1&gt;",
            "&lt;h6&gt;",
            "&lt;heading&gt;",
            "&lt;head&gt;"
        ],
        correctAnswer: 0
    },
    {
        question: "Q3: Which tag is used to create a paragraph in HTML?",
        options: [
            "&lt;para&gt;",
            "&lt;p&gt;",
            "&lt;pg&gt;",
            "&lt;text&gt;"
        ],
        correctAnswer: 1
    },
    {
        question: "Q4: Which attribute specifies a unique identifier for an HTML element?",
        options: [
            "class",
            "id",
            "style",
            "name"
        ],
        correctAnswer: 1
    },
    {
        question: "Q5: Which HTML tag is used to display an image?",
        options: [
            "&lt;picture&gt;",
            "&lt;img&gt;",
            "&lt;src&gt;",
            "&lt;image&gt;"
        ],
        correctAnswer: 1
    },
    {
        question: "Q6: What is the correct HTML tag for inserting a line break?",
        options: [
            "&lt;break&gt;",
            "&lt;br&gt;",
            "&lt;lb&gt;",
            "&lt;line&gt;"
        ],
        correctAnswer: 1
    },
    {
        question: "Q7: Which HTML element is used for creating a hyperlink?",
        options: [
            "&lt;link&gt;",
            "&lt;href&gt;",
            "&lt;a&gt;",
            "&lt;url&gt;"
        ],
        correctAnswer: 2
    },
    {
        question: "Q8: Which tag is used for creating an unordered list?",
        options: [
            "&lt;ul&gt;",
            "&lt;ol&gt;",
            "&lt;li&gt;",
            "&lt;list&gt;"
        ],
        correctAnswer: 0
    },
    {
        question: "Q9: Which tag is used for creating a table row?",
        options: [
            "&lt;tr&gt;",
            "&lt;td&gt;",
            "&lt;th&gt;",
            "&lt;row&gt;"
        ],
        correctAnswer: 0
    },
    {
        question: "Q10: Which HTML element is used for adding a title to a web page?",
        options: [
            "&lt;header&gt;",
            "&lt;title&gt;",
            "&lt;meta&gt;",
            "&lt;head&gt;"
        ],
        correctAnswer: 1
    },
    {
        question: "Q11: What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Colorful Style Syntax",
            "Computer Styling System",
            "Creative Style Setup"
        ],
        correctAnswer: 0
    },
    {
        question: "Q12: Which property is used to change text color in CSS?",
        options: ["font-color", "text-color", "color", "background-color"],
        correctAnswer: 2
    },
    {
        question: "Q13: Which CSS property controls text size?",
        options: ["font-size", "text-size", "size", "font-style"],
        correctAnswer: 0
    },
    {
        question: "Q14: How do you select an element with id 'demo' in CSS?",
        options: ["#demo", ".demo", "demo", "*demo"],
        correctAnswer: 0
    },
    {
        question: "Q15: Which property is used to set background color?",
        options: ["color", "bgcolor", "background-color", "background"],
        correctAnswer: 2
    },
    {
        question: "Q16: Which value of position property makes an element stay fixed on the screen?",
        options: ["relative", "absolute", "fixed", "sticky"],
        correctAnswer: 2
    },
    {
        question: "Q17: Which CSS property is used to make text italic?",
        options: ["font-style", "font-weight", "text-decoration", "style"],
        correctAnswer: 0
    },
    {
        question: "Q18: What is the correct CSS syntax to change background image?",
        options: [
            "background-image: url('image.jpg');",
            "bg-image: url('image.jpg');",
            "background: image('image.jpg');",
            "img-background: url('image.jpg');"
        ],
        correctAnswer: 0
    },
    {
        question: "Q19: Which unit is relative to the size of the root element in CSS?",
        options: ["em", "px", "rem", "%"],
        correctAnswer: 2
    },
    {
        question: "Q20: Which property is used to round the corners of an element?",
        options: ["border-style", "corner-radius", "border-radius", "radius"],
        correctAnswer: 2
    },
    {
        question: "Q21: Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Oracle"],
        correctAnswer: 1
    },
    {
        question: "Q22: Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "/*", "#", "!--"],
        correctAnswer: 0
    },
    {
        question: "Q23: Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correctAnswer: 3
    },
    {
        question: "Q24: What is the output of typeof null in JavaScript?",
        options: ["null", "undefined", "object", "number"],
        correctAnswer: 2
    },
    {
        question: "Q25: Which method is used to write content into an HTML document using JavaScript?",
        options: ["document.write()", "console.log()", "window.write()", "alert()"],
        correctAnswer: 0
    },
    {
        question: "Q26: Which operator is used to assign a value to a variable?",
        options: ["=", "==", "===", "=>"],
        correctAnswer: 0
    },
    {
        question: "Q27: Which method is used to remove the last element from an array?",
        options: ["pop()", "push()", "shift()", "remove()"],
        correctAnswer: 0
    },
    {
        question: "Q28: What will '2' + 2 output in JavaScript?",
        options: ["4", "22", "NaN", "Error"],
        correctAnswer: 1
    },
    {
        question: "Q29: Which function is used to parse a string to an integer in JavaScript?",
        options: ["parseInt()", "parse()", "stringToInt()", "Number()"],
        correctAnswer: 0
    },
    {
        question: "Q30: Which method is used to add an element at the end of an array?",
        options: ["push()", "pop()", "unshift()", "append()"],
        correctAnswer: 0
    }
];
let currentQuestionIndex = 0;
let score = 0;

let questionEl = document.getElementById("question");
let optionsEl = document.getElementById("options");
let nextBtn = document.getElementById("next-btn");
let timerEl = document.getElementById("timer");
let countdown; 
let totalTime = 1800; // seconds

// load first question
function loadQuestion() {
    let current = questions[currentQuestionIndex];
    questionEl.innerHTML = current.question;
    optionsEl.innerHTML = "";

    for (let i = 0; i < current.options.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = current.options[i];
        btn.className = "option-btn";
        btn.onclick = (function(index) {
            return function() {
                checkAnswer(index);
            };
        })(i);
        optionsEl.appendChild(btn);
    }
}

// function for check answer
function checkAnswer(selectedIndex) {
    let correctIndex = questions[currentQuestionIndex].correctAnswer;
    if (selectedIndex === correctIndex) {
        score++;
    }

    if (currentQuestionIndex === questions.length - 1) {
    clearInterval(countdown);
    }

    nextBtn.style.transform = "scale(1)";
}

// next button functionality
nextBtn.onclick = function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextBtn.style.transform = "scale(0)";
    } else {
        clearInterval(countdown);

        // Calculate result data
        let totalQuestions = questions.length;
        let percentage = ((score / totalQuestions) * 100).toFixed(2);

        // result localStorage
        let quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];
        quizResults.push({
            score: score,
            total: totalQuestions,
            percentage: percentage,
            date: new Date().toLocaleString()
        });
        localStorage.setItem("quizResults", JSON.stringify(quizResults));

        // result screen
        document.body.innerHTML = `
            <div class="result-container">
                <h1>🎉 Quiz Completed! 🎉</h1>
                <p class="score">You scored <strong>${score}</strong> out of <strong>${totalQuestions}</strong></p>
                <p class="percentage">Percentage: <strong>${percentage}%</strong></p>
                <button class="restart-btn" id="restartQuiz">Restart Quiz</button>
            </div>
        `;

        document.getElementById("restartQuiz").onclick = function () {
            location.reload();
        };
    }
};
// next button functionality end


// timer
function startQuizTimer() {
    let timeLeft = totalTime;
    updateTimerDisplay(timeLeft);

    countdown = setInterval(function() {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            Swal.fire(`Time's up! Your score is: ${score}`);
            nextBtn.disabled = true;

            let optionButtons = document.querySelectorAll(".option-btn");
            optionButtons.forEach(function(btn) {
                btn.disabled = true;
                btn.style.pointerEvents = "none";
            });
            return;
        }
    }, 1000);
}
function updateTimerDisplay(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    secs = secs < 10 ? "0" + secs : secs;
    timerEl.innerHTML = `Time left: ${minutes}:${secs}`;
}
// timer end

loadQuestion();
startQuizTimer();
// quiz end