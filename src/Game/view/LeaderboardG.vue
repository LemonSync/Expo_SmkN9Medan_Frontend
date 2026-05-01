<template>
  <div class="leaderboard-container">
    <div class="centered-container">
      <section class="card">
        <div class="trophy-container">
          <div class="trophy">🏆</div>
        </div>
        
        <h2 class="title">Hall of Fame</h2>
        
        <div class="table-container">
          <table id="ranking-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rank, index) in leaderboard" :key="index" :class="{ 'is-top': index === 0 }">
                <td class="player-name">
                  <span v-if="index === 0">🥇 </span>
                  <span v-else-if="index === 1">🥈 </span>
                  <span v-else-if="index === 2">🥉 </span>
                  {{ rank.username }}
                </td>
                <td class="final-score">{{ rank.final_score }}</td>
                <td>
                  <span class="lvl-tag">{{ rank.max_difficulty_reached }}</span>
                </td>
              </tr>
              <tr v-if="leaderboard.length === 0">
                <td colspan="3" style="text-align: center; padding: 40px;">
                  <div class="loading-text">MENCARI JAGOAN...</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="btn-group-leaderboard">
          <button @click="playAgain" class="btn-main">MAIN LAGI!</button>
          <button @click="showLogoutModal" class="btn-danger-outline">SIGN OUT</button>
        </div>
      </section>
    </div>

    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="logoutModal" class="modal-overlay">
          <div class="modal-card">
            <div class="modal-header error">KELUAR SESI</div>
            <div class="modal-body">
              <p>Yakin ingin mengakhiri sesi bermainmu?</p>
              <div class="btn-group-row">
                <button @click="confirmLogout" class="btn-danger">YA, KELUAR</button>
                <button @click="logoutModal = false" class="btn-secondary">BATAL</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const leaderboard = ref([])
const logoutModal = ref(false)

/**
 * Mengambil data ranking dari API Express
 */
const fetchDashboard = async () => {
  try {
    // 1. Ganti endpoint ke route Express (tanpa .php)
    // Kita bisa tambahkan query params jika ingin filter per difficulty, misal: ?difficulty=all
    const res = await fetch('https://lemon-expo-backend.vercel.app/api/game/rankings', { 
      credentials: 'include' 
    })
    
    const resData = await res.json()
    
    if (resData.status === 'success') {
      leaderboard.value = resData.data || []
    }
  } catch (err) {
    console.error("Gagal memuat leaderboard dari Express:", err)
  }
}

const playAgain = () => {
  router.push('/game/play')
}

const showLogoutModal = () => {
  logoutModal.value = true
}

/**
 * Logout resmi via API Express
 */
const confirmLogout = async () => {
  try {
    // 2. Tembak API logout agar session di server hancur
    const res = await fetch('https://lemon-expo-backend.vercel.app/api/game/logout', {
      method: 'GET',
      credentials: 'include'
    })
    
    const data = await res.json()
    
    if (data.status === 'success') {
      logoutModal.value = false
      // Balik ke Landing Page atau Auth
      router.push('/game')
    }
  } catch (err) {
    console.error("Gagal logout:", err)
    // Fallback: paksa balik ke home jika server tidak merespon
    router.push('/game')
  }
}

onMounted(() => {
  fetchDashboard()
})
</script>

<style scoped>
@import url('../assets/style.css');

/* Container kartu utama agar tetap proporsional */
.card {
  max-width: 480px;
  width: 100%;
  margin: 20px auto;
  text-align: center;
  background: var(--white);
  border: 5px solid var(--main);
  box-shadow: 12px 12px 0px var(--main);
  padding: 30px;
}

.trophy-container {
  margin-top: -60px; /* Membuat trofi seolah-olah mengapung di atas kartu */
  background: var(--accent);
  width: 80px;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  border: 4px solid var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  box-shadow: 4px 4px 0px var(--main);
}

.title {
  font-size: 2.2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 20px 0;
  letter-spacing: -1px;
}

/* --- TABEL RANKING --- */
.table-container {
  width: 100%;
  border: 4px solid var(--main);
  max-height: 350px;
  overflow-y: auto;
  background: var(--white);
  box-shadow: 6px 6px 0px var(--main);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: var(--secondary);
  color: var(--main);
  padding: 12px;
  text-transform: uppercase;
  font-weight: 900;
  border-bottom: 4px solid var(--main);
  position: sticky;
  top: 0;
  z-index: 10;
}

td {
  padding: 15px 10px;
  border-bottom: 2px solid var(--main);
  font-weight: 700;
  font-family: 'Space Mono', monospace;
}

/* Efek Highlighting untuk Peringkat 1 */
tr.is-top {
  background: #fff9eb;
}

tr.is-top td {
  color: #d35400;
  font-size: 1.1rem;
}

.player-name {
  text-align: left;
  padding-left: 20px;
}

.final-score {
  font-weight: 900;
  color: var(--danger);
}

.lvl-tag {
  background: var(--main);
  color: var(--white);
  padding: 3px 8px;
  font-size: 0.7rem;
  text-transform: uppercase;
  border-radius: 4px;
}

/* --- TOMBOL --- */
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-main {
  background: var(--success);
  color: var(--main);
  box-shadow: 6px 6px 0px var(--main);
}

.btn-danger {
  background: var(--danger);
  color: var(--main);
  box-shadow: 6px 6px 0px var(--main);
}

/* Custom Scrollbar Neobrutalism */
.table-container::-webkit-scrollbar {
  width: 12px;
}

.table-container::-webkit-scrollbar-track {
  background: var(--white);
}

.table-container::-webkit-scrollbar-thumb {
  background: var(--main);
  border: 3px solid var(--white);
}

/* Responsive */
@media (max-width: 480px) {
  .card {
    padding: 20px 15px;
  }
  
  .title {
    font-size: 1.8rem;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Overlay gelap */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.modal-card {
  background: var(--white);
  border: 5px solid var(--main);
  box-shadow: 15px 15px 0px var(--main);
  width: 100%;
  max-width: 350px;
  animation: modal-pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modal-pop {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-header {
  padding: 10px;
  font-weight: 900;
  text-transform: uppercase;
  border-bottom: 5px solid var(--main);
  color: var(--main);
}

.modal-header.error { background: var(--danger); }
.modal-header.success { background: var(--success); }

.modal-body {
  padding: 25px;
  font-weight: 800;
}

.modal-body p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.3;
}

/* Tombol OK di modal */
.modal-body button {
  margin-bottom: 0;
  background: var(--accent);
}
</style>