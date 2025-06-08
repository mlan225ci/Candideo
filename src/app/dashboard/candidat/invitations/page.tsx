'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import type { Invitation } from '@/types'

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchInvitations() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('invitations').select('*').eq('user_id', user.id)
      setInvitations(data || [])
    }
    fetchInvitations()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mes invitations</h1>
      {invitations.length === 0 ? (
        <p>Aucune invitation reçue.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {invitations.map((inv) => (
            <li key={inv.id}>{inv.titre || JSON.stringify(inv)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
