import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import confetti from 'canvas-confetti'
import ReactTyped from 'react-typed'
import styles from './styles.module.scss'
import CoinIcon from '../coinIcon/CoinIcon';
import Button from '../button/Button'
import { animatePrince } from '../../lib/utils'
import classNames from 'classnames';
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience';
import { motion, AnimatePresence } from "framer-motion"

const AwardsSummary = ({ callback }) => {

    const gainedCoins = 5
    const currentUserCoins = 10

    const startConfetti = () => {
        var count = 200;
        var defaults = {
            origin: { y: 0.7 },
            zIndex: 1301
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
        confetti({ ...defaults })
    }

    useEffect(() => {
        setTimeout(() => {
            startConfetti()
        }, 500)
    }, [])

    const handleUpdateExperience = () => {
        handlePickRewardUp()
        callback(1)
    }

    const message = `Recibiste <span class="yellow">5 Pikcoins</span> para redimir en productos de la tienda JuanchoFenix. <span class="blue">¡Felicitaciones!</span>`
    const handlePickRewardUp = () => {
        // Sumando coins al Coins del header
        const element = document.querySelector('#PreviewProfile--Coins .number')
        const fromNumber = element?.innerHTML
        const targetNumber = currentUserCoins + gainedCoins
        animatePrince(element, targetNumber, fromNumber)

        // Restando coins
        const secondElement = document.querySelector('#AwardsSummary .number')
        animatePrince(secondElement, 0, gainedCoins)
    }

    return (
        <>
            <div>
                <motion.div
                    initial={{ y: '200px' }}
                    animate={{
                        y: 0,
                    }}
                    transition={{
                        delay: .5
                    }}
                    className={styles.title}>
                    ¡Nueva liga!
                </motion.div>
                <motion.div
                    initial={{ x: '-200px' }}
                    animate={{
                        x: 0,
                    }}
                    transition={{
                        delay: .2
                    }}
                    className={styles.subtitle}>
                    BRONCE
                </motion.div>
                <div className={styles.gifts}>
                    <div className={styles.coinsGained}>
                        <div className={styles.plusCoin}>
                            {/* <FontAwesomeIcon icon={faPlus} /> */}
                        </div>
                        <CoinIcon coins={gainedCoins} multicoin />
                    </div>

                    <div className={styles.medalsGained}>
                    </div>

                    <div className={styles.experienceGained}>
                        5%<br />
                        experiencia
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <img src="/images/type_notification/coupon_gift_available.png" alt="bronze" />
                <p className={styles.description}>
                    <ReactTyped strings={[message]} typeSpeed={20} />
                </p>
            </div>

            <DialogActions>
                <motion.div
                    initial={{ x: '-500px' }}
                    animate={{
                        x: 0,
                    }}
                    transition={{
                        delay: 2
                    }}>
                    <Button className={styles.main_button} color="blue" onClick={handleUpdateExperience}>
                        RECOGER PREMIOS
                    </Button>
                </motion.div>
            </DialogActions>
        </>
    )
}

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 100 : -100,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0
        };
    }
}

const ModalComponent = (props) => {
    const { setSummaryAwardsOpen } = props
    const [[page, direction], setPage] = useState([0, 0]);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="left" ref={ref} {...props} />;
    })

    const callback = (number) => {
        // setTimeout(() => {
        setPage([number, 1])
        // }, 1000)
    }

    return <Dialog
        open={true}
        TransitionComponent={Transition}
        onClose={() => setSummaryAwardsOpen(false)}
    >
        <DialogContent>
            <div id="AwardsSummary" className={styles.AwardsSummary}>
                <div className={styles.bg_city}></div>
                <DialogContentText id="alert-dialog-slide-description" className={styles.content}>
                    <AnimatePresence initial={true} custom={direction}>
                        {page === 0 && <AwardsSummary callback={callback} />}
                        {page === 1 && <PreviewProfileSummaryExperience
                            gainExperience={200}
                            callback={callback}
                            setSummaryAwardsOpen={setSummaryAwardsOpen}
                        />}
                    </AnimatePresence>
                </DialogContentText>
            </div>
        </DialogContent>
    </Dialog>
}

const PreviewProfileSummaryExperience = ({ callback, setSummaryAwardsOpen, gainExperience }) => {
    return <motion.div variants={variants}>
        <ProfileSummaryExperience gainExperience={gainExperience} />
        <DialogActions>
            <Button outline color="blue" className={styles.main_button} onClick={() => callback(0)}>
                ATRAS
            </Button>
            <Button color="blue" className={styles.main_button}>
                CONTINUAR
            </Button>
        </DialogActions>
    </motion.div>
}

export default ModalComponent;