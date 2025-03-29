import "../scss/main.scss";
import { Metadata } from "next";
import Header from "@/components/Header/Header";
import { ModalProvider } from "@/components/Provider/ModalProvider/ModalProvider";

const metadata: Metadata = {
  title: "Air TADS",
  description: "Gestão de Empresa Aérea",
};

export const revalidate = parseInt(process.env.NEXT_PUBLIC_REVALIDATE?.toString() || "0");

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ModalProvider>
          <Header />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
