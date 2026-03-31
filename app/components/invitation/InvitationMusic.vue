<script setup lang="ts">
import { Howl } from 'howler'

const isPlaying = ref(false)
let sound: Howl | null = null
let soundReady: Promise<Howl> | null = null

const coverWasOpened = useState('invitation-cover-opened', () => false)

/** Howler memutar lewat Audio / Web Audio — tidak memicu unduhan file seperti navigasi langsung ke .mp3 */
function getSound(): Promise<Howl | null> {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (sound) return Promise.resolve(sound)
  if (!soundReady) {
    soundReady = Promise.resolve().then(() => {
      const instance = new Howl({
        src: ['/background-music.mp3'],
        loop: true,
        html5: true,
        preload: true,
        format: ['mp3'],
      })
      instance.on('play', () => {
        isPlaying.value = true
      })
      instance.on('pause', () => {
        isPlaying.value = false
      })
      instance.on('stop', () => {
        isPlaying.value = false
      })
      sound = instance
      return instance
    })
  }
  return soundReady
}

/** Otomatis putar saat undangan dibuka — interaksi pengguna, tidak diblokir browser */
watch(
  coverWasOpened,
  async (opened) => {
    if (!opened) return
    const s = await getSound()
    s?.play()
  },
  { flush: 'post' },
)

onMounted(async () => {
  if (coverWasOpened.value) {
    const s = await getSound()
    s?.play()
  }
})

onBeforeUnmount(() => {
  sound?.unload()
  sound = null
  soundReady = null
})

async function toggle() {
  const s = await getSound()
  if (!s) return
  if (s.playing()) {
    s.pause()
  } else {
    s.play()
  }
}
</script>

<template>
  <div class="inv-music">
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
