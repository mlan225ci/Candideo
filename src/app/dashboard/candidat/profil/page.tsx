'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import type { Profile } from '@/types'

export default function ProfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    }
    fetchProfile()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mon profil</h1>
      {profile ? <pre>{JSON.stringify(profile, null, 2)}</pre> : <p>Chargement...</p>}
    </div>
  )
}
