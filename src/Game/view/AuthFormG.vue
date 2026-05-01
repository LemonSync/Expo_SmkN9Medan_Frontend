<template>
  <div class="auth-container">
    <div class="centered-container">
      <section class="card">
        <h2 class="auth-title">Identity Check</h2>
        
        <div class="auth-form">
          <div class="input-group">
            <label>USERNAME</label>
            <input 
              v-model="username" 
              type="text" 
              placeholder="Masukkan nama kamu" 
              autocomplete="off" 
              :disabled="isLoading"
              @keyup.enter="handleLogin"
            >
          </div>

          <div class="input-group">
            <label>PASSWORD</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              :disabled="isLoading"
              @keyup.enter="handleLogin"
            >
          </div>

          <div class="btn-group">
            <button 
              @click="handleLogin" 
              class="btn-login" 
              :disabled="isLoading"
            >
              {{ isLoading ? 'LOADING...' : 'LOGIN' }}
            </button>
            
            <button 
              @click="handleRegister" 
              class="btn-secondary" 
              :disabled="isLoading"
            >
              REGISTER
            </button>
          </div>

          <button @click="goBack" class="btn-text" style="margin-top:15px">
            ← KEMBALI KE BERANDA
          </button>
        </div>
      </section>
    </div>

    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="modal.show" class="modal-overlay">
          <div class="modal-card">
            <div class="modal-header" :class="modal.type">
              {{ modal.type === 'error' ? 'Opps!' : 'Info' }}
            </div>
            <div class="modal-body">
              <p>{{ modal.message }}</p>
              <button @click="modal.show = false" class="btn-main">OK!</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// Router untuk navigasi antar halaman
const router = useRouter()

// State untuk form input
const username = ref('')
const password = ref('')
const isLoading = ref(false)

// State untuk modal alert (menggantikan alert bawaan browser)
const modal = reactive({
  show: false,
  message: '',
  type: 'error'
})

/**
 * Menampilkan modal info/error
 * @param {string} msg - Pesan yang ingin ditampilkan
 * @param {string} type - Tipe modal ('error' atau 'success')
 */
const showModal = (msg, type = 'error') => {
  modal.message = msg
  modal.type = type
  modal.show = true
}

/**
 * Logika Login
 * Mengirim data ke API Express.js
 */
const handleLogin = async () => {
  if (!username.value || !password.value) return showModal("Isi username dan password!")
  
  isLoading.value = true
  try {
    const res = await fetch('https://lemon-expo-backend.vercel.app/api/game/login', {
      method: 'POST',
      credentials: 'include', // Wajib agar session cookie bisa disimpan oleh browser
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: username.value, 
        password: password.value 
      })
    })

    const data = await res.json()

    if (data.status === 'success') {
      // Redirect ke halaman game jika berhasil
      router.push('/game/play')
    } else {
      showModal(data.message || "Login gagal.")
    }
  } catch (err) {
    console.error("Login Error:", err)
    showModal("Gagal terhubung ke server backend.")
  } finally {
    isLoading.value = false
  }
}

/**
 * Logika Registrasi
 * Mengirim data user baru ke API Express.js
 */
const handleRegister = async () => {
  if (!username.value || !password.value) return showModal("Lengkapi data!")
  
  isLoading.value = true
  try {
    const res = await fetch('https://lemon-expo-backend.vercel.app/api/game/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: username.value, 
        password: password.value 
      })
    })

    const data = await res.json()
    
    // Tampilkan pesan sukses atau error dari backend
    showModal(data.message, data.status === 'success' ? 'success' : 'error')
    
    // Opsional: Kosongkan password setelah registrasi berhasil
    if (data.status === 'success') {
      password.value = ''
    }
  } catch (err) {
    console.error("Register Error:", err)
    showModal("Terjadi kesalahan saat registrasi.")
  } finally {
    isLoading.value = false
  }
}

/**
 * Kembali ke halaman utama
 */
const goBack = () => {
  modal.show = false // Pastikan modal tertutup saat navigasi
  router.push('/game')
}
</script>

<style scoped>
@import url('../assets/style.css');

.auth-container {
  width: 100%;
  min-height: 100vh;
}
/* Kartu utama Identity Check */
.card {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  background: var(--white);
  border: 5px solid var(--main);
  box-shadow: 12px 12px 0px var(--main);
  padding: 40px 30px;
  text-align: center;
}

.auth-title {
  font-size: 2.2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 30px;
  letter-spacing: -1px;
  position: relative;
  display: inline-block;
}

/* Garis bawah dekoratif di bawah judul */
.auth-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: var(--accent);
  z-index: -1;
  border: 2px solid var(--main);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Pengaturan Input */
.input-group {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 1px;
  color: var(--main);
}

input {
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Space Mono', monospace;
  border: 4px solid var(--main);
  background: var(--white);
  box-shadow: 4px 4px 0px var(--main);
  outline: none;
  transition: all 0.1s;
}

input:focus {
  background: #fff9eb;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--main);
}

input:disabled {
  background: #f1f2f6;
  opacity: 0.7;
  cursor: not-allowed;
}

/* Tombol-tombol */
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.btn-login {
  background: var(--success);
  color: var(--main);
  box-shadow: 6px 6px 0px var(--main);
}

.btn-secondary {
  background: var(--secondary);
  color: var(--main);
  box-shadow: 6px 6px 0px var(--main);
}

.btn-text {
  background: none;
  border: none;
  box-shadow: none;
  text-decoration: underline;
  color: var(--main);
  font-weight: 800;
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.2s;
}

.btn-text:hover {
  color: var(--danger);
  transform: none; /* Menghapus efek bounce global khusus tombol teks */
}

/* Efek saat Loading */
button:disabled {
  filter: grayscale(0.5);
  cursor: wait;
}

/* Responsive */
@media (max-width: 480px) {
  .card {
    padding: 30px 20px;
  }
  
  .auth-title {
    font-size: 1.8rem;
  }
}

/* --- MODAL STYLES --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Overlay gelap */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.modal-card {
  background: var(--white);
  border: 5px solid var(--main);
  box-shadow: 15px 15px 0px var(--main);
  width: 100%;
  max-width: 350px;
  animation: modal-pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modal-pop {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-header {
  padding: 10px;
  font-weight: 900;
  text-transform: uppercase;
  border-bottom: 5px solid var(--main);
  color: var(--main);
}

.modal-header.error { background: var(--danger); }
.modal-header.success { background: var(--success); }

.modal-body {
  padding: 25px;
  font-weight: 800;
}

.modal-body p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.3;
}

/* Tombol OK di modal */
.modal-body button {
  margin-bottom: 0;
  background: var(--accent);
}
</style>