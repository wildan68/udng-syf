<script setup lang="ts">
/** Akad 28 Maret 2026, 07:30 WIB */
const targetMs = new Date('2026-04-07T12:30:00+07:00').getTime()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

function tick() {
  let diff = Math.max(0, targetMs - Date.now())
  days.value = Math.floor(diff / 86400000)
  diff %= 86400000
  hours.value = Math.floor(diff / 3600000)
  diff %= 3600000
  minutes.value = Math.floor(diff / 60000)
  diff %= 60000
  seconds.value = Math.floor(diff / 1000)
}

onMounted(() => {
  tick()
  const id = setInterval(tick, 1000)
  onUnmounted(() => clearInterval(id))
})

function pad(n: number) {
  return String(n).padStart(2, '0')
}
</script>

<template>
  <div class="inv-countdown">
    <InvitationFlowers />
    <p class="inv-countdown__hint">Menuju Hari Bahagia</p>
    <div class="inv-countdown__grid">
      <div class="inv-countdown__cell">
        <ClientOnly>
          <span class="inv-countdown__num">{{ pad(days) }}</span>
          <template #fallback>
            <span class="inv-countdown__num">00</span>
          </template>
        </ClientOnly>
        <span class="inv-countdown__unit">Hari</span>
      </div>
      <div class="inv-countdown__cell">
        <ClientOnly>
          <span class="inv-countdown__num">{{ pad(hours) }}</span>
          <template #fallback>
            <span class="inv-countdown__num">00</span>
          </template>
        </ClientOnly>
        <span class="inv-countdown__unit">Jam</span>
      </div>
      <div class="inv-countdown__cell">
        <ClientOnly>
          <span class="inv-countdown__num">{{ pad(minutes) }}</span>
          <template #fallback>
            <span class="inv-countdown__num">00</span>
          </template>
        </ClientOnly>
        <span class="inv-countdown__unit">Menit</span>
      </div>
      <div class="inv-countdown__cell">
        <ClientOnly>
          <span class="inv-countdown__num">{{ pad(seconds) }}</span>
          <template #fallback>
            <span class="inv-countdown__num">00</span>
          </template>
        </ClientOnly>
        <span class="inv-countdown__unit">Detik</span>
      </div>
    </div>
    <InvitationFlowers />
  </div>
</template>

<style src="./InvitationCountdown.css"></style>
