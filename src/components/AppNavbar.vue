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
import { computed, ref } from 'vue';
import { cart } from '../store/cart.js';

const isMenuOpen = ref(false);

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
  height: 90px;
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
  min-width: 180px;
  justify-content: center;
}

.cart-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-icon {
  width: 26px;
  height: 26px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cart-link:hover .cart-icon {
  transform: rotate(-15deg) scale(1.2);
}

.cart-badge {
  font-family: 'Space Mono', monospace;
  padding: 2px 10px;
  border: 3px solid var(--black);
  font-size: 1.1rem;
  background-color: black;
  color: var(--lettuce);
}

.nav-item:hover .cart-badge {
  background-color: white;
  color: black;
}

/* MOBILE TOGGLE */
.mobile-toggle {
  display: none;
  color: black;
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

/* RESPONSIVE REPAIR */
@media (max-width: 992px) {
  .navbar {
    height: 70px;
  }

  .logo {
    font-size: 1.5rem;
  }

  .mobile-toggle {
    display: block;
    margin-left: auto;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: var(--white);
    border-bottom: var(--border-width) solid var(--black);
    transform: translateY(-150%);
    transition: transform 0.4s ease;
    z-index: -1;
  }

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
  
  .cart-icon {
    width: 22px;
    height: 22px;
  }
}
</style>