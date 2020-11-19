/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable quotes */
"use strict";

/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      questionNumber: 1,
      question:
        "In 1899, this painting, titled: Bridge over a Pond of Water Lilies, was painted as part of a 250 oil panting series by this artist.",
      answers: [
        "Who is Claude Monet?",
        "Who is Pablo Picaso?",
        "Who is Leonardo da Vinci?",
        "Who is Michelangelo?",
      ],
      correctAnswer: "Who is Claude Monet?",
    },
    {
      questionNumber: 2,
      question:
        "Yellow-Red-Blue, is an abstract oil painting by this Russian painter in 1925.",
      answers: [
        "Who is Frida Kahlo",
        "Who is Jackson Pollock?",
        "Who is Edouard Manet?",
        "Who is Wassily Kandinsky?",
      ],
      correctAnswer: "Who is Wassily Kandinsky?",
    },
    {
      questionNumber: 3,
      question:
        "This masterpiece of surrealism was created by this Spanish painter.",
      answers: [
        "Who is Hanri Matisse?",
        "Who is Rafael?",
        "Who is Salvatore Dali?",
        "Who is Peter Paul Rubens?",
      ],
      correctAnswer: "Who is Salvatore Dali?",
    },
    {
      questionNumber: 4,
      question:
        "Many say the artist of this piece, Café Terrace at Night, was sev-ear-ly underated.",
      answers: [
        "Who is Johannes Varmeer?",
        "Who is Rembrandt van Rijn?",
        "Who is Vincent van Gogh?",
        "Who is Paul Cezanne?",
      ],
      correctAnswer: "Who is Vincent van Gogh?",
    },
    {
      questionNumber: 5,
      question:
        "The Great Wave Off Kanagawa was the begining of this artist's 36 piece series depicting views of Mt. Fuji.",
      answers: [
        "Who is Takashi Murakami?",
        "Who is Hokusai?",
        "Who is Hiroshige?",
        "Who is Tensho Shubun?",
      ],
      correctAnswer: "Who is Hokusai?",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  incorrect: 0,
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
let question1Picture = document.getElementById("question1");
let question2Picture = document.getElementById("question2");
let question3Picture = document.getElementById("question3");
let question4Picture = document.getElementById("question4");
let question5Picture = document.getElementById("question5");
let pictures = [
  question1Picture,
  question2Picture,
  question3Picture,
  question4Picture,
  question5Picture,
];
function generateQuestionPage() {
  let question = store.questions[store.questionNumber];

  let answers = question.answers.map((answer, idx) => {
    //console.log(answer,idx);
    if (idx === 0) {
      return `<input type="radio" id="answer${idx}" name="answer" value='${answer}' required>
    <label for='answer${idx}'>${answer}</label><br>`;
    }
    return `<input type="radio" id="answer${idx}" name="answer" value='${answer}'>
    <label for='answer${idx}'>${answer}</label><br>`;
  });
  if (store.questionNumber === 0) {
    pictures[0].classList.toggle("hidden");
  } else if (store.questionNumber === 1) {
    pictures[1].classList.toggle("hidden");
  } else if (store.questionNumber === 2) {
    pictures[2].classList.toggle("hidden");
  } else if (store.questionNumber === 3) {
    pictures[3].classList.toggle("hidden");
  } else if (store.questionNumber === 4) {
    pictures[4].classList.toggle("hidden");
  }
  return `<div class='mainPage, clue'>
  <div class='status'>Current Question: ${store.questionNumber + 1}/5</div>
  <div class='score'>Current Score: ${store.score}</div>
  <form id='question'>
    <h2>${question.question}</h2>
    ${answers.join("")}
    <button class='submit'>Submit Answer.</button>
    </form>
  </div>`;
}

function generateMainPage() {
  pictures[0].classList.add("hidden");
  console.log(`generateMainPage 'ran'`);
  return `<header class="intro">
<h2>This is</h2>
<h1>JEOPARDY</h1>
<h3>Art edition</h3>
<button id="startQuiz">Start!</button>
</header>`;
}

function generateCorrectPage() {
  console.log(`generateCorrectPage 'ran'`);
  return `
  <section id='correctPage' class='page'>
  <h2 class="money header">+$600</h2>
  <img src="images/correct.jpg" alt="Alex Trebek saying you got it right">
  <h3>That is correct!</h3>
  <button id='nextQuestion' type="button">Next</button>
  </section>
  `;
}
function generateIncorrectPage() {
  console.log(`generateIncorrectPage'ran'`);
  return `
  <div id='incorrectPage' class='page'>
  <h2 class="money, header">-$600</h2>
  <img src="images/incorrect.jpg" alt="Alex Trebek saying you got it wrong">
  <h3>That is incorrect. The correct answer is ${
    store.questions[store.questionNumber].correctAnswer
  }</h3>
  <button id='nextQuestion' type="button">Next</button>
  </div>
  `;
}

function generateEndOfGamePage() {
  return `
  <div id='finalPage' class='page'>
  <h2 class="header">Thank you for playing jeopordy</h2>
  <img src="images/end.jpg" alt="Alex Trebek saying goodbye">
  <h3>You got ${store.score} correct and ${store.incorrect} incorrect!</h3>
  <h4>Think you can do better?</h4>
  <button id='startOver' type="button">Try again!</button>
  </div>
  `;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  let html = "";
  if (store.quizStarted === false) {
    if (store.questionNumber === store.questions.length) {
      html = generateEndOfGamePage();
    } else {
      html = generateMainPage();
    }
  } else if (store.questionNumber === store.questions.length) {
    html = generateEndOfGamePage();
  } else {
    html = generateQuestionPage();
  }
  $("main").html(html);
  //console.log(`render'ran'`);
  //how to know when to show final page
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartQuiz() {
  $("main").on("click", "#startQuiz", function () {
    store.quizStarted = true;
    render();
    console.log(`handleStartQuiz 'ran'`);
  });
}

function handleAnswerSubmit() {
  $("main").on("submit", "#question", function (event) {
    event.preventDefault();
    pictures[store.questionNumber].classList.toggle("hidden");
    let chosenAnswer = $("input[name='answer']:checked").val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    //compare against correct answer
    if (chosenAnswer === correctAnswer) {
      store.score++;
      $("main").html(generateCorrectPage());
    } else {
      store.incorrect++;
      $("main").html(generateIncorrectPage());
    }
  });
  //show user if they are correct or incorrect
  //on to next question
  //increment / decrement score
  //store.questionNumber++;
  //render();
}

function handleResetSubmit() {
  console.log(`handleResetSubmit 'ran'`);
  $("main").on("click", "#startOver", function () {
    store.quizStarted = false;
    store.score = 0;
    store.questionNumber = 0;
    render();
    console.log(`handleStartQuiz 'ran'`);
  });
}

function handleNextQuestion() {
  $("main").on("click", "#nextQuestion", function () {
    store.questionNumber++;
    render();
  });
}

function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  generateQuestionPage();
  generateMainPage();
  generateCorrectPage();
  generateIncorrectPage();
  generateEndOfGamePage();
  handleResetSubmit();
  handleNextQuestion();
}

$(main);
