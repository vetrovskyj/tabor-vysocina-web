import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'

const NotFoundPage = () => (
  <Layout>
    <Helmet
      title={`Chyba | Tábor Vysočina`}
    />
    <div>
      <h1>Stránku se nepodařilo najít</h1>
      <p>Mějte prosím zapnutý javascript v prohlížeči. Případně vyzkoušejte jiný prohlížeč. V případě nutnosti kontaktujte správce webu</p>
    </div>
  </Layout>
)

export default NotFoundPage
