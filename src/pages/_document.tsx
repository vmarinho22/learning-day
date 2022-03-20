import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <meta
            name="description"
            content="Um projeto da faculdade sobre um sistema de controle de treinamentos de funcionários para RH de empresas"
        />
        <link
          rel="icon"
          href="/favicon-dark.ico"
          media="(prefers-color-scheme:no-preference)"
        />
        <link
          rel="icon"
          href="/favicon.ico"
          media="(prefers-color-scheme:dark)"
        />
        <link
          rel="icon"
          href="/favicon-dark.ico"
          media="(prefers-color-scheme:light)"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}