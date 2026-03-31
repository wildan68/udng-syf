/** Kunci undangan — semua baris RSVp/ucapan untuk site ini memakai nilai ini */
export const INVITATION_RSVP_KEY = 'syafri'

export const INVITATION_RSVP_TABLE = 'invitation_rsvp' as const

export type AttendanceValue = 'hadir' | 'tidak'

export interface InvitationRsvpRow {
  id: string
  invitation_key: string
  name: string
  message: string
  attendance: AttendanceValue
  created_at: string
}
