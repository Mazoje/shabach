// src/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Shabach Empire | Luxury Real Estate & Architecture',
  description: 'Exclusive luxury real estate, short-lets, and architectural developments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0D131A] text-[#FDFBF7] antialiased">
        {children}
      </body>
    </html>
  );
}