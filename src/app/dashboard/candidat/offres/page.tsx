'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function OffresPage() {
  const [offres, setOffres] = useState<any[]>([])
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchOffres() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('offres').select('*').eq('user_id', user.id)
      setOffres(data || [])
    }
    fetchOffres()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mes offres</h1>
      {offres.length === 0 ? (
        <p>Aucune offre pour le moment.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {offres.map((offre) => (
            <li key={offre.id}>{offre.titre || JSON.stringify(offre)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
