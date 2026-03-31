<script setup lang="ts">
const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

function toggle() {
  const el = audioRef.value
  if (!el) return
  if (isPlaying.value) {
    el.pause()
    isPlaying.value = false
  } else {
    el.play().catch(() => {
      /* file opsional: /wedding-music.mp3 di folder public */
    })
    isPlaying.value = true
  }
}

function onEnded() {
  isPlaying.value = false
}
</script>

<template>
  <div class="inv-music">
    <audio
      ref="audioRef"
      class="inv-music__audio"
      src="/wedding-music.mp3"
      loop
      preload="none"
      @pause="onPause"
    />
    <button
      type="button"
      class="inv-music__btn"
      :aria-label="isPlaying ? 'Jeda musik' : 'Putar musik'"
      :title="isPlaying ? 'Jeda' : 'Musik'"
      @click="toggle"
    >
      <span v-if="!isPlaying" class="inv-music__icon">♪</span>
      <span v-else class="inv-music__icon">❚❚</span>
    </button>
    <span class="inv-music__hint">Musik latar</span>
  </div>
</template>

<style src="./InvitationMusic.css"></style>
