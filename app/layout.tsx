import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import ClientProvider from "@/components/client-provider";
import FirebaseAuthProvider from "@/components/firebase-auth-provider";
import SubscriptionProvider from "@/components/subscription-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "SaaS Translator App",
  description: "A SaaS Platform with Stripe and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />

                {children}

                <Toaster />
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
