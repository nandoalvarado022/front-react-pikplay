import React from 'react'
import Layout from '../../src/components/layout/Layout'
import { getFeed, capitalize , getSubcategories, slugify } from '../../src/lib/utils'
import Portada from '../index/components/portada/Portada'

class SubcategoryPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const subcategory = query.id
    const idSubcategory = getSubcategories().find(
      item => slugify(item.name.toLowerCase()) == subcategory.toLowerCase(),
    ).id
    let feed = await getFeed({ subcategory: idSubcategory })
    return { subcategory, feed }
  }

  render() {
    const { subcategory } = this.props
    const url = 'https://pikajuegos.com/subcategory/' + subcategory
    const metaTitle = 'Pikplay | ' + capitalize(subcategory)
    const descripcion =
      'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia'
    return (
      <Layout
        meta_url={url}
        subcategory={subcategory}
        meta_descripcion={descripcion}
        meta_title={metaTitle}
        title={metaTitle}
      >
        <Portada subcategory={subcategory} feed={this.props.feed} />
      </Layout>
    )
  }
}

export default SubcategoryPage
