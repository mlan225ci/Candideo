'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function RendezVousPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [datetime, setDatetime] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/rdv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, datetime }),
    })
    if (res.ok) {
      setSubmitted(true)
      setName('')
      setEmail('')
      setDatetime('')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      {submitted ? (
        <p className="text-green-600 font-semibold">Votre demande a été enregistrée.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="datetime-local"
            required
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <Button type="submit" className="w-full">
            Envoyer
          </Button>
        </form>
      )}
    </div>
  )
}
