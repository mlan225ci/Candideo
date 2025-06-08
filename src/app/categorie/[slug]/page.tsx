'use client';

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'

interface Candidat {
  id: string
  nom: string
  prenom: string
  ville: string
  titre_professionnel: string
  pretention_salariale?: number | null
  tags?: string[] | null
  ecole_excellence?: boolean | null
  diplome?: string | null
  annees_experience?: number | null
  bilingue?: boolean | null
  a_etudie_etranger?: boolean | null
}

export default function CategoriePage() {
  const params = useParams()
  const supabase = createBrowserClient()
  const [candidats, setCandidats] = useState<Candidat[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const slug = params.slug as string | undefined
    if (!slug) return
    async function fetchCandidats() {
      const { data, error } = await supabase
        .from('candidats')
        .select('id, nom, prenom, ville, titre_professionnel')
        .eq('categorie', slug)

      if (error) {
        console.error('Erreur chargement candidats', error)
        setError('Impossible de charger les candidats')
      } else setCandidats(data || [])
    }
    fetchCandidats()
  }, [params.slug, supabase])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Candidats - {params.slug}</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {candidats.length === 0 && !error ? (
        <p>Aucun candidat trouvé pour cette catégorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidats.map((candidat) => (
            <div key={candidat.id} className="border bg-white rounded-md p-4 shadow-sm">
              <h2 className="text-xl font-semibold">
                {candidat.prenom} {candidat.nom}
              </h2>
              <p className="text-gray-600">{candidat.titre_professionnel}</p>
              <p className="text-sm text-gray-500">📍 {candidat.ville}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
