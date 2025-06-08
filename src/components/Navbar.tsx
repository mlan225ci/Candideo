'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-green-600">
        Candidéo
      </Link>
      <nav className="space-x-6 text-sm">
        <Link href="/rendez-vous" className="hover:text-green-600">Prendre rendez-vous</Link>
        <Link href="/dashboard/recruteur" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Se connecter
        </Link>
      </nav>
    </header>
  );
}
