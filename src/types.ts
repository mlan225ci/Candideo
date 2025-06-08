export interface Profile {
  id: string
  plan?: string | null
  username?: string | null
  full_name?: string | null
  avatar_url?: string | null
  website?: string | null
  updated_at?: string | null
}

export interface Stats {
  id: string
  user_id: string
  vues?: number | null
  candidatures?: number | null
  entretiens?: number | null
  created_at?: string | null
}

export interface Offre {
  id: string
  user_id: string
  titre: string
  localisation: string
  mission: string
  profil_recherche: string
  niveau?: string | null
  experience?: string | null
  created_at?: string | null
}

export interface Invitation {
  id: string
  user_id: string
  titre: string
  message?: string | null
  created_at?: string | null
}
