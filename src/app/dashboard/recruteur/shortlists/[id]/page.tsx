"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@/utils/supabase"

interface Params {
  params: { id: string }
}

interface Candidat {
  id: string
  nom: string
  prenom: string
  titre_professionnel: string
}

export default function ShortlistDetails({ params }: Params) {
  const supabase = createBrowserClient()
  const [candidats, setCandidats] = useState<Candidat[]>([])

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("shortlist_items")
        .select("candidats(id, nom, prenom, titre_professionnel)")
        .eq("shortlist_id", params.id)

      if (error) console.error("Erreur chargement shortlist", error)
      else if (data)
        setCandidats(data.map((d: any) => d.candidats) as Candidat[])
    }
    load()
  }, [params.id, supabase])

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Détail de la shortlist</h1>
      {candidats.length === 0 ? (
        <p>Aucun candidat dans cette shortlist.</p>
      ) : (
        <ul className="space-y-2">
          {candidats.map((c) => (
            <li key={c.id} className="rounded-md border p-4">
              <p className="font-semibold">
                {c.prenom} {c.nom}
              </p>
              <p className="text-sm text-gray-500">{c.titre_professionnel}</p>
              <Link
                href={`/dashboard/recruteur/candidats/${c.id}`}
                className="text-blue-600 hover:underline"
              >
                Voir la fiche
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
