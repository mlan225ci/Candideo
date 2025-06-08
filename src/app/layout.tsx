import '../globals.css'; // Corrigé : remonter d'un dossier
import { ReactNode } from 'react';
import Navbar from '../components/Navbar'; // Chemin relatif depuis /app
import Footer from '../components/Footer'; // Idem
import '../globals.css';


export const metadata = {
  title: 'Candideo',
  description: 'Trouvez les bons profils facilement',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
