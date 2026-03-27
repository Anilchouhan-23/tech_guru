import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'TechGuru - Find & Compare the Best Business Software',
    template: '%s | TechGuru',
  },
  description: 'TechGuru helps businesses discover, compare, and choose the right software. Read reviews, compare features, and find the perfect tool for your needs.',
  keywords: ['software comparison', 'software reviews', 'business software', 'SaaS', 'software discovery'],
  openGraph: {
    title: 'TechGuru - Find & Compare the Best Business Software',
    description: 'Discover, compare, and choose the right software for your business.',
    url: 'https://techguru.com',
    siteName: 'TechGuru',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechGuru - Software Discovery Platform',
    description: 'Find and compare the best business software.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
