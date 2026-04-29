<template>
  <div class="cart-page">
    <div class="bg-grid"></div>

    <header class="cart-header">
      <div class="header-box bg-mustard">
        <h1 class="title">UNIT_PESANAN_S01</h1>
      </div>
      <router-link to="/menu" class="back-link bg-white">
        [←] KEMBALI
      </router-link>
    </header>

    <div class="main-layout">
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

          <button @click="checkout" class="checkout-btn bg-soda text-white">
            KONFIRMASI_PESANAN [→]
          </button>
        </div>

        <div class="industrial-note bg-black text-white">
          <p>NOTE: PESANAN AKAN DIPROSES SECARA INSTAN OLEH SISTEM SMKN9.</p>
        </div>
      </aside>

      <section class="items-section">
        <div v-if="cart.length === 0" class="empty-card border-brutal bg-white">
          <h2>BELUM_ADA_UNIT_[-]</h2>
          <p>SILAHKAN KE KATALOG UNTUK MENGISI PESANAN ANDA.</p>
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
  const index = cart.value.findIndex(item => item.id === id);
  if (index !== -1) {
    cart.value.splice(index, 1);
  }
};

const checkout = () => {
  if (cart.value.length === 0) return alert('KERANJANG MASIH KOSONG!');
  alert(`PESANAN SEBESAR IDR_${totalPrice.value}K TELAH DITERIMA!`);
};
</script>

<style scoped>
.cart-page {
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --lettuce: #00FF47;
  --soda: #0051FF;
  --border: 5px solid var(--black);

  min-height: 100vh;
  padding: 1.5rem;
  background-color: #f0f0f0;
  font-family: 'Space Grotesk', sans-serif;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden; /* Mencegah scroll horizontal */
}

.bg-grid {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(var(--black) 1px, transparent 1px);
  background-size: 25px 25px;
  opacity: 0.1;
  z-index: 0;
}

/* HEADER */
.cart-header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.header-box {
  border: var(--border);
  padding: 0.8rem 1.5rem;
  box-shadow: 6px 6px 0px var(--black);
}

.title {
  font-weight: 900;
  font-size: clamp(1.2rem, 4vw, 2.2rem);
  margin: 0;
  letter-spacing: -1px;
}

.back-link {
  border: var(--border);
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  color: var(--black);
  font-weight: 800;
  font-size: 0.9rem;
  box-shadow: 4px 4px 0px var(--black);
  white-space: nowrap;
}

/* LAYOUT */
.main-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
  align-items: start;
}

/* ITEMS SECTION */
.item-card {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  gap: 1rem;
  box-shadow: 8px 8px 0px var(--black);
}

.item-main-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.item-img {
  width: 70px;
  height: 70px;
  border: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 900;
  flex-shrink: 0;
}

.item-name {
  font-size: 1.3rem;
  font-weight: 900;
  margin: 0 0 5px 0;
  text-transform: uppercase;
}

.item-price {
  font-weight: 800;
  color: var(--soda);
  font-family: 'Space Mono', monospace;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}

.qty-control {
  display: flex;
  align-items: center;
  background: white;
  height: 45px;
}

.qty-btn {
  width: 45px;
  height: 100%;
  border: none;
  background: none;
  font-size: 1.4rem;
  font-weight: 900;
  cursor: pointer;
  transition: 0.1s;
}

.qty-btn:hover { background: var(--mustard); }

.qty-num {
  padding: 0 15px;
  font-weight: 900;
  font-size: 1.1rem;
  height: 100%;
  display: flex;
  align-items: center;
  border-left: var(--border);
  border-right: var(--border);
}

.remove-btn {
  border: 3px solid var(--black);
  padding: 6px 12px;
  color: black;
  font-weight: 900;
  font-size: 0.75rem;
  cursor: pointer;
  text-transform: uppercase;
}

/* SUMMARY SECTION */
.summary-card {
  padding: 2rem;
  box-shadow: 12px 12px 0px var(--black);
  position: sticky;
  top: 110px;
}

.summary-title {
  font-weight: 900;
  font-size: 1.5rem;
  border-bottom: var(--border);
  padding-bottom: 1rem;
  margin: 0 0 1.5rem 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin: 1.2rem 0;
  font-weight: 700;
}

.total {
  font-size: 1.4rem;
  font-weight: 900;
  margin-top: 1.5rem;
}

.total-amount { color: var(--ketchup); }

.brutal-hr {
  border: none;
  border-top: var(--border);
  margin: 1.5rem 0;
}

.checkout-btn {
  width: 100%;
  padding: 1.2rem;
  border: var(--border);
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 6px 6px 0px var(--black);
  transition: 0.1s;
  margin-top: 1rem;
}

.checkout-btn:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px var(--black);
}

.industrial-note {
  margin-top: 2rem;
  padding: 1rem;
  border: var(--border);
  font-size: 0.65rem;
  font-family: 'Space Mono', monospace;
  line-height: 1.4;
}

.border-brutal { border: var(--border); }
.text-lettuce { color: var(--lettuce); font-weight: 900; }

/* RESPONSIVE BREAKPOINT */
@media (max-width: 992px) {
  .main-layout {
    grid-template-columns: 1fr; /* Stack vertikal */
  }

  .summary-section {
    order: -1; /* Ringkasan muncul paling atas di HP */
    margin-bottom: 2rem;
  }

  .summary-card {
    position: static; /* Hilangkan sticky di mobile */
    padding: 1.5rem;
  }

  .item-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem;
  }

  .item-main-info {
    width: 100%;
    border-bottom: 2px solid #eee;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .item-actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .remove-btn {
    padding: 10px 15px;
  }
}

@media (max-width: 480px) {
  .cart-page { padding: 1rem; }
  
  .cart-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-box, .back-link {
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }

  .item-img {
    width: 50px;
    height: 50px;
    font-size: 1.4rem;
  }

  .item-name { font-size: 1.1rem; }

  .qty-btn { width: 35px; }
  .qty-num { padding: 0 10px; font-size: 0.9rem; }
}
</style>