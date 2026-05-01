import { ref } from 'vue';

const products = ref([
  {
    id: 1,
    name: "NASI_AYAM_GEPREK",
    price: 10,
    category: "MAKANAN_BERAT",
    description:
      "Nasi hangat dengan ayam goreng tepung yang dipenyet sambal bawang.",
    image: "/images/nasi_ayam_geprek.jpg",
  },
  {
    id: 2,
    name: "BURGER",
    price: 10,
    category: "MAKANAN_BERAT",
    description:
      "Burger yang besar dan isian yang banyak lengkap dengan sauce dan topingnya.",
    image: "/images/burger.jpg",
  },
  {
    id: 3,
    name: "NASI_GORENG",
    price: 10,
    category: "MAKANAN_BERAT",
    description:
      "Nasi goreng yang nikmat dan gurih, pas dijadiin santapan saat jam istirahat.",
    image: "/images/nasi_goreng.jpg",
  },
  {
    id: 4,
    name: "MIE_AYAM_BAKSO",
    price: 12,
    category: "MAKANAN_BERAT",
    description:
      "Ini enak banget rek, ASELI CUY, Siapa coba yang gak ngiler kalo nyium wangi mie ayam bakso.",
    image: "/images/mie_ayam_bakso.jpg",
  },
  {
    id: 5,
    name: "NASI_KUNING_LENGKAP",
    price: 10,
    category: "MAKANAN_BERAT",
    description:
      "Nasi kuning dengan irisan telur dadar, tempe orek, dan sambal.",
    image: "/images/nasi_kuning.jpg",
  },
  {
    id: 101,
    name: "KERIPIK_SINGKONG",
    price: 5,
    category: "SNACK_KERAS",
    description:
      "Keripik singkong potong tipis dengan bumbu pedas manis yang garing.",
    image: "/images/keripik_singkong.jpg",
  },
  {
    id: 102,
    name: "KACANG_ATOM",
    price: 3,
    category: "SNACK_KERAS",
    description: "Kacang tanah berbalut tepung renyah dengan rasa gurih manis.",
    image: "/images/kacang_atom.jpg",
  },
  {
    id: 103,
    name: "MAKARONI_GORENG",
    price: 5,
    category: "SNACK_KERAS",
    description:
      "Makaroni kering goreng yang sangat renyah dengan bumbu asin gurih.",
    image: "/images/makaroni_goreng.jpg",
  },
  {
    id: 201,
    name: "SODA_GEMBIRA",
    price: 8,
    category: "MINUMAN_SODA",
    description:
      "Perpaduan air soda, sirup merah, dan susu kental manis yang segar.",
    image: "/images/soda.jpg",
  },
  {
    id: 202,
    name: "ES_TIMUN_SODA",
    price: 7,
    category: "MINUMAN_SODA",
    description: "Timun segar dicampur dengan soda dan sirup melon.",
    image: "/images/es_timun_soda.jpg",
  },
  {
    id: 203,
    name: "COLA_DINGIN",
    price: 6,
    category: "MINUMAN_SODA",
    description:
      "Minuman cola berkarbonasi yang disajikan dingin dari lemari es.",
    image: "/images/cola_dingin.jpg",
  },
  {
    id: 301,
    name: "JUS_ALPUKAT_KENTAL",
    price: 6,
    category: "JUS_BUAH",
    description:
      "Jus alpukat mentega dengan topping kental manis cokelat di pinggiran gelas.",
    image: "/images/jus_alpukat.jpg",
  },
  {
    id: 302,
    name: "JUS_MANGGA_SEGAR",
    price: 10,
    category: "JUS_BUAH",
    description:
      "Mangga harum manis segar yang diblender halus dengan sedikit es batu.",
    image: "/images/jus_mangga.jpg",
  },
  {
    id: 303,
    name: "JUS_JAMBU_BIJI",
    price: 6,
    category: "JUS_BUAH",
    description:
      "Jambu biji merah pilihan yang kaya vitamin C, disaring halus tanpa biji.",
    image: "/images/jus_jambu.jpg",
  },
  {
    id: 304,
    name: "JUS_JERUK_PERAS",
    price: 6,
    category: "JUS_BUAH",
    description:
      "Jeruk peras asli tanpa pemanis buatan, disajikan dingin menyegarkan.",
    image: "/images/jus_jeruk.jpg",
  },
  {
    id: 305,
    name: "JUS_NAGA_MERAH",
    price: 6,
    category: "JUS_BUAH",
    description:
      "Buah naga merah segar yang memberikan warna alami dan tekstur lembut.",
    image: "/images/jus_buah_naga.jpg",
  },
  {
    id: 306,
    name: "JUS_SIRSAK_MANIS",
    price: 6,
    category: "JUS_BUAH",
    description:
      "Daging buah sirsak yang asam manis, cocok untuk melepas dahaga siang hari.",
    image: "/images/jus_sirsak.jpg",
  },
]);

export default products;