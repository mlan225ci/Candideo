"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'

export default function NouvelleOffre() {
  const supabase = createBrowserClient()
  const router = useRouter()
  const [poste, setPoste] = useState('')
  const [ville, setVille] = useState('')
  const [mission, setMission] = useState('')
  const [profil, setProfil] = useState('')
  const [niveau, setNiveau] = useState('')
  const [experience, setExperience] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      setError('Utilisateur non connecté')
      return
    }
    const { error } = await supabase.from('offres').insert({
      user_id: user.id,
      titre: poste,
      localisation: ville,
      mission,
      profil_recherche: profil,
      niveau,
      experience,
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard/recruteur/offres')
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Publier une offre</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Poste"
          value={poste}
          onChange={(e) => setPoste(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <input
          type="text"
          placeholder="Ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <textarea
          placeholder="Mission"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <textarea
          placeholder="Profil recherché"
          value={profil}
          onChange={(e) => setProfil(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <input
          type="text"
          placeholder="Niveau"
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Expérience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition"
        >
          Publier l'offre
        </button>
      </form>
    </div>
  )
}

