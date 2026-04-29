<template>
  <div class="menu-page">
    <div class="corner-accent"></div>

    <header class="menu-header text-white">
      <h1 class="page-title">KATALOG_MENU</h1>
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="CARI_MAKANAN..." 
          class="brutal-input" 
        />
      </div>
    </header>

    <div class="menu-container">
      <aside class="sidebar">
        <div class="sidebar-tag">GITHUB: LEMONSYNC</div>
        
        <div class="filter-section">
          <h3 class="filter-label">KATEGORI_</h3>
          <ul class="filter-list">
            <li 
              v-for="(cat, index) in categories" 
              :key="cat"
              :class="{ active: activeCategory === cat }"
              class="satuSatu"
              :style="{ animationDelay: `${index * 100}ms` }"
              @click="activeCategory = cat"
            >
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

        <FoodCard 
          v-for="product in filteredProducts" 
          :key="product.id"
          :id="product.id"
          :name="product.name"
          :price="product.price"
          :description="product.description"
          v-bind="product"
          @add-to-cart="addToCart(product)"
        />
        
        <div v-if="filteredProducts.length === 0" class="no-results">
          TIDAK_ADA_HASIL_DITEMUKAN_[-]
        </div>
      </main>
    </div>

    <BrutalFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FoodCard from '../components/FoodCard.vue';
import BrutalFooter from '../components/BrutalFooter.vue';
import { addToCart } from '../store/cart.js';

// 1. DATA MASTER (Simulasi data dari database/API)
const products = ref([
  // MAKANAN_BERAT
  { 
    id: 101, 
    name: 'NASI_AYAM_GEPREK', 
    price: 10, 
    category: 'MAKANAN_BERAT', 
    description: 'Nasi hangat dengan ayam goreng tepung yang dipenyet sambal bawang.', 
    image: '/images/nasi_ayam_geprek.jpg' 
  },
  { 
    id: 110, 
    name: 'BURGER', 
    price: 10, 
    category: 'MAKANAN_BERAT', 
    description: 'Burger yang besar dan isian yang banyak lengkap dengan sauce dan topingnya.', 
    image: '/images/burger.jpg' 
  },
  { 
    id: 111, 
    name: 'NASI_GORENG', 
    price: 10, 
    category: 'MAKANAN_BERAT', 
    description: 'Nasi goreng yang nikmat dan gurih, pas dijadiin santapan saat jam istirahat.', 
    image: '/images/nasi_goreng.jpg' 
  },
  { 
    id: 104, 
    name: 'MIE_AYAM_BAKSO', 
    price: 12, 
    category: 'MAKANAN_BERAT', 
    description: 'Ini enak banget rek, ASELI CUY, Siapa coba yang gak ngiler kalo nyium wangi mie ayam bakso.', 
    image: '/images/mie_ayam_bakso.jpg' 
  },
  { 
    id: 107, 
    name: 'NASI_KUNING_LENGKAP', 
    price: 10, 
    category: 'MAKANAN_BERAT', 
    description: 'Nasi kuning dengan irisan telur dadar, tempe orek, dan sambal.', 
    image: '/images/nasi_kuning.jpg' 
  },

  // SNACK_KERAS
  { 
    id: 102, 
    name: 'KERIPIK_SINGKONG_PEDAS', 
    price: 5, 
    category: 'SNACK_KERAS', 
    description: 'Keripik singkong potong tipis dengan bumbu pedas manis yang garing.', 
    image: '/images/keripik_singkong.jpg' 
  },
  { 
    id: 105, 
    name: 'KACANG_ATOM', 
    price: 3, 
    category: 'SNACK_KERAS', 
    description: 'Kacang tanah berbalut tepung renyah dengan rasa gurih manis.', 
    image: '/images/kacang_atom.jpg' 
  },
  { 
    id: 108, 
    name: 'MAKARONI_GORENG', 
    price: 5, 
    category: 'SNACK_KERAS', 
    description: 'Makaroni kering goreng yang sangat renyah dengan bumbu asin gurih.', 
    image: '/images/makaroni_goreng.jpg' 
  },

  // MINUMAN_SODA
  { 
    id: 103, 
    name: 'SODA_GEMBIRA', 
    price: 8, 
    category: 'MINUMAN_SODA', 
    description: 'Perpaduan air soda, sirup merah, dan susu kental manis yang segar.', 
    image: '/images/soda.jpg' 
  },
  { 
    id: 106, 
    name: 'ES_TIMUN_SODA', 
    price: 7, 
    category: 'MINUMAN_SODA', 
    description: 'Timun segar dicampur dengan soda dan sirup melon.', 
    image: '/images/es_timun_soda.jpg' 
  },
  { 
    id: 109, 
    name: 'COLA_DINGIN', 
    price: 6, 
    category: 'MINUMAN_SODA', 
    description: 'Minuman cola berkarbonasi yang disajikan dingin dari lemari es.', 
    image: '/images/cola_dingin.jpg' 
  },

  // JUS BUAH
  // JUS_BUAH
  { 
    id: 116, 
    name: 'JUS_ALPUKAT_KENTAL', 
    price: 6, 
    category: 'JUS_BUAH', 
    description: 'Jus alpukat mentega dengan topping kental manis cokelat di pinggiran gelas.', 
    image: '/images/jus_alpukat.jpg' 
  },
  { 
    id: 117, 
    name: 'JUS_MANGGA_SEGAR', 
    price: 10, 
    category: 'JUS_BUAH', 
    description: 'Mangga harum manis segar yang diblender halus dengan sedikit es batu.', 
    image: '/images/jus_mangga.jpg' 
  },
  { 
    id: 118, 
    name: 'JUS_JAMBU_BIJI', 
    price: 6, 
    category: 'JUS_BUAH', 
    description: 'Jambu biji merah pilihan yang kaya vitamin C, disaring halus tanpa biji.', 
    image: '/images/jus_jambu.jpg' 
  },
  { 
    id: 119, 
    name: 'JUS_JERUK_PERAS', 
    price: 6, 
    category: 'JUS_BUAH', 
    description: 'Jeruk peras asli tanpa pemanis buatan, disajikan dingin menyegarkan.', 
    image: '/images/jus_jeruk.jpg' 
  },
  { 
    id: 120, 
    name: 'JUS_NAGA_MERAH', 
    price: 6, 
    category: 'JUS_BUAH', 
    description: 'Buah naga merah segar yang memberikan warna alami dan tekstur lembut.', 
    image: '/images/jus_buah_naga.jpg' 
  },
  { 
    id: 121, 
    name: 'JUS_SIRSAK_MANIS', 
    price: 6, 
    category: 'JUS_BUAH', 
    description: 'Daging buah sirsak yang asam manis, cocok untuk melepas dahaga siang hari.', 
    image: '/images/jus_sirsak.jpg' 
  }
]);

// 2. STATE UNTUK FILTER
const categories = ['SEMUA_MENU', 'MAKANAN_BERAT', 'SNACK_KERAS', 'MINUMAN_SODA', 'JUS_BUAH'];
const activeCategory = ref('SEMUA_MENU');
const searchQuery = ref('');
const sortBy = ref('low');

// 3. LOGIC FILTERING & SORTING
const filteredProducts = computed(() => {
  let result = products.value;

  // Filter Kategori
  if (activeCategory.value !== 'SEMUA_MENU') {
    result = result.filter(p => p.category === activeCategory.value);
  }

  // Filter Search
  if (searchQuery.value) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sorting Harga
  result = [...result].sort((a, b) => {
    return sortBy.value === 'low' ? a.price - b.price : b.price - a.price;
  });

  return result;
});
</script>

<style scoped>

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

.menu-page {
  /* Variabel Palet Utama */
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --soda: #0051FF;
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

/* 1. BACKGROUND IMAGE (WATERMARK STYLE) */
.menu-page::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/cafe.jpg'); /* Ganti dengan path gambarmu */
  opacity: 50%;
  z-index: -1;
}

/* 2. AKSESORIS: CORNER ACCENT */
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

/* 3. HEADER AREA */
.menu-header {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 4rem;
  border-bottom: var(--line);
  
  /* Tambahkan ini */
  backdrop-filter: blur(1px); 
  -webkit-backdrop-filter: blur(10px); /* Dukungan untuk Safari */
  background-color: rgba(255, 255, 255, 0.5); /* Warna transparan agar efek blur terlihat */
  position: relative;
  z-index: 2;
}

.page-title {
  color: #FFDB00;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -2px;
  /* Stroke untuk mempertegas gaya poster */
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

/* 4. MAIN LAYOUT & SIDEBAR */
.menu-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  width: 100%;
  border-top: none;
}

.sidebar {
  position: relative;
  border-right: var(--line);
  padding: 3rem;
  background-color: #f9f9f9;
  /* Pola Titik Industrial */
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

/* 5. FILTER ELEMENTS */
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
  transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

/* 6. PRODUCT GRID & FLOATING DECO */
.product-grid {
  display: grid;
  /* Desktop default */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 2rem;
  padding: 2rem;
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

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 100% !important; /* Paksa satu kolom penuh */
    gap: 2rem;
    padding: 1rem; /* Padding dikecilkan agar kartu punya ruang lebar */
    justify-items: center; /* Kartu di tengah */
  }
}

/* 7. RESPONSIVE DESIGN */
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
  .corner-accent, .sidebar-tag {
    display: none;
  }
}
</style>