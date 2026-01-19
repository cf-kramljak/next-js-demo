import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ReactQueryClientProvider } from "@/lib/providers/ReactQueryClientProvider";
import { getSSRQueryClient } from "@/lib/queryClient";
import { userApi } from "@/lib/api";
import { getSessionCookie } from "@/lib/cookies";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { CURRENT_USER_QUERY_KEY } from "@/lib/constants";
import { ToastContainerSetup } from "@/components/ui/Toast";
import metadataConfig from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = metadataConfig;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getSSRQueryClient();
  const sessionCookie = await getSessionCookie();

  if (sessionCookie) {
    await queryClient.prefetchQuery({
      queryKey: [CURRENT_USER_QUERY_KEY],
      queryFn: () => userApi.getCurrentUser(sessionCookie),
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <HydrationBoundary state={dehydratedState}>
            <main className="min-h-screen">
              <Navigation />
              {children}
            </main>
            <ToastContainerSetup />
          </HydrationBoundary>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
