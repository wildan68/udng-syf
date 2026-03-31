<script setup lang="ts">
import type { Component } from 'vue'
import type { Swiper } from 'swiper'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Swiper as SwiperRoot, SwiperSlide } from 'swiper/vue'
import {
  IconCalendarEvent,
  IconGift,
  IconHeartHandshake,
  IconHome2,
  IconMail,
  IconMapPin,
  IconQuote,
  IconUsers,
} from '@tabler/icons-vue'
import 'swiper/css'

const items: { id: string; label: string; icon: Component }[] = [
  { id: 'opening', label: 'Opening', icon: IconHome2 },
  { id: 'quotes', label: 'Quotes', icon: IconQuote },
  { id: 'mempelai', label: 'Mempelai', icon: IconUsers },
  { id: 'acara', label: 'Acara', icon: IconCalendarEvent },
  { id: 'maps', label: 'Maps', icon: IconMapPin },
  { id: 'rsvp', label: 'RSVP', icon: IconMail },
  { id: 'gift', label: 'Gift', icon: IconGift },
  { id: 'thanks', label: 'Thanks', icon: IconHeartHandshake },
]

const firstSectionId = items[0]?.id ?? 'opening'
const activeId = ref(firstSectionId)
const swiperRef = ref<Swiper | null>(null)

function alignSwiperToActive(speed: number) {
  const sw = swiperRef.value
  if (!sw) return
  const idx = items.findIndex((i) => i.id === activeId.value)
  if (idx < 0) return
  sw.slideTo(idx, speed)
}

function onSwiperInit(instance: Swiper) {
  swiperRef.value = instance
  alignSwiperToActive(0)
}

function updateActiveFromScroll() {
  if (typeof document === 'undefined') return
  const marker = Math.min(window.innerHeight * 0.22, 180)
  let active = firstSectionId
  for (const item of items) {
    const el = document.getElementById(item.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) {
      active = item.id
    }
  }
  activeId.value = active
}

let rafId = 0
function onWindowScroll() {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    updateActiveFromScroll()
  })
}

function scrollToId(id: string) {
  activeId.value = id
  if (typeof document === 'undefined') return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(activeId, () => {
  nextTick(() => alignSwiperToActive(400))
})

onMounted(() => {
  updateActiveFromScroll()
  window.addEventListener('scroll', onWindowScroll, { passive: true })
  window.addEventListener('resize', onWindowScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onWindowScroll)
  window.removeEventListener('resize', onWindowScroll)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <nav class="inv-nav" aria-label="Navigasi undangan">
    <ClientOnly>
      <SwiperRoot
        class="inv-nav__swiper"
        :slides-per-view="5"
        :space-between="6"
        :centered-slides="true"
        :centered-slides-bounds="true"
        :speed="400"
        :observer="true"
        :observe-parents="true"
        :resize-observer="true"
        :round-lengths="true"
        @swiper="onSwiperInit"
      >
        <SwiperSlide v-for="item in items" :key="item.id" class="inv-nav__slide">
          <button
            type="button"
            class="inv-nav__item"
            :class="{ 'inv-nav__item--active': activeId === item.id }"
            :aria-current="activeId === item.id ? 'true' : undefined"
            @click="scrollToId(item.id)"
          >
            <component
              :is="item.icon"
              class="inv-nav__icon"
              :size="20"
              :stroke="activeId === item.id ? 2 : 1.5"
              aria-hidden="true"
            />
            <span class="inv-nav__label">{{ item.label }}</span>
          </button>
        </SwiperSlide>
      </SwiperRoot>
      <template #fallback>
        <div class="inv-nav__static" role="presentation">
          <button
            v-for="item in items"
            :key="`fb-${item.id}`"
            type="button"
            class="inv-nav__item"
            :class="{ 'inv-nav__item--active': activeId === item.id }"
            :aria-current="activeId === item.id ? 'true' : undefined"
            @click="scrollToId(item.id)"
          >
            <component
              :is="item.icon"
              class="inv-nav__icon"
              :size="20"
              :stroke="activeId === item.id ? 2 : 1.5"
              aria-hidden="true"
            />
            <span class="inv-nav__label">{{ item.label }}</span>
          </button>
        </div>
      </template>
    </ClientOnly>
  </nav>
</template>

<style src="./InvitationNav.css"></style>
