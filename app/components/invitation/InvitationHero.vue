<script setup lang="ts">
import borderFrame from '~/assets/images/border.webp'
</script>

<template>
  <div class="inv-hero">
    <div class="inv-hero__frame">
      <img
        class="inv-hero__border"
        :src="borderFrame"
        alt=""
        width="400"
        height="400"
        decoding="async"
        aria-hidden="true"
      />
      <div class="inv-hero__inner">
        <div class="inv-hero__flowers">
          <InvitationFlowers />
        </div>
        <p class="inv-hero__label">THE WEDDING OF</p>
        <h2 class="inv-hero__bride">Yatni</h2>
        <p class="inv-hero__and">and</p>
        <h2 class="inv-hero__groom">Syafri</h2>
        <div class="inv-hero__card">
          <p class="inv-hero__date">Selasa, 7 April 2026</p>
          <InvitationFlowers />
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./InvitationHero.css"></style>
