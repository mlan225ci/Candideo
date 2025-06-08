'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const SearchDialog = () => {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [domain, setDomain] = useState('')
  const [experience, setExperience] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.set('keyword', keyword)
    if (domain) params.set('domain', domain)
    if (experience) params.set('experience', experience)
    setOpen(false)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Rechercher">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 focus:outline-none space-y-4">
          <Dialog.Title className="text-lg font-medium">
            Rechercher des profils
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Mot clé"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Domaine d’activité"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Années d’expérience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">
              Rechercher
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SearchDialog
