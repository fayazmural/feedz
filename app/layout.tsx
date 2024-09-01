import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import PageHeader from "@/components/page-header";
import { toast, Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <PageHeader />
           <Toaster richColors position="top-right" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
