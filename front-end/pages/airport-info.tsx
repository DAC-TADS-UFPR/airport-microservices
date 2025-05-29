import Head from 'next/head'

export default function AirportInfo() {
  return (
    <>
      <Head>
        <title>Airport Info</title>
      </Head>
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Informações do Aeroporto</h1>
        <p>Nome: Aeroporto Internacional</p>
        <p>Cidade: São Paulo</p>
        <p>País: Brasil</p>
        <p>Código IATA: GRU</p>
      </main>
    </>
  )
}