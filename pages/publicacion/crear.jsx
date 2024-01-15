import React from 'react'
import Layout from '../../src/components/layout/Layout'
import PublicationForm from '../../src/components/publicationForm/PublicationForm'

const PageCrearPublicacion = () => {
  return (
    <Layout
      title='Crear publicación'
      meta_title='Crear publicación en club2ruedas.com'
      meta_url='https://club2ruedas.com/publicacion/crear'
    >
      <PublicationForm />
    </Layout>
  )
}

export default PageCrearPublicacion
