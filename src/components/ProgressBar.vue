<script setup lang="ts">
defineProps<{ current: number; total: number }>()
</script>

<template>
  <div class="progress">
    <div class="progress__track">
      <div class="progress__value" :style="{ width: `${total ? (current / total) * 100 : 0}%` }" />
    </div>
    <span class="progress__text">Step {{ current }} of {{ total }}</span>
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  align-items: center;
  gap: 14px;
}

.progress__track {
  height: 6px;
  flex: 1;
  background: #eef0f4;
  border-radius: 99px;
  overflow: hidden;
}

.progress__value {
  height: 100%;
  background: var(--primary);
  border-radius: inherit;
  transition: width .25s ease;
}

.progress__text {
  white-space: nowrap;
  color: var(--muted);
  font-size: 11px;
}
</style>
