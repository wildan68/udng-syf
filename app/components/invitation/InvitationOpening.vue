<script setup lang="ts">
defineProps<{
  guestName: string
}>()

const isOpen = ref(false)

function openInvitation() {
  isOpen.value = true
}
</script>

<template>
  <div
    v-show="!isOpen"
    class="inv-opening"
    role="dialog"
    aria-modal="true"
    aria-label="Buka undangan"
  >
    <div class="inv-opening__panel">
      <InvitationFlowers />
      <p class="inv-opening__eyebrow">The Wedding Of</p>
      <h1 class="inv-opening__names">Yatni <span class="inv-opening__and">&amp;</span> Syafri</h1>
      <p class="inv-opening__to-label">Kepada Yth;</p>
      <p class="inv-opening__to-line">Bapak/Ibu/Saudara/i</p>
      <p class="inv-opening__guest">{{ guestName }}</p>
      <button type="button" class="inv-opening__btn" @click="openInvitation">
        Open Invitation
      </button>
      <InvitationFlowers />
    </div>
  </div>
</template>

<style src="./InvitationOpening.css"></style>
