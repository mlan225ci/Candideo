'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@/utils/supabase'

interface Shortlist {
  id: string
  titre: string
}

export default function ListeShortlists() {
  const [shortlists, setShortlists] = useState<Shortlist[]>([])
  const supabase = createBrowserClient()

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('shortlists')
        .select('id, titre')

      if (error) console.error('Erreur chargement shortlists', error)
      else if (data) setShortlists(data)
    }
    load()
  }, [supabase])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">\u2B50 Vos shortlists</h1>
      {shortlists.length === 0 ? (
        <p>Aucune shortlist enregistrée.</p>
      ) : (
        <ul className="space-y-2">
          {shortlists.map((s) => (
            <li key={s.id} className="border rounded-md p-4">
              <Link href={`/dashboard/recruteur/shortlists/${s.id}`} className="font-semibold text-blue-600 hover:underline">
                {s.titre}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
