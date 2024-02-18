import Layout from '../src/components/layout/Layout'
import { getHome } from '../src/lib/utils'
import Portada from './index/components/portada/Portada'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { getPortadaSrv } from '../src/services/publication/publicationService'

const Index = props => {
  const { action, env, feed } = props
  const descripcion =
    'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas e independientes de alta confiabilidad ofreciendo videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch con los mejores precios del mercado en Colombia'
  const image = ''
  const title = 'Pikplay - Compras gamers confiables'
  const url = 'https://pikplay.co'
  const dispatch = useDispatch()

  useEffect(() => {
    switch (action) {
      case 'not_authorized':
        dispatch({ type: 'LOGOUT' })
        toast('Debes ingresar con tu cuenta de Pikplay', { type: 'warning' })
        break

      case 'login':
        const name = JSON.parse(localStorage.getItem('persist:pikplay'))?.user
          ?.name
        toast(
          <div>
            Bienvenido {name} 😎
            <br />
            <small>Cargando tus preferencias 👾 ...</small>
          </div>,
        )
        break

      case 'logout':
        toast('Regresa pronto 👋')
        break

      default:
        break
    }
  }, [])

  return (
    <Layout
      descripcion={descripcion}
      env={env}
      image={image}
      title={title}
      url={url}>
      <Portada feed={feed} />
      {/* <Testimonials /> */}
    </Layout>
  )
}

Index.getInitialProps = async ctx => {
  const env = process.env.ENV
  const action = ctx.query?.action
  const isSSR = typeof window === 'undefined'
  // const feed = await getHome({ isSSR, origin: 'indexPage' })
  const feed = await getPortadaSrv()
  return {
    env,
    action,
    feed,
  }
}

export default Index
