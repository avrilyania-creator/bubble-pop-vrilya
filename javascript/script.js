// BUBBLE POP BY VRILYA - JS LENGKAP

// 1. REGISTER
function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;
  if(user=="" || pass=="") { alert("Isi username & password!"); return; }
  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);
  alert("Berhasil Daftar! Silakan Login");
  window.location.href = "login.html";
}

// 2. LOGIN
function login() {
  let user = document.getElementById("logUser").value;
  let pass = document.getElementById("logPass").value;
  let saveUser = localStorage.getItem("username");
  let savePass = localStorage.getItem("password");
  if(user==saveUser && pass==savePass) {
    localStorage.setItem("isLogin", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Username / Password Salah!");
  }
}

// 3. CEK LOGIN DI DASHBOARD
function cekLogin() {
  if(localStorage.getItem("isLogin")!="true") {
    window.location.href="login.html";
  } else {
    document.getElementById("userDisplay").innerText = localStorage.getItem("username");
    document.getElementById("highScore").innerText = localStorage.getItem("highScore") || 0;
  }
}

// 4. LOGOUT
function logout() {
  localStorage.removeItem("isLogin");
  window.location.href="index.html";
}

// 5. GAME BUBBLE POP
let score = 0;
let time = 60;
let gameInterval;
let bubbleInterval;

function startGame() {
  score = 0; time = 60;
  document.getElementById("score").innerText = score;
  document.getElementById("timer").innerText = time;
  document.getElementById("gameArea").innerHTML = "";
  
  gameInterval = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;
    if(time<=0) endGame();
  }, 1000);

  bubbleInterval = setInterval(createBubble, 800);
}

function createBubble() {
  let gameArea = document.getElementById("gameArea");
  if(!gameArea) return;
  let bubble = document.createElement("div");
  bubble.classList.add("bubble");
  
  // Warna random + poin beda
  let colors = [
    {c:"#ff69b4", p:10}, // Pink 10
    {c:"#69ddff", p:20}, // Biru 20
    {c:"#ffeb3b", p:30}, // Kuning 30
    {c:"#9c27b0", p:50}  // Ungu 50
  ];
  let rand = colors[Math.floor(Math.random()*colors.length)];
  bubble.style.background = rand.c;
  bubble.dataset.poin = rand.p;
  
  bubble.style.left = Math.random()*90 + "%";
  bubble.style.bottom = "0px";
  
  bubble.onclick = function() {
    score += parseInt(this.dataset.poin);
    document.getElementById("score").innerText = score;
    this.remove();
  };
  
  gameArea.appendChild(bubble);
  setTimeout(()=>{ bubble.remove(); }, 3000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(bubbleInterval);
  alert("Waktu Habis! Skor Kamu: " + score);
  let high = localStorage.getItem("highScore") || 0;
  if(score > high) {
    localStorage.setItem("highScore", score);
    alert("HIGH SCORE BARU!");
  }
  window.location.href="dashboard.html";
}s