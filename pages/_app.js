import '../src/styles/globalStyles.scss'

import React, { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
// import graphqlClient from '../src/lib/graphqlClient'
// import { ApolloProvider } from '@apollo/client'
import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
// import { persistStore } from 'redux-persist'
// import { useStore } from '../src/lib/store'
import { getScreenOrientation, versions } from '../src/lib/utils'
import Loading from '../src/components/loading/Loading'
import * as amplitude from '@amplitude/analytics-browser'

const MyApp = props => {
  const { Component, pageProps, router } = props
  const [orientation, setOrientation] = useState('')
  // const store = useStore(pageProps.initialReduxState)
  // const persistor = persistStore(store, {}, function () {
  //   persistor.persist()
  // })

  useEffect(() => {
    // Amplitude
    amplitude.init('cb63bafbeb6b78683453bb848954aa1a');

    getScreenOrientation(setOrientation);
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

    // Start Google Tag Manager
    TagManager.initialize({ gtmId: 'GTM-5WB6P7C' })
    // End Google Tag Manager

    // Cleaning cache if version is not the same
    const lastClientVersion = localStorage.getItem('current_version')
    const lastVersion = versions[0]
    if (lastClientVersion) {
      if (lastClientVersion !== lastVersion) {
        localStorage.clear() // cleaning localStorage
        // cleaning cache
        document.cookie.replace(/(?<=^|;).+?(?=|;|$)/g, name =>
          location.hostname
            .split('.')
            .reverse()
            .reduce(
              domain => (
                (domain = domain.replace(/^\.?[^.]+/, '')),
                (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
                domain
              ),
              location.hostname,
            ),
        )
        localStorage.setItem('current_version', lastVersion)
        window.location.reload(true)
      }
    } else {
      localStorage.setItem('current_version', lastVersion)
    }
  }, [])

  useEffect(() => {
    import('react-facebook-pixel')
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init('627225011598226') // facebookPixelId
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  return (<Component {...pageProps} amplitude={amplitude} key={router.name} />
    // <Provider store={store}>
    // <ApolloProvider client={graphqlClient}>
    // {/* <Loading /> */}
    // {/* Orientation: {orientation} */}
    // <Component {...pageProps} amplitude={amplitude} key={router.name} />
    // </ApolloProvider>
    // </Provider>
  )
}

export default MyApp
