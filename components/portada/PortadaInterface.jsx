import dynamic from 'next/dynamic'
const { IS_MOBILE } = "../../lib/variables"
import Card from '../card/Card'
import Footer from '../footer/Footer'
import HolaJuanito from "../holaJuanito/HolaJuanito"
import React from 'react'
import styles from "./portada.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import ModalLead from '../modalLoead/ModalLead'
import { GET_FOLLOWED_PUBLICATIONS } from '../../lib/utils'

const CategoryBanner = dynamic(
  () => import('../categoryBanner/CategoryBanner.jsx'),
  { ssr: false }
)

const SpecialBanner = ({ category, popularyItem, starItem }) => {
  return <span />
  if (false /*!category && popularyItem && starItem*/) {
    return <div id={styles.SpecialBanner}>
      <div className={styles.box}>
        <div className={styles.title}>Lo más visto por los gamers</div>
        <Card key={popularyItem.id} permitirLink={true} {...popularyItem} />
      </div>
      <img src="/images/banners/banner-varios-juegos.png" alt="Juegos SSwitch en promoción" />
      <div className={styles.box}>
        <div className={styles.title}>Anuncio</div>
        <Card key={starItem.id} permitirLink={true} {...starItem} />
      </div>
    </div>
  }
}

const PortadaInterface = ({ category, handleFavorite, feed, popularyItem, setFeed, starItem }) => {
  const [showVideo, setShowVideo] = useState(false)
  const isOpen = typeof sessionStorage != "undefined" && JSON.parse(sessionStorage.getItem("notifications"))?.home
  const [showNotification, setShowNotification] = useState(!!!isOpen)
  const showModalLead = typeof localStorage != 'undefined' ? !localStorage.getItem('modal_l ead') : true

  useEffect(() => {
    if (localStorage.getItem("user") == null) setShowVideo(true)
    setTimeout(() => {
      document.querySelectorAll("video").forEach(item => {
        item.play()
      })
    }, 2000)
    getFollowedPublications()
  }, [])

  const [getFollowedPublications, { data }] = useLazyQuery(GET_FOLLOWED_PUBLICATIONS, {
    fetchPolicy: "no-cache",
    variables: {
      user: 61
    },
    onCompleted: ({ getFollowedPublications }) => {
      if (getFollowedPublications.length > 0) {
        const _publications = feed ? [...feed] : []
        getFollowedPublications.forEach(item => {
          let element = _publications.find(p => p.id == item.id)
          if (element) _publications.find(p => p.id == item.id).following = true
        })
        setFeed(_publications)
      }
    }
  })

  return <React.Fragment>
    {(feed && feed.length < 1) && <h3 style={{ textAlign: "center" }}>
      <FontAwesomeIcon icon={faClock} style={{ marginRight: "10px" }} />
      Mantenimiento programado en progreso
    </h3>}
    {!category && <HolaJuanito />}
    <SpecialBanner {...{ category, popularyItem, starItem }} />
    {showModalLead && <ModalLead />}
    <div className={styles.PortadaInterfaceComponent}>
      <div className={styles.main}>
        <div className="listadoRodadas">
          {feed && feed.map((item, ind) => {
            let categoryId = 0
            switch (ind) {
              case 0:
                categoryId = 2
                break;
              case 6:
                categoryId = 3
                break;
              case 12:
                categoryId = 4
                break;
              case 18:
                categoryId = 5
                break;
              case 24:
                categoryId = 1
                break;
              case 30:
                categoryId = 6
                break;
              default:
                categoryId = null
                break
            }

            const showCategoryBanner = !IS_MOBILE && categoryId && !category

            return <React.Fragment>
              {showCategoryBanner && <CategoryBanner categoryId={categoryId} />}
              <Card {...{ handleFavorite, ...item }} />
            </React.Fragment>
          })}
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
}

export default PortadaInterface
