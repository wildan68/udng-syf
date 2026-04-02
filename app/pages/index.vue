<script setup lang="ts">
import topLeftFlower from '~/assets/images/top-left-flower.png'
import bottomRightFlower from '~/assets/images/bottom-right-flower.png'
import { OPENING_FLOWER_FADE_SEC } from '~/constants/invitation-opening'

useHead({
  title: 'Undangan Pernikahan — Cahaya & Syafri',
  meta: [
    {
      name: 'description',
      content: 'Undangan Pernikahan Cahaya & Syafri — Selasa, 7 April 2026',
    },
  ],
})

const flowerEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const flowerTransition = {
  opacity: { duration: OPENING_FLOWER_FADE_SEC, ease: flowerEase },
  scale: { duration: OPENING_FLOWER_FADE_SEC, ease: flowerEase },
  x: {
    duration: 6.5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
  y: {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
  rotate: {
    duration: 7,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

const flowerTopLeftAnimate = {
  opacity: 1,
  scale: 1,
  x: [0, 11, 0, -9, 0],
  y: [0, -9, 0, 7, 0],
  rotate: [0, 2.2, 0, -1.8, 0],
}

const flowerBottomRightAnimate = {
  opacity: 1,
  scale: 1,
  x: [0, -10, 0, 12, 0],
  y: [0, 8, 0, -7, 0],
  rotate: [0, -2, 0, 2.4, 0],
}

/** Fade + slide-up saat section masuk viewport */
const sectionRevealEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
const sectionRevealTransition = {
  duration: 0.62,
  ease: sectionRevealEase,
}
const sectionRevealInitial = { opacity: 0, y: 28 }
const sectionRevealInView = { opacity: 1, y: 0 }
const sectionInViewOptions = { once: true, amount: 0.22 as const }

const coverWasOpened = useState('invitation-cover-opened', () => false)
</script>

<template>
  <div class="invitation-app">
    <div
      class="inv-page-flowers"
      :class="{ 'inv-page-flowers--content': coverWasOpened }"
      aria-hidden="true"
    >
      <Motion
        as="img"
        class="inv-page-flowers__img inv-page-flowers__img--tl"
        :src="topLeftFlower"
        alt=""
        width="200"
        height="200"
        :initial="{ opacity: 0, scale: 0.88 }"
        :animate="flowerTopLeftAnimate"
        :transition="flowerTransition"
      />
      <div class="inv-page-flowers__br-mirror">
        <Motion
          as="img"
          class="inv-page-flowers__img inv-page-flowers__img--br"
          :src="bottomRightFlower"
          alt=""
          width="200"
          height="200"
          :initial="{ opacity: 0, scale: 0.88 }"
          :animate="flowerBottomRightAnimate"
          :transition="flowerTransition"
        />
      </div>
    </div>
    <InvitationCover bride-name="Cahaya" groom-name="Syafri" />
    <main class="inv-main">
      <Motion
        as="section"
        id="opening"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationHero />
      </Motion>
      <Motion
        as="section"
        id="quotes"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationQuote />
      </Motion>
      <Motion
        as="section"
        id="mempelai"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationCouple />
      </Motion>
      <Motion
        as="section"
        id="acara"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationEvents />
      </Motion>
      <Motion
        as="section"
        id="countdown"
        class="inv-main__countdown-wrap"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationCountdown />
      </Motion>
      <Motion
        as="section"
        id="maps"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationMaps />
      </Motion>
      <Motion
        as="section"
        id="rsvp"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationRsvp />
      </Motion>
      <Motion
        as="section"
        id="gift"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationGift />
      </Motion>
      <Motion
        as="section"
        id="thanks"
        :initial="sectionRevealInitial"
        :while-in-view="sectionRevealInView"
        :transition="sectionRevealTransition"
        :in-view-options="sectionInViewOptions"
      >
        <InvitationClosing />
      </Motion>
    </main>
    <InvitationMusic />
    <InvitationNav />
  </div>
</template>

<style src="~/assets/css/pages/index.css"></style>
