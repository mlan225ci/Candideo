'use client';

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { Button } from './ui/button'

export interface Filters {
  keyword: string
  ville: string
  categorie: string
  ecole_excellence: boolean
  genre: string
  age: string
  diplome: string
  annees_experience: string
  bilingue: boolean
  a_etudie_etranger: boolean
}

export default function CandidateFilters({
  onSearch,
}: {
  onSearch: (filters: Filters) => void
}) {
  const supabase = createBrowserClient()
  const [villes, setVilles] = useState<string[]>([])
  const [categories, setCategories] = useState<
    { id: string; slug: string; nom: string }[]
  >([])
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    ville: '',
    categorie: '',
    ecole_excellence: false,
    genre: '',
    age: '',
    diplome: '',
    annees_experience: '',
    bilingue: false,
    a_etudie_etranger: false,
  })

  useEffect(() => {
    const load = async () => {
      const { data: villesData } = await supabase
        .from('candidats')
        .select('ville', { distinct: true })
        .order('ville')
      if (villesData)
        setVilles(villesData.map((v: any) => v.ville).filter(Boolean))
      const { data: catData } = await supabase
        .from('categories')
        .select('id, nom, slug')
      if (catData) setCategories(catData)
    }
    load()
  }, [supabase])

  const update = (key: keyof Filters, value: any) =>
    setFilters((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Mot-clé"
        value={filters.keyword}
        onChange={(e) => update('keyword', e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <select
        value={filters.ville}
        onChange={(e) => update('ville', e.target.value)}
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
        value={filters.categorie}
        onChange={(e) => update('categorie', e.target.value)}
        className="w-full rounded border px-3 py-2"
      >
        <option value="">Catégorie</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.nom}
          </option>
        ))}
      </select>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={filters.ecole_excellence}
          onChange={(e) => update('ecole_excellence', e.target.checked)}
        />
        <span>École d’excellence</span>
      </label>
      <select
        value={filters.genre}
        onChange={(e) => update('genre', e.target.value)}
        className="w-full rounded border px-3 py-2"
      >
        <option value="">Genre</option>
        <option value="M">Homme</option>
        <option value="F">Femme</option>
      </select>
      <input
        type="number"
        placeholder="Âge"
        value={filters.age}
        onChange={(e) => update('age', e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <input
        type="text"
        placeholder="Diplôme"
        value={filters.diplome}
        onChange={(e) => update('diplome', e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <input
        type="number"
        placeholder="Années d’expérience"
        value={filters.annees_experience}
        onChange={(e) => update('annees_experience', e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={filters.bilingue}
          onChange={(e) => update('bilingue', e.target.checked)}
        />
        <span>Bilingue</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={filters.a_etudie_etranger}
          onChange={(e) => update('a_etudie_etranger', e.target.checked)}
        />
        <span>A étudié à l’étranger</span>
      </label>
      <Button className="w-full" onClick={() => onSearch(filters)}>
        Lancer la recherche
      </Button>
    </div>
  )
}
