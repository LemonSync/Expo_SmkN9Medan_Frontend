<template>
  <!-- MODAL PASSWORD (Neo-Brutalism Style) -->
  <div v-if="!savedPassword" class="auth-overlay">
    <div class="auth-card border-brutal bg-mustard">
      <h2 class="section-label">ADMIN_ACCESS_REQUIRED</h2>
      <p class="auth-desc">Masukkan password untuk melihat data transaksi.</p>
      <input 
        v-model="passwordInput" 
        type="password" 
        placeholder="PASSWORD..." 
        class="auth-input border-brutal"
        @keyup.enter="savePassword"
      >
      <button @click="savePassword" class="btn-action bg-white" style="width: 100%; margin-top: 1rem;">LOGIN</button>
    </div>
  </div>

  <!-- DASHBOARD CONTENT (Hanya muncul jika password ada) -->
  <div v-else class="dash-page">
    <header class="dash-header">
      <div>
        <h1 class="page-title">DASHBOARD_PESANAN</h1>
        <!-- Tombol Reset Password -->
        <button @click="resetPassword" class="btn-reset">RESET_PASSWORD</button>
      </div>
      
      <div class="stats-container">
        <div class="stat-box bg-mustard">TOTAL: {{ transactions.length }}</div>
        <div class="stat-box bg-ketchup text-white">ANTRIAN: {{ pendingOrders.length }}</div>
        <div class="stat-box bg-lettuce">SELESAI: {{ completedOrders.length }}</div>
      </div>
    </header>

    <main class="dash-content">
      <!-- Grid Untouched (Sama seperti kodemu) -->
      <section class="order-section">
        <h2 class="section-label">TRANSAKSI_BELUM_SELESAI_[-]</h2>
        <div class="order-grid">
          <div v-for="order in pendingOrders" :key="order.id" class="order-card border-brutal">
            <div class="order-header">
              <span class="order-id">#ORD-{{ order.id }}</span>
              <span class="order-date">{{ formatDate(order.tanggal) }}</span>
            </div>
            <div class="customer-info">
              <h3>{{ order.nama }}</h3>
              <p>{{ order.nohp }}</p>
            </div>
            <div class="order-items">
              <div v-for="(item, i) in parseItems(order.items_json)" :key="i" class="item-row">
                {{ item.qty }}x {{ item.name }}
              </div>
            </div>
            <div class="order-footer">
              <div class="total">RP {{ order.total_harga }}</div>
              <button @click="toggleStatus(order)" class="btn-action bg-lettuce">SELESAIKAN</button>
            </div>
          </div>
        </div>
      </section>

      <hr class="brutal-hr">

      <section class="order-section">
        <h2 class="section-label">RIWAYAT_SELESAI_[✔]</h2>
        <div class="order-grid">
          <div v-for="order in completedOrders" :key="order.id" class="order-card border-brutal done">
            <div class="customer-info">
              <h3>{{ order.nama }}</h3>
              <p>TOTAL: RP {{ order.total_harga }}</p>
            </div>
            <button @click="toggleStatus(order)" class="btn-action bg-white">BATALKAN</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const transactions = ref([]);
const passwordInput = ref('');
const savedPassword = ref(localStorage.getItem('admin_pass') || null);

// LOGIN LOGIC
const savePassword = () => {
  if (passwordInput.value.trim()) {
    localStorage.setItem('admin_pass', passwordInput.value);
    savedPassword.ref = passwordInput.value; // Update UI secara reaktif
    window.location.reload(); // Reload untuk memicu fetch pertama kali
  }
};

const resetPassword = () => {
  if (confirm("Logout dan hapus password?")) {
    localStorage.removeItem('admin_pass');
    savedPassword.value = null;
    transactions.value = [];
  }
};

// FETCH DATA (Gunakan password dari localStorage)
const fetchTransactions = async () => {
  if (!savedPassword.value) return;

  try {
    // Kita kirim password lewat Query String (?pass=...)
    const res = await fetch(`https://lemon-expo-backend.vercel.app/api/ecommerce/get-transaksi?pass=${savedPassword.value}`);
    if (!res.ok) throw new Error("Akses ditolak (Password salah)");
    
    transactions.value = await res.json();
  } catch (err) {
    console.error(err);
    alert("Gagal ambil data. Password mungkin salah.");
    localStorage.removeItem('admin_pass'); // Hapus jika ternyata salah
    window.location.reload();
  }
};

// UPDATE STATUS (Kirim password lewat Body)
const toggleStatus = async (order) => {
  const newStatus = order.selesai === 0 ? 1 : 0;
  try {
    const res = await fetch(`https://lemon-expo-backend.vercel.app/api/ecommerce/get-transaksi/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        selesai: newStatus,
        pass: savedPassword.value // Ambil dari localStorage
      })
    });
    
    if (res.ok) {
      order.selesai = newStatus;
    } else {
      alert("Gagal update: Password salah atau sesi berakhir");
    }
  } catch (err) {
    alert("Gagal update status");
  }
};

// FILTER & HELPER (Sama seperti sebelumnya)
const pendingOrders = computed(() => transactions.value.filter(t => t.selesai === 0));
const completedOrders = computed(() => transactions.value.filter(t => t.selesai === 1));
const parseItems = (json) => { try { return JSON.parse(json); } catch { return []; } };
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

onMounted(fetchTransactions);
</script>

<style scoped>
.dash-page {
  padding: 2rem;
  background: #f0f0f0;
  min-height: 100vh;
  font-family: 'Space Grotesk', sans-serif;
  /* Mencegah horizontal scroll pada mobile */
  overflow-x: hidden; 
}

/* --- HEADER & STATS --- */
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  line-height: 1;
}

.stats-container { 
  display: flex; 
  gap: 1rem; 
  flex-wrap: wrap; /* Agar statistik turun ke bawah jika layar sempit */
  width: 100%;
}

.stat-box {
  flex: 1; /* Membuat kotak statistik sama lebar */
  min-width: 120px;
  padding: 1rem;
  border: 4px solid #000;
  font-weight: 900;
  box-shadow: 4px 4px 0px #000;
  text-align: center;
  font-size: 0.9rem;
}

/* --- SECTIONS --- */
.section-label {
  background: #000;
  color: #fff;
  display: inline-block;
  padding: 0.5rem 1rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.order-grid {
  display: grid;
  /* Menggunakan auto-fill agar fleksibel */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

/* --- CARDS --- */
.order-card {
  background: white;
  padding: 1.5rem;
  position: relative;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
}

.order-card.done { 
  opacity: 0.7; 
  filter: grayscale(1); 
}

.order-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 900;
  margin-bottom: 1rem;
  border-bottom: 2px solid #000;
  padding-bottom: 0.5rem;
}

.customer-info h3 { 
  font-weight: 900; 
  margin: 0; 
  text-transform: uppercase; 
  font-size: 1.3rem;
}

.order-items {
  margin: 1rem 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  flex-grow: 1; /* Memastikan tombol aksi selalu di bawah */
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 10px;
}

.total { font-weight: 900; font-size: 1.2rem; white-space: nowrap; }

/* --- BUTTONS --- */
.btn-action {
  border: 3px solid #000;
  padding: 0.6rem 1.2rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 4px 4px 0px #000;
  transition: 0.1s;
  text-transform: uppercase;
}

.btn-action:active { 
  transform: translate(3px, 3px); 
  box-shadow: none; 
}

/* --- DECORATION --- */
.brutal-hr { border: 4px solid #000; margin: 3rem 0; opacity: 1; }
.border-brutal { border: 5px solid #000; box-shadow: 8px 8px 0px #000; }

.bg-mustard { background: #FFDB00; }
.bg-ketchup { background: #FF0000; }
.bg-lettuce { background: #00FF47; }
.text-white { color: white; }

/* --- AUTH STYLES --- */
.auth-overlay {
  font-family: 'Space Mono', monospace;
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
}

.auth-card {
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.auth-desc {
  font-weight: 900;
  margin: 1rem 0;
  text-transform: uppercase;
}

.auth-input {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 900;
  outline: none;
  text-align: center;
}

.btn-reset {
  background: #ff0000;
  color: white;
  border: 2px solid #000;
  padding: 4px 8px;
  font-weight: 900;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.7rem;
}

.btn-reset:hover {
  background: black;
}

/* --- RESPONSIVE BREAKPOINTS --- */

/* Tablet & Mobile */
@media (max-width: 768px) {
  .dash-page { padding: 1rem; }
  
  .page-title { font-size: 1.8rem; }
  
  .order-grid {
    grid-template-columns: 1fr; /* Paksa 1 kolom di HP */
  }

  .stat-box {
    padding: 0.8rem;
    font-size: 0.8rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .dash-header {
    margin-bottom: 2rem;
  }
  
  .stats-container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 2 kolom untuk statistik di layar sangat kecil */
  }
  
  .stat-box:first-child {
    grid-column: span 2; /* Total pesanan lebar penuh */
  }

  .order-footer {
    flex-direction: column; /* Tombol jadi lebar penuh di bawah total */
    align-items: flex-start;
  }

  .btn-action {
    width: 100%;
    text-align: center;
  }
}
</style>