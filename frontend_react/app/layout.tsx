import './globals.css';  // Importuj globalne stilove
import { ReactNode } from 'react';

export const metadata = {
  title: 'TimeFlow',
  description: 'Platforma za praćenje i upravljanje vremenom.',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="sr">
      <body className="bg-gray-100">
        <div className="container mx-auto p-12">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;

