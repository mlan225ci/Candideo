import '../globals.css'; // Corrigé : remonter d'un dossier
import { ReactNode } from 'react';
import Navbar from '../components/Navbar'; // Chemin relatif depuis /app
import Footer from '../components/Footer'; // Idem
import ThemeProvider from '../providers/ThemeProvider';


export const metadata = {
  title: 'Candideo',
  description: 'Trouvez les bons profils facilement',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
