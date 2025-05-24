import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "OneSignal Customer Event-Driven Flow",
  description: "Visualizing the OneSignal Events Experience with elegant design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <ThemeProvider>
          {/* Background Effects */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-brand-500/5" />
            <div className="absolute top-0 left-1/4 w-96 h-96 -translate-x-1/2 rounded-full bg-primary-500/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl animate-pulse" />
          </div>

          {/* Theme Toggle */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>

          {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
