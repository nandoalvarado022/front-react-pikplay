import Link from "next/link"
import React from "react"
import { useContext, useEffect, useState } from 'react'
import { handleLogout } from '../../lib/utils'
import { PikContext } from "../../states/PikState"
import Coins from './Coins'
import styles from "./styles.module.scss"
import UserNotifications from '../userNotifications/UserNotifications'

export const PreviewUser = ({ isOpenPreviewProfile, setIsOpenPreviewProfile }) => {
  const isMobile = typeof window != "undefined" ? window.screen.width < 420 : false
  const context = useContext(PikContext)
  const notifications = context.notifications.filter(item => item.closed == 0)
  return <div className={`${styles.PreviewUser} PreviewUser ${isOpenPreviewProfile ? styles.actived : null}`}>
    {!isMobile && <UserNotifications />}
    <ol>
      <Link href="/perfil" as="/perfil">
        <a>
          Mi cuenta<br />
          <Coins />
        </a>
      </Link>
    </ol>
    <ol onClick={() => setIsOpenPreviewProfile(false)}>
      <Link href="/perfil#notificaciones" as="/perfil#notificaciones">
        Notificaciones
      </Link>
      {isMobile && <span className={styles.notyQuantity}>
        {notifications.length}
      </span>}
    </ol>
    <ol>
      <Link href="/transacciones" as="/transacciones">
        Transacciones
      </Link>
    </ol>
    <ol>
      <Link href="/publicaciones" as="/publicaciones">
        <a>Publicaciones</a>
      </Link>
    </ol>
    <ol onClick={() => handleLogout()}>
      Salir
    </ol>
  </div>
}