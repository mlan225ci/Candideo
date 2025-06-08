'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function CandidatDashboard() {
  const [email, setEmail] = useState<string | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setEmail(user?.email ?? null)
    }
    fetchUser()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Bienvenue{email ? `, ${email}` : ''} !
      </h1>
      <nav className="flex gap-4">
        <Link href="/dashboard/candidat/profil" className="text-blue-600 hover:underline">
          Profil
        </Link>
        <Link href="/dashboard/candidat/offres" className="text-blue-600 hover:underline">
          Offres
        </Link>
        <Link href="/dashboard/candidat/stats" className="text-blue-600 hover:underline">
          Stats
        </Link>
        <Link href="/dashboard/candidat/invitations" className="text-blue-600 hover:underline">
          Invitations
        </Link>
      </nav>
    </div>
  )
}
