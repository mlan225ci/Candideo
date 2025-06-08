'use client'

import { useParams } from 'next/navigation'

export default function CategoriePage() {
  const params = useParams<{ slug: string }>()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Catégorie: {params.slug}</h1>
    </div>
  )
}
