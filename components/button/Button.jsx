import React, { lazy } from 'react'
import styles from './button.module.scss'
const { motion } = require("framer-motion")

export default function Button({
    animation,
    children,
    className,
    color,
    databutton,
    disabled,
    id,
    onClick,
    style,
}) {
    className = `${className} ${animation ? styles.animation : null}`
    color = disabled ? 'disabled' : color
    return <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} id={id} databutton={databutton} onClick={disabled ? null : onClick} className={`${styles.btn} ${styles[color]} ${className}`} style={style}>
        <span className={styles.text}>{children}</span>
    </motion.button>
}