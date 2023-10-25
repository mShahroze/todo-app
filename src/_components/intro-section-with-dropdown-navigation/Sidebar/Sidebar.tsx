'use client'

import Image from 'next/image'
import styles from './Sidebar.module.css'
import { useEffect, useRef, useState } from 'react'

const Sidebar = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)

    let menuRef: React.RefObject<HTMLDivElement> = useRef(null)

    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            if (isOpen && !menuRef.current?.contains(event.target as Node)) {
                setIsOpen(false)
            }
        };

        window.addEventListener("mousedown", handleOutSideClick)

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick)
        }
    }, [menuRef, isOpen])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpen(!isOpen)
    }
    
    return (
        <>
        <section ref={menuRef}>
            <button onClick={handleClick} className={ styles.menuButton }>
                <Image
                    src='./intro-section-with-dropdown-navigation/icon-menu.svg'
                    alt='menu'
                    width={32}
                    height={18}
                    className={ isOpen?styles.hide:styles.show }
                />
                <Image
                    src='./intro-section-with-dropdown-navigation/icon-close-menu.svg'
                    alt='close menu'
                    width={26}
                    height={26}
                    className={ isOpen?styles.show:styles.hide }
                />
            </button>
            <div className={ isOpen?`${styles.sidebar} ${styles.active}`:`${styles.sidebar}` }>
                {children}
            </div>
        </section>
        <div className={ isOpen?`${styles.darkBg} ${styles.active}`:`${styles.darkBg}` }></div>
        </>
    )
}

export default Sidebar