import PublicationForm from '../../../src/components/publicationForm/PublicationForm'
import Layout from '../../../src/components/layout/Layout'

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
