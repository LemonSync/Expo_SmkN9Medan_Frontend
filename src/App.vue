<template>
  <div class="brutal-app">
    <div class="navbar">
    <AppNavbar />
  </div>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-swap" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Mencegah border menambah lebar elemen */
}

html, body {
  width: 100%;
  overflow-x: hidden; /* Mencegah sela putih di kanan saat elemen meluber */
  background-color: #000000; /* Atau warna tema utamamu */
}

.brutal-app {
  display: flex;
  flex-direction: column;
}

.navbar {
  z-index: 1000;
}

.main-content {
  background-image: url('./assets/cafe.jpg');
  flex-grow: 1;
}

/* TRANSISI ANTAR HALAMAN 
   Kita tidak pakai fade halus, kita pakai efek 'patah' 
   atau langsung muncul untuk kesan brutal.
*/
.page-swap-enter-active {
  animation: brutal-in 0.2s ease;
}

.page-swap-leave-active {
  animation: brutal-out 0.1s ease;
}

@keyframes brutal-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes brutal-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Custom Scrollbar untuk Browser (Industrial Look) */
::-webkit-scrollbar {
  width: 16px;
}

::-webkit-scrollbar-track {
  background: var(--black);
}

::-webkit-scrollbar-thumb {
  background: var(--mustard);
  border: 4px solid var(--black);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--lettuce);
}
</style>