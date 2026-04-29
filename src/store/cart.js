// Buat file baru src/store/cart.js (atau taruh di script setup main)
import { ref, watch, onMounted } from 'vue';

export const cart = ref([]);

// Ambil data awal
const savedCart = localStorage.getItem('smkn9_cart');
if (savedCart) cart.value = JSON.parse(savedCart);

// Simpan otomatis tiap ada perubahan
watch(cart, (newVal) => {
  localStorage.setItem('smkn9_cart', JSON.stringify(newVal));
}, { deep: true });

export const addToCart = (product) => {
  const item = cart.value.find(p => p.id === product.id);
  if (item) {
    item.qty++;
  } else {
    cart.value.push({ ...product, qty: 1 });
  }
  alert(`BRUTAL! ${product.name} DITAMBAHKAN!`);
};