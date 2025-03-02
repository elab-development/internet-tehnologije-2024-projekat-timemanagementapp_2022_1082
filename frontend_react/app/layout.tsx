import './globals.css';  // Importuj globalne stilove
import { ReactNode } from 'react';

export const metadata = {
  title: 'Moja Platforma za Upravljanje Vremenom',
  description: 'Platforma za praćenje i upravljanje vremenom.',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="sr">
      <body className="bg-gray-100 rounded-2xl">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;

