'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'

interface Offre {
  id: string
  titre: string
  localisation: string
}

export default function ListeOffres() {
  const [offres, setOffres] = useState<Offre[]>([])
  const supabase = createBrowserClient()

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('offres')
        .select('id, titre, localisation')

      if (error) console.error('Erreur chargement offres', error)
      else if (data) setOffres(data)
    }
    load()
  }, [supabase])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">\uD83D\uDCCB Vos offres</h1>
      {offres.length === 0 ? (
        <p>Aucune offre disponible.</p>
      ) : (
        <ul className="space-y-2">
          {offres.map((o) => (
            <li key={o.id} className="border rounded-md p-4">
              <p className="font-semibold">{o.titre}</p>
              <p className="text-sm text-gray-500">{o.localisation}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
