import { createRouter, createWebHistory } from "vue-router";

// --- 1. LAYOUT / PARENT COMPONENTS ---
// Root (Halaman pilihan materi)
import AppPortal from "@/App.vue"; 

// Wrapper untuk Ecommerce (Tempat Navbar Toko berada)
import EcommerceLayout from "@/Ecommerce/Ecommerce.vue"; 

// Wrapper untuk Game (Bisa polos atau untuk Navbar Game)
import GameLayout from "@/Game/Game.vue";

// --- 2. ECOMMERCE CHILDREN VIEWS ---
import LandingPageE from "@/Ecommerce/views/LandingPageE.vue";
import MenuPageE from "@/Ecommerce/views/MenuPageE.vue";
import CartPageE from "@/Ecommerce/views/CartPageE.vue";
import DashE from "@/Ecommerce/views/DashE.vue";

// --- 3. GAME CHILDREN VIEWS ---
import LandingPageG from "@/Game/view/LandingPageG.vue";
import AuthFormG from "@/Game/view/AuthFormG.vue";
import GamePlayG from "@/Game/view/GamePlayG.vue";
import LeaderboardG from "@/Game/view/LeaderboardG.vue";

const routes = [
  // ==========================================
  // PORTAL UTAMA (ROOT)
  // ==========================================
  {
    path: "/",
    name: "Portal",
    component: AppPortal,
    meta: { title: "EXPO | PILIH MATERI" }
  },

  // ==========================================
  // MODUL ECOMMERCE (Nested)
  // ==========================================
  {
    path: "/ecommerce",
    component: EcommerceLayout, // Induk yang merender AppNavbar Ecommerce
    children: [
      {
        path: "", // URL: /ecommerce
        name: "Ecommerce_Home",
        component: LandingPageE,
        meta: { title: "SHOP | LANDING", transition: "brutal-slide" }
      },
      {
        path: "menu", // URL: /ecommerce/menu
        name: "Ecommerce_Menu",
        component: MenuPageE,
        meta: { title: "SHOP | MENU" }
      },
      {
        path: "cart", // URL: /ecommerce/cart
        name: "Ecommerce_Cart",
        component: CartPageE,
        meta: { title: "SHOP | KERANJANG" }
      },
      {
        path: "dash", // URL: /ecommerce/dash
        name: "Ecommerce_Dash",
        component: DashE,
        meta: { title: "SHOP | DASHBOARD" }
      }
    ]
  },

  // ==========================================
  // MODUL GAME (Nested)
  // ==========================================
  {
    path: "/game",
    component: GameLayout, // Induk untuk modul Game
    children: [
      {
        path: "", // URL: /game
        name: "Game_Home",
        component: LandingPageG,
        meta: { title: "GAME | LANDING" }
      },
      {
        path: "auth", // URL: /game/auth
        name: "Game_Auth",
        component: AuthFormG,
        meta: { title: "GAME | LOGIN" }
      },
      {
        path: "play", // URL: /game/play
        name: "Game_Play",
        component: GamePlayG,
        meta: { title: "GAME | PLAYING" }
      },
      {
        path: "leaderboard", // URL: /game/leaderboard
        name: "Game_Leaderboard",
        component: LeaderboardG,
        meta: { title: "GAME | RANKING" }
      }
    ]
  },

  // ==========================================
  // 404 - REDIRECT TO ROOT
  // ==========================================
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Otomatis scroll ke atas setiap pindah halaman
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

// Navigation Guard untuk Title Tab Browser
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "EXPO_APP";
  next();
});

export default router;