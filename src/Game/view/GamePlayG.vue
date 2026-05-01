<template>
  <div class="game-container">
    <div class="centered-container">
      <section class="card">
        <div class="stats">
          <span>SCORE: <b>{{ score }}</b></span>
          <div class="lives-container">
            LIVES: <b v-for="n in 3" :key="n" :class="{ 'heart-lost': n > lives }">❤</b>
          </div>
          <span class="lvl-badge">{{ difficulty }}</span>
        </div>
        
        <div id="timer-bar">
          <div 
            id="timer-progress" 
            :style="{ width: timerWidth + '%', backgroundColor: timerColor }"
          ></div>
        </div>
        
        <div class="question-container">
          <p v-if="!feedbackText">LANJUTKAN POLA ANGKA INI:</p>
          <h1 :style="{ color: feedbackColor }" class="pattern-text">
            {{ feedbackText || questionText }}
          </h1>
        </div>

        <form v-if="!feedbackText" @submit.prevent="submitAnswer">
          <input 
            v-model="userAnswer" 
            type="number" 
            inputmode="numeric" 
            placeholder="?" 
            required 
            ref="answerInput"
            :disabled="isSubmitting"
          >
          <button type="submit" :disabled="isSubmitting" class="btn-main">
            {{ isSubmitting ? 'MENGECEK...' : 'KIRIM JAWABAN' }}
          </button>
        </form>

        <button @click="showExitModal" class="btn-text exit-link">BERHENTI BERMAIN</button>
      </section>
    </div>

    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="modal.show" class="modal-overlay">
          <div class="modal-card">
            <div class="modal-header" :class="modal.type">
              {{ modal.title }}
            </div>
            <div class="modal-body">
              <p>{{ modal.message }}</p>
              
              <div v-if="modal.isConfirm" class="btn-group-row">
                <button @click="exitGame" class="btn-danger">YA, KELUAR</button>
                <button @click="modal.show = false" class="btn-secondary">LANJUT</button>
              </div>
              <button v-else @click="closeModal" class="btn-main">OK!</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- State Game ---
const score = ref(0)
const lives = ref(3)
const difficulty = ref('EASY')
const questionText = ref('...')
const userAnswer = ref('')
const isSubmitting = ref(false)

// --- Modal State ---
const modal = reactive({
  show: false,
  title: '',
  message: '',
  type: 'error',
  isConfirm: false
})

// --- UI Logic State ---
const feedbackText = ref('')
const feedbackColor = ref('')
const timerWidth = ref(100)
const timerColor = ref('#55efc4')
const answerInput = ref(null)
let timerInterval = null

// --- Methods ---

const openModal = (title, msg, type = 'error', confirm = false) => {
  modal.title = title
  modal.message = msg
  modal.type = type
  modal.isConfirm = confirm
  modal.show = true
}

const showExitModal = () => {
  openModal('KONFIRMASI', 'Yakin ingin berhenti? Skor kamu tidak akan tersimpan secara maksimal.', 'error', true)
}

const exitGame = () => {
  modal.show = false
  router.push('/game')
}

/**
 * Mengambil soal baru dari backend Express
 */
const loadQuestion = async () => {
  // Reset UI State
  feedbackText.value = ''
  feedbackColor.value = ''
  userAnswer.value = ''
  timerWidth.value = 100
  timerColor.value = '#55efc4'
  isSubmitting.value = false
  
  try {
    const res = await fetch('https://lemon-expo-backend.vercel.app/api/game/question', { 
      credentials: 'include' // Penting untuk session
    })
    
    // Jika tidak diizinkan (session habis), lempar ke halaman auth
    if (res.status === 401) return router.push('/auth')
    
    const data = await res.json()
    
    if (data.status === 'success') {
      questionText.value = data.question.join(', ') + ', ?'
      difficulty.value = data.difficulty.toUpperCase()
      startTimer()
      // Auto-focus ke input jawaban
      nextTick(() => { if (answerInput.value) answerInput.value.focus() })
    } else {
      router.push('/game/auth')
    }
  } catch (err) {
    console.error("Gagal memuat soal dari Express:", err)
  }
}

/**
 * Logika Timer 10 detik
 */
const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  let timeLeft = 10
  timerInterval = setInterval(() => {
    timeLeft -= 0.1
    timerWidth.value = (timeLeft / 10) * 100
    
    if (timeLeft < 3) timerColor.value = '#ff7675' // Berubah merah saat kritis
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      handleTimeout()
    }
  }, 100)
}

const handleTimeout = () => {
  userAnswer.value = -999 // Kode dummy untuk jawaban kosong/habis waktu
  submitAnswer()
}

/**
 * Mengirim jawaban ke backend Express
 */
const submitAnswer = async () => {
  // Cegah double submit atau submit saat feedback masih muncul
  if (isSubmitting.value) return
  isSubmitting.value = true
  
  if (timerInterval) clearInterval(timerInterval)
  
  try {
    const res = await fetch('https://lemon-expo-backend.vercel.app/api/game/submit', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        answer: parseInt(userAnswer.value) 
      })
    })
    
    const data = await res.json()
    handleResult(data)
  } catch (err) {
    console.error("Error submitting answer:", err)
    isSubmitting.value = false
  }
}

/**
 * Menampilkan hasil jawaban (Benar/Salah) dan update state
 */
const handleResult = (data) => {
  // Sync state dengan data terbaru dari database (via Express)
  score.value = data.current_score ?? score.value
  lives.value = data.lives_left ?? lives.value
  
  if (data.difficulty) difficulty.value = data.difficulty.toUpperCase()
  
  if (data.is_correct) {
    feedbackText.value = "MANTAP!"
    feedbackColor.value = '#55efc4' // Success color
  } else {
    feedbackText.value = userAnswer.value === -999 
      ? 'WAKTU HABIS!' 
      : `SALAH! JAWABAN: ${data.correct_answer}`
    feedbackColor.value = '#ff7675' // Danger color
  }

  // Cek apakah game berakhir
  if (data.game_over || lives.value <= 0) {
    setTimeout(() => {
      router.push('/game/leaderboard')
    }, 1500)
  } else {
    // Tunggu 1.5 detik agar user bisa melihat feedback sebelum soal baru muncul
    setTimeout(loadQuestion, 1500)
  }
}

// Lifecycle Hooks
onMounted(() => { 
  loadQuestion() 
})

onUnmounted(() => { 
  if (timerInterval) clearInterval(timerInterval) 
})
</script>

<style scoped>
@import url('../assets/style.css');

/* Kontainer utama kartu game */
.card {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background: var(--white);
  border: 5px solid var(--main);
  box-shadow: 12px 12px 0px var(--main);
  padding: 25px;
  position: relative;
}

/* --- STATS BAR (Score, Lives, Level) --- */
.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--main);
  color: var(--white);
  padding: 12px 20px;
  font-weight: 900;
  margin-bottom: 20px;
  border: 3px solid var(--main);
  box-shadow: 4px 4px 0px var(--secondary);
}

.lives-container {
  display: flex;
  gap: 5px;
  align-items: center;
}

.lives-container b {
  color: var(--danger);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
}

.heart-lost {
  opacity: 0.2;
  filter: grayscale(1);
  transform: scale(0.8);
}

.lvl-badge {
  background: var(--accent);
  color: var(--main);
  padding: 4px 12px;
  font-size: 0.8rem;
  border: 2px solid var(--main);
}

/* --- TIMER BAR --- */
#timer-bar {
  width: 100%;
  height: 25px;
  background: var(--white);
  border: 4px solid var(--main);
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
}

#timer-progress {
  height: 100%;
  transition: width 0.1s linear, background-color 0.3s ease;
  border-right: 4px solid var(--main);
}

/* --- QUESTION AREA --- */
.question-container {
  background: #f1f2f6;
  border: 4px solid var(--main);
  padding: 30px 20px;
  margin-bottom: 25px;
  text-align: center;
  min-height: 160px; /* Menjaga layout stabil saat feedback muncul */
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: inset 6px 6px 0px rgba(0,0,0,0.05);
}

.question-container p {
  margin-bottom: 10px;
  font-weight: 800;
  color: var(--main);
  opacity: 0.7;
  font-size: 0.9rem;
}

.pattern-text {
  font-size: 2.8rem;
  margin: 0;
  letter-spacing: -1px;
  font-family: 'Space Mono', monospace;
  word-break: break-all;
  line-height: 1.2;
}

/* --- FORM INPUT --- */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input[type="number"] {
  width: 100%;
  padding: 20px;
  font-size: 2rem;
  text-align: center;
  border: 4px solid var(--main);
  background: var(--white);
  font-family: 'Space Mono', monospace;
  font-weight: 900;
  box-shadow: 6px 6px 0px var(--main);
  outline: none;
}

input:focus {
  background: #fffdeb;
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px var(--main);
}

button[type="submit"] {
  background: var(--success);
  color: var(--main);
  padding: 18px;
  font-size: 1.2rem;
  box-shadow: 6px 6px 0px var(--main);
}

/* --- EXIT LINK --- */
.exit-link {
  display: block;
  margin: 20px auto 0;
  font-weight: 800;
  opacity: 0.6;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.exit-link:hover {
  opacity: 1;
  color: var(--danger);
}

/* --- RESPONSIVE --- */
@media (max-width: 480px) {
  .card {
    padding: 15px;
    box-shadow: 8px 8px 0px var(--main);
  }

  .pattern-text {
    font-size: 2rem;
  }
  
  input[type="number"] {
    font-size: 1.5rem;
    padding: 15px;
  }
}










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