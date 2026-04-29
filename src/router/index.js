import { createRouter, createWebHistory } from "vue-router";

// 1. Import Views (Halaman Utama)
import LandingPage from "../views/LandingPage.vue";
import MenuPage from "../views/MenuPage.vue";
import CartPage from "@/views/CartPage.vue";

// 2. Definisi Route
const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
    meta: {
      title: "SMKN9_SHOP | HOME",
      transition: "brutal-slide",
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: MenuPage,
    meta: {
      title: "SMKN9_SHOP | KATALOG_MENU",
      transition: "brutal-slide",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
    meta: {
      title: "SMKN9_SHOP | KERANJANG_KAMU",
      transition: "brutal-slide",
    },
  },
  // Catch-all (404) diarahkan kembali ke Home atau halaman khusus
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

// 3. Inisialisasi Router
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Memastikan setiap pindah halaman, posisi scroll kembali ke atas (kaku)
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 4. Navigation Guard untuk Mengubah Judul Tab Browser
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "BRUTAL_EATS";
  next();
});

export default router;
