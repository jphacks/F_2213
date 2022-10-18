import '../../styles/globals.scss'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
      {/* <link rel="manifest" href="/manifest.json" /> */}
    </Head>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
