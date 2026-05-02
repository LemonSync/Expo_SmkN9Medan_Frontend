<template>
  <div class="cart-page">
    <div class="bg-grid"></div>

    <!-- HEADER SECTION -->
    <header class="cart-header">
      <div class="header-box bg-mustard">
        <h1 class="title">UNIT_PESANAN_S01</h1>
      </div>
      <router-link to="/ecommerce" class="back-link bg-white">
        [←] KEMBALI
      </router-link>
    </header>

    <div class="main-layout">
      <!-- RINGKASAN (Sidebar) -->
      <aside class="summary-section">
        <div class="summary-card border-brutal bg-white">
          <h2 class="summary-title">TOTAL_RINGKASAN</h2>

          <div class="summary-details">
            <div class="detail-row">
              <span>JUMLAH_UNIT</span>
              <span>{{ totalUnits }}</span>
            </div>
            <div class="detail-row">
              <span>PAJAK</span>
              <span class="text-lettuce">FREE</span>
            </div>
            <hr class="brutal-hr">
            <div class="detail-row total">
              <span>TOTAL_AKHIR</span>
              <span class="total-amount">IDR_{{ totalPrice }}K</span>
            </div>
          </div>

          <button @click="openCheckoutModal" class="checkout-btn bg-soda text-white">
            KONFIRMASI_PESANAN [→]
          </button>
        </div>

        <div class="industrial-note bg-black text-white">
          <p>NOTE: PESANAN AKAN DIPROSES SECARA INSTAN OLEH SISTEM SMKN9.</p>
        </div>
      </aside>

      <!-- DAFTAR ITEM -->
      <section class="items-section">
        <div v-if="cart.length === 0" class="empty-card border-brutal bg-white">
          <h2>BELUM_ADA_UNIT_[-]</h2>
          <p>SILAHKAN KE KATALOG UNTUK MENGISI PESANAN ANDA.</p><br>
          <router-link to="/menu" class="buy-link">
            [←] BELI_SESUATU
          </router-link>
        </div>

        <div v-else class="item-list">
          <div v-for="item in cart" :key="item.id" class="item-card border-brutal">
            <div class="item-main-info">
              <div class="item-img bg-black text-white">
                {{ item.name.substring(0, 1).toUpperCase() }}
              </div>

              <div class="item-info">
                <span class="item-id">ID: #{{ item.id }}</span>
                <h3 class="item-name">{{ item.name }}</h3>
                <span class="item-price">IDR_{{ item.price }}K</span>
              </div>
            </div>

            <div class="item-actions">
              <div class="qty-control border-brutal">
                <button @click="updateQty(item.id, -1)" class="qty-btn">-</button>
                <span class="qty-num">{{ item.qty }}</span>
                <button @click="updateQty(item.id, 1)" class="qty-btn">+</button>
              </div>
              <button @click="removeItem(item.id)" class="remove-btn bg-ketchup">
                HAPUS_UNIT
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="isCheckingOut" class="modal-overlay">
      <div class="modal-content border-brutal">
        <div class="modal-header bg-black text-white">
          <span>IDENTITAS_PESANAN_V.01</span>
          <button @click="isCheckingOut = false" class="close-x">X</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>NAMA_LENGKAP</label>
            <input v-model="customerData.name" type="text" placeholder="MASUKKAN NAMA..." class="brutal-input">
          </div>
          <div class="input-group">
            <label>NOMOR_WHATSAPP</label>
            <input v-model="customerData.phone" type="text" placeholder="0812..." class="brutal-input">
          </div>
          <button @click="processToBackend" class="process-btn bg-lettuce">PROSES_KE_DATABASE_[→]</button>
        </div>
      </div>
    </div>

    <div v-if="notif.show" class="modal-overlay">
      <div class="modal-content border-brutal"
        :style="{ boxShadow: '20px 20px 0px ' + (notif.type === 'success' ? 'var(--lettuce)' : 'var(--ketchup)') }">
        <div class="modal-body notification-body">
          <div class="status-icon">{{ notif.type === 'success' ? '✔' : '✘' }}</div>
          <p class="modal-text">{{ notif.message }}</p>
          <button @click="notif.show = false" class="close-notif-btn">OKE_[✔]</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { cart } from '../store/cart.js';

// --- STATES ---
const isCheckingOut = ref(false);
const customerData = ref({ name: '', phone: '' });
const notif = ref({ show: false, message: '', type: 'success' });

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + (item.price * item.qty), 0));
const totalUnits = computed(() => cart.value.reduce((acc, item) => acc + item.qty, 0));

const showNotif = (msg, type = 'success') => {
  notif.value = { show: true, message: msg, type: type };
};

const updateQty = (id, change) => {
  const item = cart.value.find(p => p.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) removeItem(id);
  }
};

const removeItem = (id) => {
  const index = cart.value.findIndex(item => item.id === id);
  if (index !== -1) cart.value.splice(index, 1);
};

const openCheckoutModal = () => {
  if (cart.value.length === 0) {
    showNotif("KERANJANG MASIH KOSONG!", "error");
    return;
  }
  isCheckingOut.value = true;
};

const processToBackend = async () => {
  if (!customerData.value.name || !customerData.value.phone) {
    showNotif("DATA TIDAK LENGKAP!", "error");
    return;
  }

  const cartSummary = cart.value.map(item => ({
    id: item.id,
    name: item.name,
    qty: item.qty,
    subtotal: item.price * item.qty
  }));

  const payload = {
    customer_name: customerData.value.name,
    customer_phone: customerData.value.phone,
    total_price: totalPrice.value,
    order_items: JSON.stringify(cartSummary) 
  };

  try {
    const response = await fetch('https://lemon-expo-backend.vercel.app/api/ecommerce/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showNotif("PESANAN BERHASIL DISIMPAN KE DATABASE!", "success");
      
      cart.value = [];
      isCheckingOut.value = false;
      customerData.value = { name: '', phone: '' };
      
      localStorage.removeItem('cart_data');
      
    } else {
      showNotif("GAGAL MENGIRIM DATA KE BACKEND.", "error");
    }
  } catch (err) {
    console.error("Fetch Error:", err);
    showNotif("KONEKSI SERVER GAGAL!", "error");
  }
};
</script>

<style scoped>


.cart-page {
  /* CSS Variables */
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --lettuce: #00FF47;
  --soda: #0051FF;
  --border: 5px solid var(--black);
  --shadow: 8px 8px 0px var(--black);
  --shadow-sm: 4px 4px 0px var(--black);
  --shadow-lg: 15px 15px 0px var(--black);

  min-height: 100vh;
  padding: 2rem;
  background-color: #f0f0f0;
  font-family: 'Space Grotesk', sans-serif;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
}

.bg-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(var(--black) 1px, transparent 1px);
  background-size: 25px 25px;
  opacity: 0.1;
  z-index: 0;
}

/* --- HEADER --- */
.cart-header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1.5rem;
}

.header-box {
  background: var(--mustard);
  border: var(--border);
  padding: 1rem 2rem;
  box-shadow: var(--shadow);
  transform: rotate(-1deg);
}

.title {
  font-weight: 950;
  font-size: clamp(1.2rem, 5vw, 2.5rem);
  margin: 0;
  letter-spacing: -2px;
  text-transform: uppercase;
}

.back-link {
  background: var(--white);
  border: var(--border);
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: var(--black);
  font-weight: 900;
  box-shadow: var(--shadow-sm);
  transition: 0.2s;
  white-space: nowrap;
}

.back-link:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0px var(--black);
  background: var(--lettuce);
}

/* --- LAYOUT --- */
.main-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;
}

/* --- ITEM CARD --- */
.item-card {
  background: var(--white);
  border: var(--border);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.item-main-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.item-img {
  width: 80px;
  height: 80px;
  background: var(--black);
  color: var(--white);
  border: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 900;
  flex-shrink: 0;
}

.item-id {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  background: var(--mustard);
  padding: 2px 6px;
  border: 2px solid var(--black);
  font-weight: 700;
}

.item-name {
  font-size: 1.6rem;
  font-weight: 900;
  margin: 8px 0;
  letter-spacing: -1px;
}

.item-price {
  font-weight: 900;
  color: var(--soda);
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
}

.qty-control {
  display: flex;
  background: var(--white);
  border: var(--border);
  height: 45px;
}

.qty-btn {
  width: 45px;
  border: none;
  background: none;
  font-size: 1.2rem;
  font-weight: 900;
  cursor: pointer;
}

.qty-btn:hover {
  background: var(--mustard);
}

.qty-num {
  padding: 0 15px;
  font-weight: 900;
  display: flex;
  align-items: center;
  border-left: var(--border);
  border-right: var(--border);
}

.remove-btn {
  background: var(--ketchup);
  border: var(--border);
  padding: 8px 12px;
  font-weight: 900;
  font-size: 0.8rem;
  cursor: pointer;
  color: white;
}

/* --- SUMMARY SIDEBAR --- */
.summary-card {
  background: var(--white);
  border: var(--border);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 40px;
}

.summary-title {
  font-weight: 950;
  font-size: 1.6rem;
  border-bottom: var(--border);
  padding-bottom: 1rem;
  margin: 0 0 2rem 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin: 1.2rem 0;
  font-weight: 800;
}

.total {
  font-size: 1.5rem;
  margin-top: 1.5rem;
}

.total-amount {
  color: var(--ketchup);
  text-decoration: underline;
}

.checkout-btn {
  width: 100%;
  padding: 1.5rem;
  background: var(--soda);
  color: var(--white);
  border: var(--border);
  font-weight: 900;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 6px 6px 0px var(--black);
}

.industrial-note {
  margin-top: 1.5rem;
  padding: 1rem;
  font-size: 0.7rem;
  border: var(--border);
}

/* --- MODAL SYSTEM --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  width: 100%;
  max-width: 500px;
  background: var(--white);
  box-shadow: 20px 20px 0px var(--soda);
  border: var(--border);
}

.modal-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--black);
  color: white;
  border-bottom: var(--border);
}

.close-x {
  background: white;
  border: 3px solid black;
  color: black;
  font-weight: 900;
  font-size: 16px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.modal-body {
  padding: 2rem;
}

.input-group label {
  display: block;
  font-weight: 900;
  margin-bottom: 5px;
  font-size: 0.8rem;
}

.brutal-input {
  width: 100%;
  padding: 1rem;
  border: var(--border);
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

.brutal-input:focus {
  background: var(--mustard);
  outline: none;
}

.process-btn,
.close-notif-btn {
  width: 100%;
  padding: 1.2rem;
  border: var(--border);
  font-weight: 950;
  box-shadow: var(--shadow);
  cursor: pointer;
}

.process-btn {
  background: var(--lettuce);
}

.close-notif-btn {
  background: var(--mustard);
}

.status-icon {
  text-align: center;
  font-size: 4rem;
  margin-bottom: 1rem;
  color: black;
}

.modal-text {
  font-weight: 900;
  margin-bottom: 2rem;
  text-transform: uppercase;
  text-align: center;
}

.empty-card {
  padding: 10px;
}

/* --- RESPONSIVE OPTIMIZATION --- */
@media (max-width: 1100px) {
  .main-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .summary-section {
    order: -1;
    margin-bottom: 2rem;
  }

  .summary-card {
    position: static;
    transform: none;
  }
}

@media (max-width: 600px) {
  .cart-page {
    padding: 1rem;
    --shadow: 5px 5px 0px var(--black);
    --shadow-lg: 8px 8px 0px var(--black);
  }

  .cart-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .header-box {
    transform: none;
    padding: 0.8rem;
    text-align: center;
  }

  .back-link {
    text-align: center;
    padding: 0.8rem;
  }

  .item-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem;
  }

  .item-main-info {
    gap: 1rem;
    width: 100%;
  }

  .item-img {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .item-name {
    font-size: 1.3rem;
  }

  .item-actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.2rem;
    padding-top: 1rem;
    border-top: 3px dashed var(--black);
  }

  .qty-control {
    height: 40px;
  }

  .qty-btn {
    width: 35px;
  }

  .qty-num {
    padding: 0 10px;
  }

  .summary-card {
    padding: 1.5rem;
  }

  .modal-content {
    box-shadow: 10px 10px 0px var(--soda);
  }

  .modal-body {
    padding: 1.5rem 1rem;
  }
}

/* Utils */
.border-brutal { border: var(--border); }
.text-lettuce { color: var(--lettuce); font-weight: 900; }
</style>
