'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@/utils/supabase'

interface Candidat {
  id: string
  nom: string
  prenom: string
  ville: string
  genre?: string | null
  age?: number | null
  titre_professionnel: string
}

export default function CandidatsPage() {
  const supabase = createBrowserClient()
  const [candidats, setCandidats] = useState<Candidat[]>([])
  const [keyword, setKeyword] = useState('')
  const [ville, setVille] = useState('')
  const [villes, setVilles] = useState<string[]>([])
  const [genre, setGenre] = useState('')
  const [age, setAge] = useState('')
  const [sort, setSort] = useState('date')

  const fetchVilles = async () => {
    const { data, error } = await supabase
      .from('candidats')
      .select('ville', { distinct: true })
      .order('ville', { ascending: true })

    if (error) console.error('Erreur chargement villes', error)
    else if (data) setVilles(data.map((v) => v.ville).filter(Boolean))
  }

  const fetchCandidats = async () => {
    let query = supabase
      .from('candidats')
      .select('id, nom, prenom, ville, genre, age, titre_professionnel')

    if (keyword) {
      query = query.or(
        `nom.ilike.%${keyword}%,prenom.ilike.%${keyword}%,titre_professionnel.ilike.%${keyword}%`,
      )
    }
    if (ville) query = query.eq('ville', ville)
    if (genre) query = query.eq('genre', genre)
    if (age) query = query.eq('age', Number(age))

    if (sort === 'experience')
      query = query.order('experience', { ascending: false })
    else query = query.order('created_at', { ascending: false })

    const { data, error } = await query
    if (error) console.error('Erreur chargement candidats', error)
    else setCandidats(data || [])
  }

  useEffect(() => {
    fetchCandidats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, ville, genre, age, sort])

  useEffect(() => {
    fetchVilles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Tous les candidats</h1>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-5">
        <input
          type="text"
          placeholder="Mot-clé"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <select
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">Ville</option>
          {villes.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">Genre</option>
          <option value="M">Homme</option>
          <option value="F">Femme</option>
        </select>
        <input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="date">Par date</option>
          <option value="experience">Par expérience</option>
        </select>
      </div>
      <p className="mb-4">
        {candidats.length} résultat{candidats.length > 1 ? 's' : ''}
      </p>
      {candidats.length === 0 ? (
        <p>Aucun candidat trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {candidats.map((candidat) => (
            <div
              key={candidat.id}
              className="rounded-md border bg-white p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {candidat.prenom} {candidat.nom}
              </h2>
              <p className="text-gray-600">{candidat.titre_professionnel}</p>
              <p className="text-sm text-gray-500">📍 {candidat.ville}</p>
              <Link
                href={`/candidats/${candidat.id}`}
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                Voir la fiche →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
