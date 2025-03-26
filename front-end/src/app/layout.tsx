import "../scss/main.scss";
import { Metadata } from "next";
import { getHeader, getMeta } from "@/data/config/api";
import QueryProvider from "@/components/Provider/QueryProvider/QueryProvider";
import GoogleAnalitycs from "@/components/SEO/GoogleAnalitycs/GoogleAnalitycs";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// export async function generateMetadata(): Promise<Metadata> {
//   const data = await getMeta(114);
//   return {
//     title: data?.titulo,
//     description: data?.descricao,
//     icons: {
//       icon: "./icon.png",
//     },
//     openGraph: {
//       images: "./icon.png",
//     },
//     other: {
//       "google-site-verification": "",
//     },
//   };
// }

export const revalidate = parseInt(
  process.env.NEXT_PUBLIC_REVALIDATE?.toString() || "0"
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const header = await getHeader();
  // const search = await getSearch();
  // const footer = await getFooter();
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          {/* <Header header={header}  /> */}
          {children}
          {/* <Footer data={footer} /> */}
        </QueryProvider>
      </body>
      <GoogleAnalitycs />
    </html>
  );
}
