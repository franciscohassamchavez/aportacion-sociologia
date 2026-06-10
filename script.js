const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const topBtn = document.getElementById('topBtn');
const counters = document.querySelectorAll('.counter');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

let countersStarted = false;
function animateCounters() {
  if (countersStarted) return;
  const statsPosition = document.querySelector('.stats-section').getBoundingClientRect().top;
  if (statsPosition < window.innerHeight - 100) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 50));
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = current;
        }
      }, 25);
    });
  }
}
window.addEventListener('scroll', animateCounters);
animateCounters();

const questions = [
  {
    question: '¿Cuál es una buena práctica de ciberseguridad?',
    options: ['Usar la misma contraseña siempre', 'Activar verificación en dos pasos', 'Compartir códigos por mensaje'],
    answer: 'Activar verificación en dos pasos'
  },
  {
    question: '¿Qué debes hacer antes de reciclar un celular viejo?',
    options: ['Borrar tus datos personales', 'Dejar tus cuentas abiertas', 'Tirarlo a la basura común'],
    answer: 'Borrar tus datos personales'
  },
  {
    question: '¿Cómo se debe usar la inteligencia artificial?',
    options: ['Como reemplazo total del pensamiento', 'Sin revisar sus respuestas', 'Como apoyo con pensamiento crítico'],
    answer: 'Como apoyo con pensamiento crítico'
  }
];

let currentQuestion = 0;
let selectedAnswer = '';
let score = 0;

const questionText = document.getElementById('questionText');
const quizOptions = document.getElementById('quizOptions');
const nextQuestion = document.getElementById('nextQuestion');
const quizResult = document.getElementById('quizResult');

function loadQuestion() {
  selectedAnswer = '';
  const item = questions[currentQuestion];
  questionText.textContent = item.question;
  quizOptions.innerHTML = '';
  quizResult.textContent = '';

  item.options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => {
      document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      selectedAnswer = option;
    });
    quizOptions.appendChild(button);
  });
}

nextQuestion.addEventListener('click', () => {
  if (!selectedAnswer) {
    quizResult.textContent = 'Selecciona una respuesta antes de continuar.';
    return;
  }

  if (selectedAnswer === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionText.textContent = 'Resultado final';
    quizOptions.innerHTML = '';
    nextQuestion.style.display = 'none';
    quizResult.textContent = `Obtuviste ${score} de ${questions.length} respuestas correctas. ${score === questions.length ? 'Excelente conciencia digital.' : 'Puedes mejorar revisando los temas de la página.'}`;
  }
});

loadQuestion();
