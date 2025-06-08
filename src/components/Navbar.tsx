'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-green-600 dark:text-green-400">
        Candidéo
      </Link>
      <nav className="space-x-6 text-sm flex items-center">
        <Link href="/rendez-vous" className="hover:text-green-600 dark:hover:text-green-400">
          Prendre rendez-vous
        </Link>
        <Link href="/candidats" className="hover:text-green-600 dark:hover:text-green-400">
          Liste des candidats
        </Link>
        <Link
          href="/login"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
        >
          Se connecter
        </Link>
        <ThemeToggle side="bottom" />
      </nav>
    </header>
  );
}
