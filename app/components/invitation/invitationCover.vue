<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import borderFrame from '~/assets/images/border.webp'
import {
  OPENING_BUTTON_ENTRANCE_DELAY_SEC,
  OPENING_BUTTON_SWAY_DELAY_SEC,
} from '~/constants/invitation-opening'

const props = withDefaults(
  defineProps<{
    brideName?: string
    groomName?: string
  }>(),
  {
    brideName: 'Yatni',
    groomName: 'Syafri',
  },
)

const route = useRoute()

const recipientName = computed(() => {
  const q = route.query.to
  const raw = Array.isArray(q) ? q[0] : q
  if (!raw) return 'Nama Tamu'
  try {
    return decodeURIComponent(String(raw))
  } catch {
    return String(raw)
  }
})

const isOpen = ref(false)
const coverWasOpened = useState('invitation-cover-opened', () => false)

function openInvitation() {
  isOpen.value = true
  coverWasOpened.value = true
}

const btnSwayEase: [number, number, number, number] = [0.45, 0, 0.55, 1]

const coverBtnTransition = {
  opacity: {
    delay: OPENING_BUTTON_ENTRANCE_DELAY_SEC,
    duration: 0.42,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
  y: {
    delay: OPENING_BUTTON_ENTRANCE_DELAY_SEC,
    duration: 0.42,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
  x: {
    delay: OPENING_BUTTON_SWAY_DELAY_SEC,
    duration: 3.4,
    repeat: Infinity,
    ease: btnSwayEase,
  },
}

const coverBtnAnimate = {
  opacity: 1,
  y: 0,
  x: 0,
}
</script>

<template>
  <div
    v-show="!isOpen"
    class="inv-cover"
    role="dialog"
    aria-modal="true"
    aria-label="Cover undangan"
  >
    <div class="inv-cover__frame">
      <img
        class="inv-cover__border"
        :src="borderFrame"
        alt=""
        width="400"
        height="400"
        decoding="async"
        fetchpriority="high"
        aria-hidden="true"
      />
      <div class="inv-cover__panel">
        <InvitationFlowers />
        <p class="inv-cover__eyebrow">The Wedding Of</p>
        <h1 class="inv-cover__couple">
          <span class="inv-cover__bride">{{ props.brideName }}</span>
          <span class="inv-cover__ampersand">&amp;</span>
          <span class="inv-cover__groom">{{ props.groomName }}</span>
        </h1>
        <div class="inv-cover__recipient">
          <p class="inv-cover__to-label">Kepada Yth;</p>
          <p class="inv-cover__to-line">Bapak/Ibu/Saudara/i</p>
          <p class="inv-cover__to-name">{{ recipientName }}</p>
        </div>
        <Motion
          as="button"
          type="button"
          class="inv-cover__btn"
          :initial="{ opacity: 0, y: 14 }"
          :animate="coverBtnAnimate"
          :transition="coverBtnTransition"
          @click="openInvitation"
        >
        Buka undangan
        </Motion>
        <InvitationFlowers />
      </div>
    </div>
  </div>
</template>

<style src="./invitationCover.css"></style>
