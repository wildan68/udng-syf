<script setup lang="ts">
import { IconCopy } from '@tabler/icons-vue'
import Seabank from '~/assets/images/seabank.png'
import Mandiri from '~/assets/images/mandiri.png'

const ACCOUNTS = {
  seabank: '901694575750',
  mandiri: '1390026339295',
} as const

type AccountKey = keyof typeof ACCOUNTS

const copiedKey = ref<AccountKey | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function copyAccount(key: AccountKey) {
  try {
    await navigator.clipboard.writeText(ACCOUNTS[key])
    copiedKey.value = key
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copiedKey.value = null
    }, 2000)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="inv-gift">
    <InvitationFlowers />
    <h3 class="inv-gift__title">Tanda Kasih</h3>
    <p class="inv-gift__text">
      Terima kasih telah menambah semangat kegembiraan pernikahan kami dengan kehadiran dan hadiah indah
      Anda.
    </p>
    <div class="inv-gift__cards">
      <div class="inv-gift__card">
        <div class="inv-gift__icon" aria-hidden="true">
          <img :src="Seabank" alt="Seabank" />
        </div>
        <div class="inv-gift__account-row">
          <p class="inv-gift__account">{{ ACCOUNTS.seabank }}</p>
          <button
            type="button"
            class="inv-gift__copy"
            :aria-label="copiedKey === 'seabank' ? 'Nomor tersalin' : 'Salin nomor rekening'"
            @click="copyAccount('seabank')"
          >
            <span v-if="copiedKey === 'seabank'" class="inv-gift__copy-label">Tersalin</span>
            <IconCopy v-else class="inv-gift__copy-icon" :size="18" aria-hidden="true" />
          </button>
        </div>
        <p class="inv-gift__bank">Seabank : Moh Syafri Solikhin</p>
      </div>
      <div class="inv-gift__card">
        <div class="inv-gift__icon" aria-hidden="true">
          <img :src="Mandiri" alt="Mandiri" />
        </div>
        <div class="inv-gift__account-row">
          <p class="inv-gift__account">{{ ACCOUNTS.mandiri }}</p>
          <button
            type="button"
            class="inv-gift__copy"
            :aria-label="copiedKey === 'mandiri' ? 'Nomor tersalin' : 'Salin nomor rekening'"
            @click="copyAccount('mandiri')"
          >
            <span v-if="copiedKey === 'mandiri'" class="inv-gift__copy-label">Tersalin</span>
            <IconCopy v-else class="inv-gift__copy-icon" :size="18" aria-hidden="true" />
          </button>
        </div>
        <p class="inv-gift__bank">Mandiri : Cahayatni</p>
      </div>
    </div>
    <p class="inv-gift__action">Kirim Kado</p>
    <p class="inv-gift__address">
      Anda dapat mengirim kado ke:<br />
      Ds. Tembeleng RT 13/02 Jatibarang - Brebes<br />
    </p>
    <InvitationFlowers />
  </div>
</template>

<style src="./InvitationGift.css"></style>
