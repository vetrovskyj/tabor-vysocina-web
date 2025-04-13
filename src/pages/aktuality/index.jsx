import React from 'react'

import Layout from '../../components/Layout'
import Helmet from "react-helmet"
import Articles from '../../components/Articles'

export default class Aktuality extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet
          title={`Aktuality | Tábor Vysočina 3. turnus`}
          meta={[
            {
              name: `description`,
              content: 'Aktuality organizační informace o dění na táboře Vysočina 3. turnus v Novém Městě na Moravě',
            },
            {
              name: "keywords",
              content: 'Tábor, Vysočina, PČR, Policie, Dětský tábor, Nové Město na Moravě, 3. turnus, Aktuality, Informace, Články',
            },
          ]} />
        <main className="telo">
          <Articles />
        </main>
      </Layout>
    )
  }
}