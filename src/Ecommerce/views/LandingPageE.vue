<template>
  <div class="landing-page">
    <section class="hero">
      <div class="hero-wrapper">
        <div class="badge-container">
          <div class="badge bg-black text-white">SMK_BISA | SMK_HEBAT</div>
        </div>

        <div class="hero-main-content">
          <h1 class="main-title left">SELAMAT_<br /> DATANG_DI</h1>

          <div class="hero-visual-center bg-soda">
            <div class="visual-box bg-white">
              <img src="../assets/logo.jpg" class="full-img" alt="Logo SMKN9">
            </div>
          </div>

          <h1 class="main-title right">
            <span class="outline-text">SMKN9_SHOP</span>
          </h1>
        </div>

        <div class="hero-footer-content">
          <p class="description">
            Kami menyediakan menu makanan dan minuman yang sehat bagi pembeli yang datang ke toko kami.
          </p>
          <router-link to="/menu" class="cta-btn bg-mustard">
            ORDER_SEKARANG [->]
          </router-link>
        </div>
      </div>
    </section>

    <section class="why-us-section">
      <div class="section-title border-bottom bg-white">
        <h2 class="text-small">KENAPA_KAMI_?</h2>
      </div>

      <div class="why-us-grid bg-white">
        <div class="why-card card-rotate-left">
          <div class="why-header bg-black text-white">01 / LOKAL</div>
          <div class="why-content">
            <h3>BAHAN_ASLI</h3>
            <p>DIAMBIL LANGSUNG DARI SUMBERNYA TANPA PERANTARA MAFIA. 😎</p>
            <div class="sticker bg-mustard">STOK_FRESH</div>
          </div>
        </div>

        <div class="why-card card-rotate-right">
          <div class="why-header bg-ketchup text-white">02 / SPEED</div>
          <div class="why-content">
            <h3>PROSES_KILAT</h3>
            <p>KAMI TIDAK SUKA MENUNGGU LAMA, BEGITU JUGA DENGAN ANDA. 😤</p>
            <div class="sticker bg-soda text-white">INSTANT_GET</div>
          </div>
        </div>

        <div class="why-card card-rotate-mid">
          <div class="why-header bg-soda text-white">03 / HONEST</div>
          <div class="why-content">
            <h3>HARGA_JUJUR</h3>
            <p>APA YANG ANDA LIHAT, ITU YANG DIBAYAR. NO HIDDEN FEE. 😏</p>
            <div class="sticker bg-mustard">NO_SCAM</div>
          </div>
        </div>
      </div>
    </section>

    <section class="featured">
      <div class="section-title border-bottom bg-white">
        <h2 class="text-small">MENU_POPULER</h2>
      </div>

      <div class="featured-grid bg-white">
        <div class="sample-card card-tilt-left">
          <div class="card-header bg-black text-white">
            <span class="category-tag">POPULAR_01</span>
            <span class="promo-tag bg-ketchup">HOT_DEAL</span>
          </div>

          <div class="sample-visual">
            <div class="visual-overlay"></div>
            <img src="../assets/nasi_goreng.jpg" alt="Nasi Goreng">
            <div class="image-noise"></div>
            <div class="card-tag bg-ketchup">BEST_SELLER</div>
          </div>

          <div class="sample-body bg-white">
            <div class="item-info">
              <h4 class="product-name">NASI_GORENG</h4>
              <div class="price-box bg-mustard">IDR_10K</div>
            </div>
          </div>

          <div class="sample-footer">
            <router-link to="/menu" class="mini-btn">
              LIHAT_DETAIL_MENU [+]
            </router-link>
          </div>
          <div class="visual-accent bg-mustard">TOP_RATED</div>
        </div>

        <div class="sample-card card-tilt-right">
          <div class="card-header bg-black text-white">
            <span class="category-tag">POPULAR_02</span>
          </div>

          <div class="sample-visual">
            <div class="visual-overlay"></div>
            <img src="../assets/burger.jpg" alt="Burger">
            <div class="image-noise"></div>
            <div class="card-tag bg-soda text-white">LIMITED</div>
          </div>

          <div class="sample-body bg-white">
            <div class="item-info">
              <h4 class="product-name">BURGER</h4>
              <div class="price-box bg-mustard">IDR_10K</div>
            </div>
          </div>

          <div class="sample-footer">
            <router-link to="/menu" class="mini-btn">
              LIHAT_DETAIL_MENU [+]
            </router-link>
          </div>
        </div>

        <div class="sample-card card-tilt-left">
          <div class="card-header bg-black text-white">
            <span class="category-tag">POPULAR_03</span>
            <span class="promo-tag bg-lettuce">FRESH</span>
          </div>

          <div class="sample-visual">
            <div class="visual-overlay"></div>
            <img src="../assets/jus_jeruk.jpg" alt="Drink">
            <div class="image-noise"></div>
            <div class="card-tag bg-mustard">NEW_ITEM</div>
          </div>

          <div class="sample-body bg-white">
            <div class="item-info">
              <h4 class="product-name">JUS_JERUK_PERAS</h4>
              <div class="price-box bg-mustard">IDR_6K</div>
            </div>
          </div>

          <div class="sample-footer">
            <router-link to="/menu" class="mini-btn">
              LIHAT_DETAIL_MENU [+]
            </router-link>
          </div>
          <div class="visual-accent bg-lettuce">ICE_COLD</div>
        </div>
      </div>
    </section>

    <div class="footerkan">
      <BrutalFooter />
    </div>
  </div>
</template>

<script setup>
import BrutalFooter from '../components/BrutalFooter.vue';
</script>

<style scoped>
.landing-page {
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --lettuce: #00FF47;
  --soda: #0051FF;
  --line: 6px solid var(--black);

  width: 100%;
  background-color: var(--white);
  font-family: 'Space Grotesk', sans-serif;
  color: var(--black);
  overflow-x: hidden;
}

.full-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* HERO SECTION */
.hero {
  border-bottom: var(--line);
  min-height: calc(100vh - 90px);
  /* Pastikan hero mengisi sisa layar tepat setelah navbar */
  display: flex;
  margin: 0;
  /* Pastikan tidak ada margin luar */
}

.hero-wrapper {
  width: 100%;
  min-height: 100%;
  padding: 4rem 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.8s ease;
}

.hero-main-content {
  gap: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: white;
  animation: fadeIn 1.5s ease;
}

.hero-visual-center {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--mustard);
}

.visual-box {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: var(--line);
  overflow: hidden;
  background: white;
}

.main-title {
  text-align: center;
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1;
}

.outline-text {
  -webkit-text-stroke: 2px white;
  color: transparent;
}

.hero-footer-content {
  margin-right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.description {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  max-width: 550px;
  margin: 2rem auto;
  text-align: center;
}

.cta-btn {
  text-align: center;
  display: inline-block;
  padding: 1.2rem 2.5rem;
  border: var(--line);
  font-size: 1.5rem;
  font-weight: 900;
  text-decoration: none;
  color: var(--black);
  background: var(--mustard);
  box-shadow: 10px 10px 0px var(--black);
  transition: 0.1s;
}

.cta-btn:hover {
  transform: translate(-4px, -4px);
  box-shadow: 14px 14px 0px var(--black);
}

/* WHY US SECTION */
.why-us-section {
  background-color: var(--white);
  padding-bottom: 4rem;
  border-bottom: var(--line);
}

.why-us-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding: 4rem 3rem;
  background-image: radial-gradient(var(--black) 1px, transparent 1px);
  background-size: 25px 25px;
}

.why-card {
  background: var(--white);
  border: var(--line);
  box-shadow: 12px 12px 0px var(--black);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.why-card:hover {
  transform: translate(-5px, -5px) rotate(0deg) !important;
  box-shadow: 18px 18px 0px var(--black);
  z-index: 10;
}

.why-header {
  padding: 0.8rem;
  font-family: 'Space Mono', monospace;
  font-weight: 900;
  border-bottom: var(--line);
  font-size: 0.9rem;
}

.why-content {
  padding: 2rem;
  position: relative;
  flex-grow: 1;
}

.why-content h3 {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.why-content p {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.3;
}

.sticker {
  position: absolute;
  bottom: -15px;
  right: -10px;
  padding: 5px 10px;
  border: 3px solid var(--black);
  font-weight: 900;
  font-size: 0.7rem;
  box-shadow: 4px 4px 0px var(--black);
}

/* FEATURED SECTION */
.featured {
  animation: fadeIn 0.5s ease;
}

.section-title {
  padding: 1.5rem 3rem;
}

.text-small {
  font-size: 2rem;
  font-weight: 900;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  padding: 4rem 2rem;
  background-image: linear-gradient(var(--black) 1.5px, transparent 1.5px),
    linear-gradient(90deg, var(--black) 1.5px, transparent 1.5px);
  background-size: 40px 40px;
  background-color: #f0f0f0;
  border-bottom: var(--line);
}

.sample-card {
  background: white;
  border: var(--line);
  box-shadow: 10px 10px 0px var(--black);
  display: flex;
  flex-direction: column;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  box-sizing: border-box;
}

.sample-card:hover {
  transform: translate(-5px, -5px) scale(1.02);
  box-shadow: 15px 15px 0px var(--soda);
  z-index: 5;
}

.card-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: var(--line);
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 900;
}

.sample-visual {
  height: 250px;
  border-bottom: var(--line);
  position: relative;
  overflow: hidden;
  background: var(--black);
}

.sample-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}

.visual-overlay::before,
.visual-overlay::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 2;
}

.visual-overlay::before {
  top: 15px;
  left: 15px;
  border-top: 4px solid white;
  border-left: 4px solid white;
}

.visual-overlay::after {
  bottom: 15px;
  right: 15px;
  border-bottom: 4px solid white;
  border-right: 4px solid white;
}

.image-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
  opacity: 0.1;
  pointer-events: none;
  z-index: 1;
}

.sample-card:hover .sample-visual img {
  filter: grayscale(0%);
  transform: scale(1.1);
}

.card-tag {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 5px 12px;
  font-weight: 900;
  font-size: 0.8rem;
  border: 3px solid var(--black);
  transform: rotate(-5deg);
  z-index: 2;
}

.visual-accent {
  position: absolute;
  top: -15px;
  right: -15px;
  padding: 5px 15px;
  border: 3px solid var(--black);
  font-weight: 900;
  font-size: 0.8rem;
  box-shadow: 5px 5px 0px var(--black);
  z-index: 3;
}

.sample-body {
  padding: 1.5rem;
  flex-grow: 1;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
}

.price-box {
  display: inline-block;
  padding: 4px 10px;
  border: 3px solid var(--black);
  font-family: 'Space Mono', monospace;
  font-weight: 900;
}

/* Footer Card (Tombol) */
.sample-footer {
  border-top: var(--line);
}

.item-info h4 {
  font-size: 1.3rem;
  font-weight: 900;
  margin: 0 0 5px 0;
  letter-spacing: -1px;
}

.item-price {
  font-family: 'Space Mono', monospace;
  font-weight: 800;
  color: var(--ketchup);
}

.mini-btn {
  display: block;
  width: 100%;
  padding: 1.2rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: var(--black);
  font-weight: 900;
  transition: 0.2s;
  text-transform: uppercase;
}

.mini-btn:hover {
  background-color: var(--soda);
  color: white;
}

/* ROTATION & TILT CLASSES */
.card-rotate-left,
.card-tilt-left {
  transform: rotate(-3deg);
}

.card-rotate-right,
.card-tilt-right {
  transform: rotate(3deg);
}

.card-rotate-mid {
  transform: rotate(1deg);
}

/* UTILITIES */
.badge-container {
  margin-bottom: 50px;
}

.badge {
  padding: 10px;
  font-weight: 900;
  border: 3px solid var(--white);
  margin-right: 100px;
}

.bg-white {
  background-color: var(--white);
}

.bg-black {
  background-color: var(--black);
}

.bg-mustard {
  background-color: var(--mustard);
}

.bg-soda {
  background-color: var(--soda);
}

.bg-ketchup {
  background-color: var(--ketchup);
}

.bg-lettuce {
  background-color: var(--lettuce);
}

.text-white {
  color: var(--white);
}

.border-bottom {
  border-bottom: var(--line);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .featured-grid {
    grid-template-columns: 1fr !important;
    padding: 2rem 1.5rem;
  }

  .sample-card {
    transform: rotate(0deg) !important;
  }
}

@media (max-width: 1024px) {
  .hero-main-content {
    flex-direction: column;
    gap: 2rem;
  }

  .hero-footer-content {
    margin-right: 0;
  }

  .why-us-grid,
  .featured-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
    padding: 3rem 1.5rem;
  }

  .why-card,
  .sample-card {
    transform: rotate(0deg) !important;
  }
}
</style>