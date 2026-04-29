<template>
  <div class="card">
    <div class="card-header bg-black text-white">
      <span class="category-tag">ITEM_ID: {{ id }}</span>
      <span v-if="discount" class="promo-tag bg-ketchup">PROMO_{{ discount }}%</span>
    </div>

    <div class="card-visual">
      <div class="visual-overlay"></div>
      <div class="visual-placeholder">
        <img :src="image" :alt="name" class="product-img">
      </div>
      <div class="image-noise"></div>
    </div>

    <div class="card-body bg-white">
      <div class="info-row">
        <h3 class="product-name">{{ name }}</h3>
        <div class="price-box bg-mustard">
          IDR_{{ price }}K
        </div>
      </div>
      <p class="product-desc">{{ description }}</p>
    </div>

    <div class="card-footer">
      <button @click="$emit('add-to-cart', { id, name, price, description })" class="buy-button">
        <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="3" 
              stroke-linecap="square" 
              stroke-linejoin="miter" 
              class="cart-icon"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
        [+]
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String,
  discount: Number
});

// Mendefinisikan event agar dipahami oleh parent (MenuPage)
defineEmits(['add-to-cart']);
</script>

<style scoped>
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

.card {
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --lettuce: #615721;
  --soda: #0051FF;
  --border-width: 5px;

  animation: fadeIn 0.5s ease;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border: var(--border-width) solid var(--black);

  /* Perbaikan Shadow: Gunakan shadow lebih kecil di layar kecil nanti */
  box-shadow: 8px 8px 0px 0px var(--black);

  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: 'Space Grotesk', sans-serif;
  height: 100%;
  width: 100%;
  /* Pastikan ambil full width container */
  box-sizing: border-box;
  /* WAJIB: agar border tidak nambah lebar */
}

.card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 14px 14px 0px 0px var(--black);
}

/* HEADER SECTION */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: var(--border-width) solid var(--black);
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
}

.promo-tag {
  padding: 2px 8px;
  color: var(--white);
}

.initials {
  font-size: 5rem;
  font-weight: 900;
  color: var(--black);
  opacity: 0.15;
}

/* BODY SECTION */
.card-body {
  padding: 1.5rem;
  flex-grow: 1;
}

.info-row {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 1rem;
  overflow-wrap: break-word;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}

.price-box {
  padding: 4px 8px;
  border: 3px solid var(--black);
  font-family: 'Space Mono', monospace;
  font-weight: 900;
  white-space: nowrap;
}

.product-desc {
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;
  color: #333;
}

.card-visual {
  height: 250px;
  position: relative;
  overflow: hidden;
  border-bottom: 5px solid var(--black);
  background-color: #e0e0e0;
  /* Warna dasar semen */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Gambar Utama */
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) brightness(1.1);
  /* Efek brutal: kontras tinggi */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover .product-img {
  transform: scale(1.15) rotate(2deg);
  /* Efek zoom dan miring saat hover */
}

/* Efek Overlay Sudut (Khas Viewfinder Kamera) */
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
  border-top: 4px solid var(--black);
  border-left: 4px solid var(--black);
}

.visual-overlay::after {
  bottom: 15px;
  right: 15px;
  border-bottom: 4px solid var(--black);
  border-right: 4px solid var(--black);
}

/* Efek Noise/Tekstur (Opsional) */
.image-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
  opacity: 0.05;
  pointer-events: none;
  z-index: 1;
}

/* Placeholder jika gambar gagal load */
.visual-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* FOOTER SECTION */
.card-footer {
  border-top: var(--border-width) solid var(--black);
}

.buy-button {
  text-align: center;
  color: white;
  width: 100%;
  padding: 1.2rem;
  background-color: var(--lettuce);
  border: none;
  font-family: inherit;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
}

.buy-button:hover {
  background-color: var(--black);
  color: var(--white);
}

.buy-button:active {
  background-color: var(--soda);
  transform: scale(0.98);
  /* Efek pencet */
}

/* UTILITY CLASSES */
.bg-black {
  background-color: var(--black);
}

.bg-white {
  background-color: var(--white);
}

.bg-mustard {
  background-color: var(--mustard);
}

.bg-ketchup {
  background-color: var(--ketchup);
}

.text-white {
  color: var(--white);
}

@media (max-width: 480px) {
  .card {
    /* Kurangi shadow agar tidak memotong space grid */
    box-shadow: 5px 5px 0px 0px var(--black);
    border-width: 4px;
    /* Sedikit lebih tipis di mobile */
  }

  .card-visual {
    height: 180px;
    /* Perkecil tinggi gambar di HP agar tidak menu-full */
  }

  .product-name {
    font-size: 1.1rem;
    /* Sesuaikan ukuran font */
  }

  .buy-button {
    padding: 1rem;
    /* Tombol lebih ramping */
    font-size: 0.9rem;
  }
}
</style>