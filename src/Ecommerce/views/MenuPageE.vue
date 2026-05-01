<template>
  <div class="menu-page">
    <div class="corner-accent"></div>

    <header class="menu-header text-white">
      <h1 class="page-title">KATALOG_MENU</h1>
      <div class="search-box">
        <input v-model="searchQuery" type="text" placeholder="CARI_MAKANAN..." class="brutal-input" />
      </div>
    </header>

    <div class="menu-container">
      <aside class="sidebar">
        <div class="sidebar-tag">GITHUB: LEMONSYNC</div>

        <div class="filter-section">
          <h3 class="filter-label">KATEGORI_</h3>
          <ul class="filter-list">
            <li v-for="(cat, index) in categories" :key="cat" :class="{ active: activeCategory === cat }"
              class="satuSatu" :style="{ animationDelay: `${index * 100}ms` }" @click="activeCategory = cat">
              {{ cat.replace('_', ' ') }}
            </li>
          </ul>
        </div>

        <div class="filter-section">
          <h3 class="filter-label">URUTKAN_</h3>
          <select v-model="sortBy" class="brutal-select">
            <option value="low">HARGA_TERENDAH</option>
            <option value="high">HARGA_TERTINGGI</option>
          </select>
        </div>
      </aside>

      <main class="product-grid">
        <div class="floating-sticker bg-mustard">STOK_TERSEDIA</div>

        <FoodCard v-for="product in filteredProducts" :key="product.id" :id="product.id" :name="product.name"
          :price="product.price" :description="product.description" v-bind="product"
          @add-to-cart="handleAddToCart(product)" />

        <div v-if="filteredProducts.length === 0" class="no-results">
          TIDAK_ADA_HASIL_DITEMUKAN_[-]
        </div>
      </main>
    </div>

    <Transition name="fade">
      <div v-if="notif.show" class="modal-overlay">
        <div class="modal-content-notif border-brutal bg-white">
          <div class="modal-body-notif">
            <div class="status-icon">✔</div>
            <p class="modal-text">{{ notif.message }}</p>
            <button @click="notif.show = false" class="close-notif-btn">OKE_MANTAP</button>
          </div>
        </div>
      </div>
    </Transition>

    <BrutalFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FoodCard from '../components/FoodCard.vue';
import BrutalFooter from '../components/BrutalFooter.vue';
import { addToCart } from '../store/cart.js';
import products from '../data/product';

// --- STATE UNTUK MODAL ---
const notif = ref({ show: false, message: '' });

// --- STATE UNTUK FILTER ---
const categories = ['SEMUA_MENU', 'MAKANAN_BERAT', 'SNACK_KERAS', 'MINUMAN_SODA', 'JUS_BUAH'];
const activeCategory = ref('SEMUA_MENU');
const searchQuery = ref('');
const sortBy = ref('low');

// --- LOGIC ADD TO CART (Ganti alert ke Modal) ---
const handleAddToCart = (product) => {
  addToCart(product); // Panggil fungsi store
  notif.value.message = `${product.name.replace(/_/g, ' ')} BERHASIL DITAMBAHKAN!`;
  notif.value.show = true;
};

// --- LOGIC FILTERING & SORTING ---
const filteredProducts = computed(() => {
  let result = products.value;

  if (activeCategory.value !== 'SEMUA_MENU') {
    result = result.filter(p => p.category === activeCategory.value);
  }

  if (searchQuery.value) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  result = [...result].sort((a, b) => {
    return sortBy.value === 'low' ? a.price - b.price : b.price - a.price;
  });

  return result;
});
</script>

<style scoped>
/* --- ANIMATIONS (Original) --- */
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0.5;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0.5;
    transform: translateX(100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.satuSatu {
  opacity: 0;
  animation: fadeRight 0.5s ease forwards;
}

/* --- MAIN PAGE STYLE (Original) --- */
.menu-page {
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --soda: #0051FF;
  --lettuce: #00FF47;
  --line: 5px solid var(--black);
  animation: fadeIn 0.1s ease;
  min-height: 100vh;
  background-color: var(--white);
  font-family: 'Space Grotesk', sans-serif;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
}

.menu-page::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/cafe.jpg');
  opacity: 50%;
  z-index: -1;
}

.corner-accent {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 80px 80px 0 0;
  border-color: var(--mustard) transparent transparent transparent;
  z-index: 100;
  pointer-events: none;
}

.corner-accent::after {
  content: "HOT";
  position: absolute;
  top: -70px;
  left: 10px;
  font-weight: 900;
  font-size: 0.8rem;
  color: var(--black);
  transform: rotate(-45deg);
}

.menu-header {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 4rem;
  border-bottom: var(--line);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 2;
}

.page-title {
  color: #FFDB00;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -2px;
  -webkit-text-stroke: 1.5px var(--black);
  margin: 0;
  opacity: 0;
  animation: fadeRight 0.5s ease forwards;
}

.brutal-input {
  background: var(--white);
  border: var(--line);
  padding: 1rem;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  width: 300px;
  outline: none;
  box-shadow: 8px 8px 0px var(--mustard);
  transition: 0.1s;
  animation: fadeLeft 0.5s ease forwards;
}

.brutal-input:focus {
  background: var(--mustard);
  box-shadow: 12px 12px 0px var(--black);
}

.menu-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  width: 100%;
}

.sidebar {
  position: relative;
  border-right: var(--line);
  padding: 3rem;
  background-color: #f9f9f9;
  background-image: radial-gradient(var(--black) 1px, transparent 1px);
  background-size: 20px 20px;
}

.sidebar-tag {
  position: absolute;
  right: -25px;
  bottom: 100px;
  transform: rotate(-90deg);
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 900;
  background: var(--black);
  color: var(--white);
  padding: 2px 10px;
}

.filter-section {
  margin-bottom: 3rem;
}

.filter-label {
  font-size: 1.2rem;
  font-weight: 900;
  background: var(--black);
  color: var(--white);
  padding: 5px 10px;
  margin-bottom: 1.5rem;
  display: inline-block;
  opacity: 0;
  animation: fadeRight 0.5s ease forwards;
  box-shadow: 4px 4px 0px var(--ketchup);
}

.filter-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-list li {
  font-weight: 800;
  cursor: pointer;
  padding: 5px 0;
  transition: 0.2s;
}

.filter-list li:hover {
  color: var(--ketchup);
  padding-left: 10px;
}

.filter-list li.active {
  color: var(--soda);
  text-decoration: underline;
  text-decoration-thickness: 4px;
  transform: translateX(10px);
  font-weight: 900;
}

.brutal-select {
  width: 100%;
  padding: 10px;
  border: 4px solid var(--black);
  font-weight: 900;
  appearance: none;
  background: var(--white);
  cursor: pointer;
  opacity: 0;
  animation: fadeRight 0.5s ease forwards;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  position: relative;
}

.floating-sticker {
  position: absolute;
  top: -15px;
  right: 40px;
  padding: 8px 15px;
  border: 3px solid var(--black);
  font-weight: 900;
  font-size: 0.9rem;
  transform: rotate(3deg);
  box-shadow: 5px 5px 0px var(--black);
  z-index: 10;
  background-color: var(--mustard);
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 5rem;
  font-size: 1.5rem;
  font-weight: 900;
  border: 4px dashed var(--black);
  background: rgba(255, 255, 255, 0.8);
}

/* --- MODAL STYLES (Tambahan Baru) --- */
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
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.modal-content-notif {
  width: 90%;
  max-width: 400px;
  background-color: white;
  padding: 2.5rem;
  box-shadow: 15px 15px 0px var(--lettuce);
  text-align: center;
}

.status-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 900;
}

.modal-text {
  font-weight: 900;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.close-notif-btn {
  width: 100%;
  padding: 1.2rem;
  background: var(--mustard);
  border: 5px solid var(--black);
  font-weight: 950;
  box-shadow: 6px 6px 0px var(--black);
  cursor: pointer;
  transition: 0.1s;
}

.close-notif-btn:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.border-brutal {
  border: 5px solid var(--black);
}

/* --- RESPONSIVE --- */
@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 100% !important;
    padding: 1rem;
  }
}

@media (max-width: 1024px) {
  .menu-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: var(--line);
    padding: 2rem;
  }

  .menu-header {
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
    padding: 2rem;
  }

  .brutal-input {
    width: 100%;
  }

  .corner-accent,
  .sidebar-tag {
    display: none;
  }
}

/* Vue Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>