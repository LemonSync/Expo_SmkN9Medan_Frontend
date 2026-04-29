<template>
  <div class="cart-page">
    <div class="bg-grid"></div>

    <header class="cart-header">
      <div class="header-box bg-mustard">
        <h1 class="title">UNIT_PESANAN_S01</h1>
      </div>
      <router-link to="/menu" class="back-link bg-white">
        [<-] KEMBALI_BELANJA </router-link>
    </header>

    <div class="main-layout">
      <section class="items-section">
        <div v-if="cart.length === 0" class="empty-card border-brutal">
          <h2>BELUM_ADA_BARANG_YANG_DIPILIH_[-]</h2>
          <p>SILAHKAN KE KATALOG UNTUK MENGISI UNIT.</p>
        </div>

        <div v-else class="item-list">
          <div v-for="item in cart" :key="item.id" class="item-card border-brutal">
            <div class="item-img bg-black text-white">
              {{ item.name.substring(0, 1) }}
            </div>

            <div class="item-info">
              <span class="item-id">ID: #{{ item.id }}</span>
              <h3 class="item-name">{{ item.name }}</h3>
              <span class="item-price">IDR_{{ item.price }}K</span>
            </div>

            <div class="item-actions">
              <div class="qty-control border-brutal">
                <button @click="updateQty(item.id, -1)" class="qty-btn">-</button>
                <span class="qty-num">{{ item.qty }}</span>
                <button @click="updateQty(item.id, 1)" class="qty-btn">+</button>
              </div>
              <button @click="removeItem(item.id)" class="remove-btn bg-ketchup">
                HAPUS
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside class="summary-section">
        <div class="summary-card border-brutal bg-white">
          <h2 class="summary-title">TOTAL_RINGKASAN</h2>

          <div class="summary-details">
            <div class="detail-row">
              <span>JUMLAH_UNIT</span>
              <span>{{ totalUnits }}</span>
            </div>
            <div class="detail-row">
              <span>PAJAK_PENGEMBANGAN</span>
              <span>FREE</span>
            </div>
            <hr class="brutal-hr">
            <div class="detail-row total">
              <span>TOTAL_AKHIR</span>
              <span class="total-amount">IDR_{{ totalPrice }}K</span>
            </div>
          </div>

          <button @click="checkout" class="checkout-btn bg-soda text-white">
            KONFIRMASI_PESANAN [->]
          </button>
        </div>

        <div class="industrial-note bg-black text-white">
          <p>NOTE: PESANAN AKAN DIPROSES SECARA INSTAN OLEH SISTEM SMKN9.</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { cart } from '../store/cart.js';

const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + (item.price * item.qty), 0);
});

const totalUnits = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.qty, 0);
});

const updateQty = (id, change) => {
  const item = cart.value.find(p => p.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) removeItem(id);
  }
};

const removeItem = (id) => {
  cart.value = cart.value.filter(item => item.id !== id);
};

const checkout = () => {
  alert(`PESANAN SEBESAR IDR_${totalPrice.value}K TELAH DITERIMA!`);
};
</script>

<style scoped>
.cart-page {
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --soda: #0051FF;
  --border: 5px solid var(--black);

  min-height: 100vh;
  padding: 2rem;
  background-color: #f0f0f0;
  font-family: 'Space Grotesk', sans-serif;
  position: relative;
}

.empty-card {
  padding: 10px;
}

.bg-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(var(--black) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.1;
  z-index: 0;
}

/* HEADER */
.cart-header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-box {
  border: var(--border);
  padding: 1rem 2rem;
  box-shadow: 8px 8px 0px var(--black);
}

.title {
  font-weight: 900;
  font-size: 2.5rem;
  margin: 0;
}

.back-link {
  border: var(--border);
  padding: 1rem;
  text-decoration: none;
  color: var(--black);
  font-weight: 800;
  box-shadow: 4px 4px 0px var(--black);
}

/* LAYOUT */
.main-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

/* ITEMS */
.item-card {
  background: white;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  gap: 1.5rem;
  box-shadow: 8px 8px 0px var(--black);
}

.item-img {
  width: 80px;
  height: 80px;
  border: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 900;
}

.item-info {
  flex-grow: 1;
}

.item-id {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  opacity: 0.6;
}

.item-name {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0;
}

.item-price {
  font-weight: 800;
  color: var(--soda);
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.qty-control {
  display: flex;
  align-items: center;
  background: white;
}

.qty-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  font-size: 1.5rem;
  font-weight: 900;
  cursor: pointer;
}

.qty-btn:hover {
  background: var(--mustard);
}

.qty-num {
  padding: 0 15px;
  font-weight: 900;
  border-left: var(--border);
  border-right: var(--border);
}

.remove-btn {
  border: 3px solid var(--black);
  padding: 5px 15px;
  color: black;
  font-weight: 900;
  cursor: pointer;
}

/* SUMMARY */
.summary-card {
  padding: 2rem;
  box-shadow: 12px 12px 0px var(--black);
  position: sticky;
  top: 100px;
}

.summary-title {
  font-weight: 900;
  border-bottom: var(--border);
  padding-bottom: 1rem;
  margin-top: 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  font-weight: 700;
}

.total {
  font-size: 1.5rem;
  font-weight: 900;
}

.total-amount {
  color: var(--ketchup);
}

.brutal-hr {
  border: none;
  border-top: var(--border);
  margin: 1.5rem 0;
}

.checkout-btn {
  width: 100%;
  padding: 1.5rem;
  border: var(--border);
  font-weight: 900;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 6px 6px 0px var(--black);
  transition: 0.1s;
}

.checkout-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px var(--black);
}

.industrial-note {
  margin-top: 2rem;
  padding: 1rem;
  border: var(--border);
  font-size: 0.7rem;
  font-family: 'Space Mono', monospace;
}

.border-brutal {
  border: var(--border);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
  }

  .summary-section {
    order: -1;
  }

  /* Summary muncul di atas pada mobile */
  .item-card {
    flex-direction: column;
    text-align: center;
  }

  .item-actions {
    align-items: center;
    width: 100%;
  }

  .qty-control {
    width: 100%;
    justify-content: space-between;
  }
}
</style>