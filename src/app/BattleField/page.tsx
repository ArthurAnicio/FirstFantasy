'use client'
import styles from './BattleField.module.css'
import Cookies from 'js-cookie'
//import { useEffect, useState } from 'react'

export default function BattleField() {

    const backgroundImage = Cookies.get('battleField')||''

    return(
        <div
            className={styles.container} 
            style={{
                backgroundImage
            : `url(/images/backgrounds/${backgroundImage}.jpg), linear-gradient(#00000080, #00000080)`,
        }}
        >
        </div>
    )
}