'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@/utils/supabase'

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

interface Shortlist {
  id: string
  titre: string
}

export default function CandidatPage() {
  const params = useParams()
  const supabase = createBrowserClient()
  const [candidat, setCandidat] = useState<Candidat | null>(null)
  const [shortlists, setShortlists] = useState<Shortlist[]>([])
  const [selected, setSelected] = useState('')
  const [message, setMessage] = useState<string | null>(null)

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
    const loadShortlists = async () => {
      const { data, error } = await supabase
        .from('shortlists')
        .select('id, titre')

      if (!error && data) setShortlists(data)
    }

    if (params.id) {
      fetchCandidat()
      loadShortlists()
    }
  }, [params.id, supabase])

  if (!candidat) {
    return <p className="p-6">Chargement...</p>
  }

  const addToShortlist = async () => {
    if (!selected) return
    if (!candidat) return
    const { error } = await supabase.from('shortlist_items').insert({
      shortlist_id: selected,
      candidat_id: candidat.id,
    })
    if (error) setMessage('Erreur lors de l\'ajout')
    else setMessage('Candidat ajouté à la shortlist')
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
      {shortlists.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Ajouter à une shortlist</label>
          <div className="flex items-center gap-2">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="rounded-md border p-2"
            >
              <option value="">Sélectionner</option>
              {shortlists.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.titre}
                </option>
              ))}
            </select>
            <button
              onClick={addToShortlist}
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Ajouter
            </button>
          </div>
          {message && <p className="text-sm text-gray-600">{message}</p>}
        </div>
      )}
    </div>
  )
}
