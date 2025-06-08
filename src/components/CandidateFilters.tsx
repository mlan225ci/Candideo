'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'

export interface Filters {
  keyword?: string
  ville?: string
  categorie?: string
  ecole_excellence?: boolean
  genre?: string
  age?: string
  diplome?: string
  annees_experience?: string
  bilingue?: boolean
  a_etudie_etranger?: boolean
  sort?: string
}

interface CandidateFiltersProps {
  onSearch: (filters: Filters) => void
}

export default function CandidateFilters({ onSearch }: CandidateFiltersProps) {
  const supabase = createBrowserClient()
  const [keyword, setKeyword] = useState('')
  const [ville, setVille] = useState('')
  const [villes, setVilles] = useState<string[]>([])
  const [categorie, setCategorie] = useState('')
  const [categories, setCategories] = useState<{ id: string; nom: string }[]>([])
  const [ecoleExcellence, setEcoleExcellence] = useState(false)
  const [genre, setGenre] = useState('')
  const [age, setAge] = useState('')
  const [diplome, setDiplome] = useState('')
  const [anneesExperience, setAnneesExperience] = useState('')
  const [bilingue, setBilingue] = useState(false)
  const [etudieEtranger, setEtudieEtranger] = useState(false)
  const [sort, setSort] = useState('date')

  useEffect(() => {
    const load = async () => {
      const { data: villesData } = await supabase
        .from('candidats')
        .select('ville', { distinct: true })
        .order('ville', { ascending: true })
      if (villesData) setVilles(villesData.map((v) => v.ville).filter(Boolean))

      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, nom')
        .order('nom', { ascending: true })
      if (categoriesData) setCategories(categoriesData)
    }
    load()
  }, [supabase])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({
      keyword: keyword || undefined,
      ville: ville || undefined,
      categorie: categorie || undefined,
      ecole_excellence: ecoleExcellence || undefined,
      genre: genre || undefined,
      age: age || undefined,
      diplome: diplome || undefined,
      annees_experience: anneesExperience || undefined,
      bilingue: bilingue || undefined,
      a_etudie_etranger: etudieEtranger || undefined,
      sort,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Mot-clé"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <select
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        className="w-full rounded border px-3 py-2"
      >
        <option value="">Ville</option>
        {villes.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <select
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        className="w-full rounded border px-3 py-2"
      >
        <option value="">Catégorie</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nom}
          </option>
        ))}
      </select>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={ecoleExcellence}
          onChange={(e) => setEcoleExcellence(e.target.checked)}
        />
        École d’excellence
      </label>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-full rounded border px-3 py-2"
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
        className="w-full rounded border px-3 py-2"
      />
      <input
        type="text"
        placeholder="Diplôme"
        value={diplome}
        onChange={(e) => setDiplome(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <input
        type="number"
        placeholder="Années d'expérience"
        value={anneesExperience}
        onChange={(e) => setAnneesExperience(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={bilingue}
          onChange={(e) => setBilingue(e.target.checked)}
        />
        Bilingue
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={etudieEtranger}
          onChange={(e) => setEtudieEtranger(e.target.checked)}
        />
        A étudié à l'étranger
      </label>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full rounded border px-3 py-2"
      >
        <option value="date">Par date</option>
        <option value="experience">Par expérience</option>
      </select>
      <button
        type="submit"
        className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
      >
        Filtrer
      </button>
    </form>
  )
}
