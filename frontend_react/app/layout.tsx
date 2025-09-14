import './globals.css';
import { ReactNode } from 'react';


export const metadata = {
  title: 'TimeFlow',
  description: 'Platforma za praćenje i upravljanje vremenom.',
  icons: {
    icon: "./icon.png"
  }
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="sr">
      <body className="bg-gray-100">
        <div className="container mx-auto p-10">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;

