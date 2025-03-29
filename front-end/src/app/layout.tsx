import "../scss/main.scss";
import { Metadata } from "next";
import Header from "@/components/Header/Header";

const metadata: Metadata = {
  title: "Air TADS",
  description: "Gestão de Empresa Aérea",
};

export const revalidate = parseInt(process.env.NEXT_PUBLIC_REVALIDATE?.toString() || "0");

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
