import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Model from '@/components/Model'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
     <Model isOpen title="test model" />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  ) 
}
