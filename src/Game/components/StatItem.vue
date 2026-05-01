<template>
  <div class="stat-box">
    <span class="value">{{ value }}</span>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
@import url('../assets/style.css');

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.value {
  font-family: 'Space Mono', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--main);
}

.label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-top: 5px;
  color: var(--secondary);
}

@media (max-width: 768px) {
  .value {
    font-size: 2rem;
  }
}
</style>