<template>
  <footer class="brutal-footer">

    <div class="footer-main">
      <div class="footer-col brand-col">
        <h2 class="footer-logo">SMKN9_<span class="text-outline">SHOP</span></h2>
        <p class="brand-desc">
          Penyedia asupan berkualitas untuk jiwa yang tangguh. <br>
          Dibangun dengan disiplin dan rasa oleh siswa SMKN 9 Medan.
        </p>
        <div class="corner-decoration">+</div>
      </div>

      <div class="footer-col links-col">
        <div class="link-group">
          <h4 class="col-label">DIREKTORI</h4>
          <router-link to="/">BERANDA</router-link>
          <router-link to="/menu">KATALOG_MENU</router-link>
          <router-link to="/about">TENTANG_KAMI</router-link>
        </div>
        <div class="link-group">
          <h4 class="col-label">SOSIAL</h4>
          <a href="#">INSTAGRAM [↗]</a>
          <a href="#">TIKTOK [↗]</a>
          <a href="#">FACEBOOK [↗]</a>
        </div>
      </div>

      <div class="footer-col action-col bg-mustard">
        <h4 class="col-label inverted">SUBSCRIBE</h4>
        <div class="newsletter-input">
          <input type="text" placeholder="EMAIL_ANDA" />
          <button class="join-btn bg-black text-white">GO</button>
        </div>
        <div class="contact-box">
          <p class="contact-info">GROUPLEMON0@GMAIL.COM</p>
          <p class="contact-info">+628 217 217 5234</p>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">© 2026 ERES & DINDA PRODUCTION. ALL RIGHTS RESERVED.</div>
      <div class="location">MEDAN | INDONESIA</div>
    </div>
  </footer>
</template>

<style scoped>
.brutal-footer {
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  /* Warna kuning lebih cerah agar lebih cantik */
  --line: 5px solid var(--black);
  margin-top: 80px;
  width: 100%;
  background-color: var(--white);
  border-top: var(--line);
  font-family: 'Space Grotesk', sans-serif;
  display: flex;
  flex-direction: column;
}

/* 2. MAIN CONTENT GRID */
.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 1.2fr 1fr;
}

.footer-col {
  padding: 4rem 3rem;
  border-right: var(--line);
  display: flex;
  flex-direction: column;
  position: relative;
}

.action-col {
  border-right: none;
}

/* DECORATION */
.corner-decoration {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border: var(--line);
  position: absolute;
  bottom: -20px;
  right: -20px;
  font-size: 40px;
  font-weight: 900;
  z-index: 5;
  background: white;
  padding: 0 5px;
}

/* TYPOGRAPHY */
.footer-logo {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 0.85;
  margin-bottom: 2rem;
  letter-spacing: -3px;
}

.text-outline {
  -webkit-text-stroke: 2px var(--black);
  color: transparent;
}

.brand-desc {
  font-weight: 700;
  line-height: 1.5;
  color: var(--black);
  max-width: 300px;
}

.col-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  font-weight: 900;
  margin-bottom: 2rem;
  display: inline-block;
}

.col-label.inverted {
  background: var(--black);
  color: var(--white);
  padding: 5px 12px;
  width: fit-content;
  box-shadow: 6px 6px 0px var(--white);
  margin-bottom: 2.5rem;
}

/* LINKS AREA */
.links-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-image: radial-gradient(var(--black) 1px, transparent 1px);
  background-size: 25px 25px;
  /* Motif bintik halus */
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.link-group a {
  text-decoration: none;
  color: var(--black);
  font-weight: 900;
  font-size: 1.1rem;
  transition: 0.1s;
}

.link-group a:hover {
  color: var(--mustard);
  -webkit-text-stroke: 1px var(--black);
  transform: skewX(-10deg) translateX(5px);
}

/* NEWSLETTER & ACTION */
.newsletter-input {
  display: flex;
  border: var(--line);
  background: var(--white);
  box-shadow: 8px 8px 0px var(--black);
  margin-bottom: 3rem;
}

.newsletter-input input {
  border: none;
  padding: 15px;
  flex-grow: 1;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  outline: none;
  width: 50%;
}

.join-btn {
  border: none;
  border-left: var(--line);
  padding: 0 25px;
  font-weight: 900;
  cursor: pointer;
  transition: 0.2s;
}

.join-btn:hover {
  background: var(--white);
  color: var(--black);
}

.contact-box {
  margin-top: auto;
}

.contact-info {
  font-family: 'Space Mono', monospace;
  font-weight: 800;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* BOTTOM BAR */
.footer-bottom {
  border-top: var(--line);
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  font-family: 'Space Mono', monospace;
  font-weight: 900;
  background-color: var(--black);
  color: var(--white);
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .footer-main {
    grid-template-columns: 1fr;
  }

  .footer-col {
    border-right: none;
    border-bottom: var(--line);
    padding: 3rem;
  }

  .links-col {
    background-image: none;
  }
}

@media (max-width: 600px) {
  .footer-logo {
    font-size: 2.5rem;
  }

  .links-col {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}

/* UTILITY */
.bg-black {
  background-color: var(--black);
}

.bg-mustard {
  background-color: var(--mustard);
}

.text-white {
  color: var(--white);
}
</style>