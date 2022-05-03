import Head from 'next/head'
import { useI18N } from '../context/i18n'
import { Footer } from './footer'
import Header from './header'

export const PageLayout = ({children, title = 'XKCD Website', description = 'Comic shorts for you'}) => {
  const {t} = useI18N()
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}
