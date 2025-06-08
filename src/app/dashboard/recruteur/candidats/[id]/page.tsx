'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

interface Candidat {
  id: string
  nom: string
  prenom: string
  ville: string
  titre_professionnel: string
  email?: string | null
  telephone?: string | null
  linkedin?: string | null
}

export default function CandidatPage() {
  const params = useParams()
  const supabase = createBrowserClient()
  const [candidat, setCandidat] = useState<Candidat | null>(null)

  useEffect(() => {
    const fetchCandidat = async () => {
      const { data, error } = await supabase
        .from('candidats')
        .select(
          'id, nom, prenom, ville, titre_professionnel, email, telephone, linkedin',
        )
        .eq('id', params.id as string)
        .single()

      if (error) console.error('Erreur chargement candidat', error)
      else setCandidat(data)
    }

    if (params.id) {
      fetchCandidat()
    }
  }, [params.id, supabase])

  if (!candidat) {
    return <p className="p-6">Chargement...</p>
  }

  return (
    <div className="p-6 space-y-4">
      <Link href="/dashboard/recruteur/candidats" className="text-blue-600 hover:underline">
        &larr; Retour à la liste
      </Link>

      <div>
        <h1 className="text-2xl font-bold">
          {candidat.prenom} {candidat.nom}
        </h1>
        <p className="text-gray-600">{candidat.titre_professionnel}</p>
        <p className="text-sm text-gray-500">📍 {candidat.ville}</p>
      </div>

      <div className="space-y-2">
        {candidat.email && (
          <a href={`mailto:${candidat.email}`} className="text-blue-600 hover:underline block">
            Contacter par email
          </a>
        )}
        {candidat.telephone && (
          <a href={`tel:${candidat.telephone}`} className="text-blue-600 hover:underline block">
            Appeler
          </a>
        )}
        {candidat.linkedin && (
          <a
            href={candidat.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline block"
          >
            Profil LinkedIn
          </a>
        )}
      </div>
    </div>
  )
}
