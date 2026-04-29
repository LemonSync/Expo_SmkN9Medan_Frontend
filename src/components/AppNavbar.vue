<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/" class="logo">
        SMKN9_<span class="outline-text">SHOP</span>
      </router-link>
    </div>

    <div class="nav-links" :class="{ 'is-active': isMenuOpen }">
      <router-link to="/" class="nav-item" @click="isMenuOpen = false">
        <span class="nav-text">HOME</span>
      </router-link>
      <router-link to="/menu" class="nav-item" @click="isMenuOpen = false">
        <span class="nav-text">MENU_KATALOG</span>
      </router-link>
      
      <div class="cart-box">
        <router-link to="/cart" class="nav-item cart-link" @click="isMenuOpen = false">
          <div class="cart-wrapper">
             <span class="cart-label">CART</span>
             <span class="cart-badge text-lettuce">{{ totalItems }}</span>
          </div>
        </router-link>
      </div>
    </div>

    <button class="mobile-toggle bg-ketchup" @click="toggleMenu">
      {{ isMenuOpen ? 'CLOSE_[X]' : 'MENU_[-]' }}
    </button>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue'; // Tambah ref
import { cart } from '../store/cart.js';

const isMenuOpen = ref(false); // State untuk buka/tutup menu

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const totalItems = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.qty, 0);
});
</script>

<style scoped>
.navbar {
  --black: #000000;
  --white: #FFFFFF;
  --mustard: #FFDB00;
  --ketchup: #FF0000;
  --lettuce: #00FF47;
  --soda: #0051FF;
  --border-width: 5px;
  
  width: 100%;
  top: 0;
  left: 0;
  margin: 0;
  display: flex;
  height: 90px; /* Sedikit lebih tinggi agar lebih megah */
  background-color: var(--white);
  border-bottom: var(--border-width) solid var(--black);
  position: sticky;
  z-index: 1000;
  font-family: 'Space Grotesk', sans-serif;
}

/* BRAND SECTION */
.nav-brand {
  display: flex;
  align-items: center;
  padding: 0 2.5rem;
  background-color: var(--mustard);
  border-right: var(--border-width) solid var(--black);
  transition: background 0.2s;
}

.nav-brand:hover {
  background-color: var(--soda);
}

.logo {
  font-size: 2rem;
  font-weight: 900;
  text-decoration: none;
  color: var(--black);
  letter-spacing: -2px;
}

.outline-text {
  color: var(--white);
  -webkit-text-stroke: 1.5px var(--black);
}

/* LINKS SECTION */
.nav-links {
  display: flex;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-right: var(--border-width) solid var(--black);
  text-decoration: none;
  color: var(--black);
  font-weight: 900;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  transition: 0.1s;
}

/* Efek Hover Brutal: Teks naik ke atas */
.nav-text {
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.nav-item:hover {
  background-color: var(--black);
  color: var(--white);
}

.nav-item:hover .nav-text {
  transform: scale(1.1) rotate(-2deg);
}

/* Active Link State */
.router-link-active:not(.logo) {
  background-color: var(--soda);
  color: var(--white);
}

/* CART BOX */
.cart-box {
  margin-left: auto;
  display: flex;
}

.cart-link {
  background-color: var(--lettuce);
  border-right: none;
  border-left: var(--border-width) solid var(--black);
  min-width: 160px;
  justify-content: center;
}

.cart-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-badge {
  font-family: 'Space Mono', monospace;
  padding: 2px 10px;
  border: 3px solid var(--black);
  font-size: 1.1rem;
  background-color: black;
}

.cart-badge:hover {
  background-color: white;
}

.text-lettuce { color: var(--lettuce); }

/* MOBILE TOGGLE */
.mobile-toggle {
  display: none;
  color: var(--white);
  border: none;
  border-left: var(--border-width) solid var(--black);
  padding: 0 2rem;
  font-weight: 900;
  font-size: 1.2rem;
  cursor: pointer;
}

.mobile-toggle:hover {
  background-color: var(--black);
}

/* RESPONSIVE */
/* RESPONSIVE REPAIR */
@media (max-width: 992px) {
  .navbar { height: 70px; }
  .logo { font-size: 1.5rem; }
  
  .mobile-toggle {
    display: block;
    margin-left: auto;
  }

  .nav-links {
    display: flex; /* Ubah dari none ke flex */
    flex-direction: column;
    position: fixed;
    top: 70px; /* Sesuai tinggi navbar mobile */
    left: 0;
    width: 100%;
    background-color: var(--white);
    border-bottom: var(--border-width) solid var(--black);
    
    /* Sembunyikan secara default menggunakan transform agar bisa dianimasi */
    transform: translateY(-150%);
    transition: transform 0.4s ease; /* Efek patah-patah khas brutalist */
    z-index: -1;
  }

  /* Munculkan saat tombol diklik */
  .nav-links.is-active {
    transform: translateY(0);
  }

  .nav-item {
    width: 100%;
    padding: 1.5rem 2rem;
    border-right: none;
    border-bottom: var(--border-width) solid var(--black);
  }

  .cart-box {
    width: 100%;
  }

  .cart-link {
    width: 100%;
    border-left: none;
    justify-content: flex-start;
  }
}
</style>