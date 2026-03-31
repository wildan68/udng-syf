<template>
  <div class="inv-rsvp">
    <InvitationFlowers />
    <h3 class="inv-rsvp__title">Do'a Untuk Pengantin</h3>
    <blockquote class="inv-rsvp__quote">
      "Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu susah, dan mengumpulkan kalian
      berdua dalam kebaikan"
    </blockquote>
    <p class="inv-rsvp__cite">[HR. Abu Daud]</p>
    <p class="inv-rsvp__hint">
      Tekan tombol dibawah ini untuk mengirim ucapan dan konfirmasi kehadiran
    </p>
    <button type="button" class="inv-rsvp__btn" @click="showForm = !showForm">
      Konfirmasi &amp; Kirim Ucapan
    </button>
    <p v-if="configError" class="inv-rsvp__err">
      Konfigurasi Supabase belum lengkap (SUPABASE_URL / SUPABASE_KEY).
    </p>
    <form v-show="showForm" class="inv-rsvp__form" @submit.prevent="onSubmit">
      <label class="inv-rsvp__field">
        <span>Nama</span>
        <input v-model="form.name" type="text" name="name" autocomplete="name" />
      </label>
      <label class="inv-rsvp__field">
        <span>Ucapan</span>
        <textarea v-model="form.message" name="message" rows="3" />
      </label>
      <label class="inv-rsvp__field">
        <span>Konfirmasi kehadiran</span>
        <select v-model="form.attendance" name="attendance">
          <option value="">Pilih</option>
          <option value="hadir">Hadir</option>
          <option value="tidak">Tidak dapat hadir</option>
        </select>
      </label>
      <p v-if="submitError" class="inv-rsvp__err">{{ submitError }}</p>
      <button type="submit" class="inv-rsvp__submit" :disabled="submitting">
        {{ submitting ? 'Mengirim…' : 'Kirim' }}
      </button>
    </form>

    <section v-if="messages.length" class="inv-rsvp__wall" aria-label="Ucapan tamu">
      <h4 class="inv-rsvp__wall-title">Ucapan</h4>
      <ul class="inv-rsvp__list">
        <li v-for="m in messages" :key="m.id" class="inv-rsvp__item">
          <p class="inv-rsvp__item-meta">
            <strong>{{ m.name }}</strong>
            <span class="inv-rsvp__badge" :data-a="m.attendance">{{ attendanceLabel(m.attendance) }}</span>
            <span class="inv-rsvp__date">{{ formatDate(m.created_at) }}</span>
          </p>
          <p class="inv-rsvp__item-text">{{ m.message }}</p>
        </li>
      </ul>
    </section>
    <p v-else-if="loadError" class="inv-rsvp__err">{{ loadError }}</p>
    <p v-else-if="loaded && !messages.length" class="inv-rsvp__empty">Belum ada ucapan. Jadilah yang pertama.</p>

    <InvitationFlowers />
  </div>
</template>

<script setup lang="ts">
import {
  INVITATION_RSVP_KEY,
  INVITATION_RSVP_TABLE,
  type AttendanceValue,
  type InvitationRsvpRow,
} from '~/constants/invitation-rsvp'

const showForm = ref(false)
const route = useRoute()
const invitedName = computed(() => {
  const q = route.query.to
  const raw = Array.isArray(q) ? q[0] : q
  if (!raw) return ''
  try {
    return decodeURIComponent(String(raw))
  } catch {
    return String(raw)
  }
})
const form = reactive({
  name: invitedName.value,
  message: '',
  attendance: '' as '' | AttendanceValue,
})

const supabase = useSupabase()
const configError = computed(() => !supabase)

const messages = ref<InvitationRsvpRow[]>([])
const loaded = ref(false)
const loadError = ref('')
const submitting = ref(false)
const submitError = ref('')

function attendanceLabel(a: AttendanceValue): string {
  return a === 'hadir' ? 'Hadir' : 'Tidak hadir'
}

/** Contoh: "5 jam yang lalu", "Baru saja", "3 hari yang lalu" */
function formatDate(iso: string): string {
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return ''
  const diffSec = Math.max(0, Math.floor((Date.now() - t) / 1000))
  if (diffSec < 45) return 'Baru saja'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) {
    return diffMin === 1 ? '1 menit yang lalu' : `${diffMin} menit yang lalu`
  }
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) {
    return diffHr === 1 ? '1 jam yang lalu' : `${diffHr} jam yang lalu`
  }
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) {
    return diffDay === 1 ? '1 hari yang lalu' : `${diffDay} hari yang lalu`
  }
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

async function loadMessages() {
  if (!supabase) {
    loaded.value = true
    return
  }
  loadError.value = ''
  const { data, error } = await supabase
    .from(INVITATION_RSVP_TABLE)
    .select('*')
    .eq('invitation_key', INVITATION_RSVP_KEY)
    .order('created_at', { ascending: false })
    .limit(50)

  loaded.value = true
  if (error) {
    loadError.value = error.message
    return
  }
  messages.value = (data ?? []) as InvitationRsvpRow[]
}

onMounted(() => {
  void loadMessages()
})

async function onSubmit() {
  submitError.value = ''
  if (!supabase) {
    submitError.value = 'Supabase tidak tersedia.'
    return
  }
  const name = form.name.trim()
  const message = form.message.trim()
  if (!name || !message) {
    submitError.value = 'Nama dan ucapan wajib diisi.'
    return
  }
  if (form.attendance !== 'hadir' && form.attendance !== 'tidak') {
    submitError.value = 'Pilih konfirmasi kehadiran.'
    return
  }

  submitting.value = true
  const { data, error } = await supabase
    .from(INVITATION_RSVP_TABLE)
    .insert({
      invitation_key: INVITATION_RSVP_KEY,
      name,
      message,
      attendance: form.attendance,
    })
    .select()
    .single()

  submitting.value = false
  if (error) {
    submitError.value = error.message
    return
  }

  if (data) {
    messages.value.unshift(data as InvitationRsvpRow)
  }
  form.name = ''
  form.message = ''
  form.attendance = ''
  showForm.value = false
}
</script>

<style src="./InvitationRsvp.css"></style>
