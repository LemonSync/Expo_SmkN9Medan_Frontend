<template>
  <div class="app-container">
    <div class="bg-grid"></div>
    <div class="grain"></div>

    <!-- TAMPILAN LANDING PAGE -->
    <main v-if="$route.path === '/'" class="landing-page">
      
      <!-- DECORATIVE STICKERS -->
      <div class="sticker s1">EXPO_2026</div>
      <div class="sticker s2">SMKN9_MEDAN</div>

      <header class="hero-section">
        <div class="hero-box bg-mustard border-brutal">
          <div class="box-label">SYSTEM_OS_V.2.0</div>
          <h1 class="hero-title">SMKN 9 MEDAN</h1>
          <p class="hero-subtitle">INTEGRATED LOGIC AND COMMERCE PLATFORM</p>
        </div>
      </header>

      <!-- PORTAL SELECTION -->
      <section class="portal-grid">
        <router-link to="/game" class="portal-card bg-soda text-white border-brutal">
          <div class="portal-badge">01</div>
          <div class="portal-content">
            <h2 class="text-white">MATH_PATTERN</h2>
            <p>Uji kecepatan berpikir melalui pola angka yang sulit. Built for the logic seekers. Taklukkan leaderboards sekarang!</p>
            <div class="portal-btn">[ COBA ]</div>
          </div>
        </router-link>

        <router-link to="/ecommerce" class="portal-card bg-lettuce border-brutal">
          <div class="portal-badge bg-black text-white">02</div>
          <div class="portal-content">
            <h2 class="text-black">UNIT_COMMERCE</h2>
            <p>Sistem transaksi unit produk cepat dengan sinkronisasi database cloud. Efisien, brutal, dan transparan.</p>
            <div class="portal-btn text-black">[ LIHAT ]</div>
          </div>
        </router-link>
      </section>

      <!-- GUEST BOOK SECTION -->
      <section class="guestbook-section">
        <h2 class="section-main-title">BUKU TAMU</h2>
        <div class="guestbook-container">
          <!-- Form -->
          <div class="guest-form border-brutal bg-white">
            <div class="form-header">INPUT_DATA</div>
            <div class="form-body">
              <div class="input-group">
                <label>NAMA</label>
                <input v-model="guestData.nama" type="text" placeholder="NAMA_LENGKAP..." class="brutal-input">
              </div>
              <div class="input-group">
                <label>PESAN</label>
                <textarea v-model="guestData.pesan" placeholder="TULIS_SESUATU..." class="brutal-input"></textarea>
              </div>
              <div class="input-group">
                <label>INSTANSI</label>
                <textarea v-model="guestData.instansi" placeholder="SMKN 9 MEDAN..." class="brutal-input"></textarea>
              </div>
              <button @click="kirimPesan" class="send-btn bg-ketchup text-white" :disabled="loading">
                {{ loading ? 'SENDING...' : 'KIRIM_DATA [→]' }}
              </button>
            </div>
          </div>

          <!-- List -->
          <div class="guest-list border-brutal bg-black text-white">
            <div class="list-header bg-white text-black">PENGUNJUNG [{{ guests.length }}]</div>
            <div class="scroll-area">
              <div v-for="g in guests" :key="g.id" class="guest-item">
                <div class="guest-meta">
                  <span class="guest-name">@{{ g.nama }}</span>
                  <span class="guest-date">{{ formatTanggal(g.tanggal) }}</span>
                </div>
                <p class="guest-msg">"{{ g.pesan }}"</p>
              </div>
              <div v-if="guests.length === 0" class="empty-msg">MENUNGGU_TRANSMISI_BARU...</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ROUTER VIEW -->
    <router-view v-else></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_URL = 'https://lemon-expo-backend.vercel.app/api/ecommerce/guest-book';
const guests = ref([]);
const loading = ref(false);
const guestData = ref({ nama: '', pesan: '', instansi: '' });

const ambilBukuTamu = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to load');
    guests.value = await response.json();
  } catch (e) { console.error(e); }
};

const kirimPesan = async () => {
  if (!guestData.value.nama || !guestData.value.pesan) return alert("DATA TIDAK BOLEH KOSONG!");
  loading.value = true;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guestData.value)
    });
    if (response.ok) {
      guestData.value = { nama: '', pesan: '', instansi: '' };
      await ambilBukuTamu();
    }
  } catch (e) { alert("GAGAL MENGIRIM"); }
  finally { loading.value = false; }
};

const formatTanggal = (t) => new Date(t).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });

onMounted(ambilBukuTamu);
</script>

<style scoped>
/* Scoped Variables */
.app-container {
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --lettuce: #00FF47;
  --soda: #0051FF;
  --border: 4px solid var(--black);
  
  min-height: 100vh;
  background: #e4e4e4;
  font-family: 'Space Grotesk', sans-serif;
  padding-bottom: 120px; /* Ditambah agar tidak tertutup nav */
}

/* Background Effects */
.bg-grid {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(var(--black) 1px, transparent 1px);
  background-size: 25px 25px; opacity: 0.15; z-index: 0;
}

.grain {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: url('https://grainy-gradients.vercel.app/noise.svg');
  opacity: 0.05; pointer-events: none; z-index: 10;
}

/* Stickers - Dihidupkan hanya di Desktop */
.sticker {
  position: absolute; padding: 5px 10px; background: var(--black); color: white;
  font-weight: 900; font-size: 0.8rem; z-index: 2; transform: rotate(-5deg);
  display: none; /* Default sembunyi di mobile */
}

/* Hero */
.landing-page { position: relative; z-index: 1; padding: 1rem; max-width: 1200px; margin: 0 auto; }
.hero-box { 
  margin: 1rem 0 3rem 0; padding: 3rem 1rem; text-align: center; 
  background: var(--mustard); position: relative;
}
.box-label {
  position: absolute; top: -12px; left: 15px; background: var(--black);
  color: white; padding: 2px 10px; font-weight: 900; font-size: 0.7rem;
}
.hero-title { font-size: clamp(2rem, 12vw, 5rem); font-weight: 1000; margin: 0; letter-spacing: -2px; line-height: 1; }
.hero-subtitle { font-weight: 800; margin-top: 15px; font-size: 0.85rem; text-decoration: underline; display: block; }

/* Portal Cards */
.portal-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 4rem; }
.portal-card { 
  padding: 2rem 1.5rem; text-decoration: none; color: inherit; position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}
.portal-card:hover { transform: translate(-4px, -4px); box-shadow: 12px 12px 0px var(--black); }
.portal-badge { 
  position: absolute; top: 12px; right: 12px; width: 35px; height: 35px; 
  border: 3px solid black; display: flex; align-items: center; justify-content: center; font-weight: 900;
}
.portal-content h2 { font-weight: 900; font-size: 1.8rem; margin-bottom: 1rem; }
.portal-btn { margin-top: 1.5rem; font-weight: 900; text-decoration: underline; font-size: 1rem; display: block; }

/* Guestbook */
.section-main-title { font-weight: 1000; font-size: 2rem; margin-bottom: 2rem; text-align: center; letter-spacing: -1px; }
.guestbook-container { display: grid; grid-template-columns: 1fr; gap: 2rem; }

.guest-form { padding: 0; overflow: hidden; }
.form-header { background: var(--black); color: white; padding: 10px 15px; font-weight: 900; font-size: 0.9rem; }
.form-body { padding: 1.5rem; }
.input-group { margin-bottom: 1rem; }
.input-group label { display: block; font-weight: 900; font-size: 0.75rem; margin-bottom: 5px; }
.brutal-input { 
  width: 100%; border: var(--border); padding: 0.8rem; font-family: inherit;
  font-weight: 700; box-sizing: border-box; background: #fff; font-size: 1rem;
}
.brutal-input:focus { background: var(--mustard); outline: none; }
textarea { min-height: 120px; resize: none; }

.send-btn { 
  width: 100%; padding: 1rem; font-weight: 900; border: var(--border); 
  cursor: pointer; box-shadow: 6px 6px 0px var(--black); font-size: 1.1rem;
}
.send-btn:active { transform: translate(3px, 3px); box-shadow: none; }

.guest-list { height: 450px; padding: 0; display: flex; flex-direction: column; overflow: hidden; }
.list-header { padding: 10px 15px; font-weight: 900; border-bottom: var(--border); font-size: 0.9rem; }
.scroll-area { flex-grow: 1; overflow-y: auto; padding: 1rem; }
.guest-item { background: #1a1a1a; margin-bottom: 1rem; padding: 1rem; border: 2px solid #333; }
.guest-meta { display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 5px; }
.guest-name { color: var(--lettuce); font-weight: 900; font-size: 0.85rem; }
.guest-date { font-size: 0.65rem; color: #888; }
.guest-msg { margin: 0; line-height: 1.4; color: #eee; font-size: 0.85rem; }

/* Navigation */
.bottom-nav {
  position: fixed; bottom: 15px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 0.5rem; padding: 8px; z-index: 1000;
  width: 90%; max-width: 400px; justify-content: center;
  background: white; border: 3px solid black; box-shadow: 6px 6px 0px black;
}
.nav-item {
  padding: 8px 12px; text-decoration: none; color: black; font-weight: 900;
  font-size: 0.75rem; border: 2px solid transparent; text-align: center; flex: 1;
}
.nav-active { background: var(--mustard); border: 2px solid black; }

/* Tablet & Desktop Adjustments */
@media (min-width: 768px) {
  .landing-page { padding: 2rem; }
  .sticker { display: block; }
  .s1 { top: 20px; right: 5%; background: var(--ketchup); }
  .s2 { top: 120px; left: 2%; background: var(--soda); transform: rotate(10deg); }
  
  .portal-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .guestbook-container { grid-template-columns: 1.2fr 0.8fr; }
  
  .section-main-title { font-size: 2.8rem; }
  .bottom-nav { width: auto; max-width: none; border: none; box-shadow: none; background: transparent; bottom: 25px; gap: 1rem; }
  .nav-item { font-size: 0.9rem; padding: 8px 20px; flex: none; }
}

/* Helpers */
.border-brutal { border: var(--border); box-shadow: 8px 8px 0px var(--black); }
</style>
