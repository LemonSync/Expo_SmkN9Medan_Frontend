<template>
  <div class="landing-wrapper">
    <nav class="navbar">
      <div class="nav-logo">MATH<span>PATTERN</span></div>
      <div class="nav-links">
        <a href="#features">Features</a>
        <a href="#how-to">How to Play</a>
        <button @click="goToAuth" class="btn-nav">LOGIN</button>
      </div>
    </nav>

    <header class="hero-section">
      <div class="badge">SEASON 2026 IS HERE</div>
      <h1>SHARPEN YOUR <span class="outline">LOGIC</span></h1>
      <p class="hero-sub">Game tebak pola angka tercepat dan tersulit. Apakah kamu cukup jenius untuk masuk Global Leaderboard?</p>
      <div class="hero-btns">
        <button @click="goToAuth" class="btn-main large">MAIN SEKARANG →</button>
      </div>
      
      <div class="landing-stats hero-stats">
        <StatItem value="10k+" label="Players" />
        <div class="stat-divider"></div>
        <StatItem value="500+" label="Patterns" />
        <div class="stat-divider"></div>
        <StatItem value="99%" label="Addictive" />
      </div>
    </header>

    <section id="features" class="section-padding bg-white border-top">
      <h2 class="text-center">Kenapa Pilih Kami?</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Speed Test</h3>
          <p>Hanya 10 detik per soal. Uji seberapa cepat otakmu memproses angka.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🏆</div>
          <h3>Live Ranking</h3>
          <p>Bersaing secara real-time dengan pemain dari seluruh dunia.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🧠</div>
          <h3>Dynamic Level</h3>
          <p>Soal akan semakin sulit seiring dengan bertambahnya skor kamu.</p>
        </div>
      </div>
    </section>

    <section id="how-to" class="section-padding bg-accent border-top">
      <h2 class="text-center">Cara Bermain</h2>
      <div class="steps-container">
        <div class="step-card">
          <div class="step-num">01</div>
          <div class="step-content">
            <h3>Analisis Pola</h3>
            <p>Perhatikan deretan angka yang muncul. Cari logika di baliknya (penjumlahan, perkalian, atau pola unik lainnya).</p>
          </div>
        </div>
        <div class="step-card">
          <div class="step-num">02</div>
          <div class="step-content">
            <h3>Input Cepat</h3>
            <p>Ketik jawabanmu sebelum waktu 10 detik habis. Ingat, satu kesalahan akan mengurangi nyawa (Lives) kamu!</p>
          </div>
        </div>
        <div class="step-card">
          <div class="step-num">03</div>
          <div class="step-content">
            <h3>Naikkan Level</h3>
            <p>Semakin banyak jawaban benar, pola akan semakin rumit. Bertahanlah selama mungkin untuk skor tertinggi!</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <h3>MATHPATTERN</h3>
          <p>Built for the logic seekers.</p>
        </div>
        <div class="footer-links">
          <p>© 2026 Eres Fran Setia Simbolon.</p>
          <p>Github: <a style="text-decoration: none; color: white;" href="https://github.com/lemonsync">LemonSync</a></p>
          <p>WhatsApp: <a style="text-decoration: none; color: white;" href="https://wa.me/6282172175234">+6282172175234</a></p>
          <p>Portofolio: <a style="text-decoration: none; color: white;" href="https://eres.my.id">Click Me</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import StatItem from '../components/StatItem.vue'

const router = useRouter()
const goToAuth = () => router.push('/game/auth')
</script>

<style scoped>
@import url('../assets/style.css');

/* --- LAYOUT UTAMA --- */
.landing-wrapper {
  width: 100%;
  background-color: var(--accent); /* Menggunakan warna kuning dari global */
  min-height: 100vh;
  z-index: 500;
}

/* --- NAVBAR --- */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background: var(--white);
  border-bottom: 5px solid var(--main);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-logo {
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -1px;
}

.nav-logo span {
  color: var(--secondary);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--main);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.9rem;
  transition: 0.2s;
}

.nav-links a:hover {
  color: var(--secondary);
}

.btn-nav {
  width: auto;
  padding: 10px 25px;
  font-size: 0.9rem;
  margin-bottom: 0;
  background: var(--secondary);
}

/* --- HERO SECTION --- */
.hero-section {
  text-align: center;
  padding: 100px 5%;
  background-color: var(--accent);
}

.badge {
  background: #fd79a8;
  border: 3px solid var(--main);
  padding: 8px 20px;
  display: inline-block;
  font-weight: 900;
  transform: rotate(-2deg);
  margin-bottom: 1.5rem;
}

h1 {
  font-size: clamp(3rem, 10vw, 5rem);
  line-height: 0.85;
  margin-bottom: 1.5rem;
  font-weight: 900;
}

h1 .outline {
  -webkit-text-stroke: 2px var(--main);
  color: transparent;
}

.hero-sub {
  font-size: 1.2rem;
  font-weight: 600;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.4;
}

.btn-main.large {
  max-width: 320px;
  font-size: 1.5rem;
  padding: 20px;
  background: var(--success);
}

/* --- STATS IN HERO --- */
/* --- STATS SECTION --- */
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 4rem;
  background: var(--white);
  border: 4px solid var(--main);
  padding: 1.5rem 3rem;
  box-shadow: 10px 10px 0px var(--main); /* Bayangan kaku khas neobrutalism */
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.3s ease;
}

.hero-stats:hover {
  transform: rotate(1deg) translateY(-5px); /* Sedikit miring agar lebih dinamis */
}

/* Mengatur Komponen StatItem di dalam Hero */
:deep(.stat-item) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Styling Angka (Value) */
:deep(.stat-item .value) {
  font-family: 'Space Mono', monospace; /* Font angka programmer */
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--main);
}

/* Styling Label di bawah angka */
:deep(.stat-item .label) {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-top: 5px;
  color: var(--secondary); /* Warna ungu agar kontras */
}

/* Garis pembatas antar stats */
.stat-divider {
  width: 4px;
  height: 45px;
  background: var(--main);
  border-radius: 2px;
}

/* Responsive: Jadi vertikal kalau di HP */
@media (max-width: 600px) {
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
    transform: rotate(0deg);
    width: 90%;
  }

  .stat-divider {
    width: 50px;
    height: 4px;
  }
}

/* --- FEATURES SECTION --- */
.section-padding {
  padding: 100px 5%;
}

.bg-white { background: var(--white); }
.border-top { border-top: 6px solid var(--main); }

.text-center {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 3rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: var(--white);
  border: 4px solid var(--main);
  padding: 2.5rem;
  box-shadow: 8px 8px 0px var(--main);
  transition: 0.2s;
}

.feature-card:hover {
  transform: rotate(1deg) translate(-5px, -5px);
  box-shadow: 13px 13px 0px var(--secondary);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

/* --- FOOTER --- */
.footer {
  background: var(--main);
  color: var(--white);
  padding: 60px 5%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-brand h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 900;
}

.footer-links p {
  font-weight: 600;
  opacity: 0.8;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* Sederhanakan untuk mobile */
  }
  
  .hero-section {
    padding: 60px 20px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-divider {
    width: 60px;
    height: 4px;
  }

  .text-center {
    font-size: 2rem;
  }
}

/* --- HOW TO PLAY SECTION --- */
.bg-accent {
  background-color: var(--accent);
}

.steps-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step-card {
  display: flex;
  align-items: center;
  background: var(--white);
  border: 4px solid var(--main);
  box-shadow: 8px 8px 0px var(--main);
  padding: 2rem;
  gap: 2rem;
  transition: 0.2s;
}

.step-card:hover {
  transform: translate(-5px, -5px);
  box-shadow: 13px 13px 0px var(--danger); /* Menggunakan warna merah untuk hover */
}

.step-num {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--white);
  background: var(--main);
  padding: 10px 20px;
  line-height: 1;
  border: 4px solid var(--secondary);
  transform: rotate(-5deg);
}

.step-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.step-content p {
  font-weight: 600;
  color: #444;
}

/* Penyesuaian Responsif untuk How To Play */
@media (max-width: 600px) {
  .step-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .step-num {
    margin-bottom: 1rem;
    transform: rotate(0deg);
  }
}
</style>
