import { NextUIProvider } from '@nextui-org/react'
import { PageLayout } from '../components/PageLayout'
import { I18NProvider } from '../context/i18n'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <I18NProvider>
      <NextUIProvider>
        <PageLayout>
          <Component {...pageProps} />)
        </PageLayout>
      </NextUIProvider>
    </I18NProvider>
  )
}

export default MyApp
