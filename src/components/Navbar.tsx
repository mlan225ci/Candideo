'use client'

import Link from 'next/link'
import { Search, User } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <Link href="/" className="text-xl font-bold text-green-600">
        Candidéo
      </Link>
      <nav className="flex items-center space-x-6 text-sm">
        <Link href="/rendez-vous" className="hover:text-green-600">
          Prendre rendez-vous
        </Link>
        <button className="rounded p-2 hover:bg-gray-100" aria-label="Search">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </button>
        <button
          className="rounded p-2 hover:bg-gray-100"
          aria-label="User account"
        >
          <User className="h-5 w-5" />
          <span className="sr-only">User account</span>
        </button>
        <Link
          href="/dashboard"
          className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          Se connecter
        </Link>
      </nav>
    </header>
  )
}