import Head from "next/head"

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Página No Encontrada</title>
        <meta name="description" content="Página no encontrara - Error 404" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="error404-title">Error 404 | Página no encontrada</h1>
    </>
  )
}