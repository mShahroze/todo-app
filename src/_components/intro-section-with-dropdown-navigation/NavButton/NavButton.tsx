'use client'

import Image from 'next/image'
import styles from './NavButton.module.css'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type Style = 'navbar' | 'sidebar'

const NavButton = ({ text, style } : { text: string, style: Style }) => {
    const [isOpen, setIsOpen] = useState(false)

    let menuRef: React.RefObject<HTMLDivElement> = useRef(null)

    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            if (style==='navbar' && isOpen && !menuRef.current?.contains(event.target as Node)) {
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

    let featuresMenu =
    <ul className={
        style==='navbar'?
        isOpen?`${styles.menu} ${styles.pushLeft} ${styles.active}`:`${styles.menu} ${styles.pushLeft}`
        :isOpen?`${styles.menuSide} ${styles.activeSide}`:`${styles.menuSide}`
    }>
        <li className={ styles.menuItem }>
            <Image
                src='./intro-section-with-dropdown-navigation/icon-todo.svg'
                alt=''
                width={16}
                height={17}
            />
            <Link href='/intro-section-with-dropdown-navigation'>Todo&nbsp;List</Link>
        </li>
        <li className={ styles.menuItem }>
            <Image
                src='./intro-section-with-dropdown-navigation/icon-calendar.svg'
                alt=''
                width={16}
                height={17}
            />
            <Link href='/intro-section-with-dropdown-navigation'>Calendar</Link>
        </li>
        <li className={ styles.menuItem }>
            <Image
                src='./intro-section-with-dropdown-navigation/icon-reminders.svg'
                alt=''
                width={16}
                height={17}
            />
            <Link href='/intro-section-with-dropdown-navigation'>Reminders</Link>
        </li>
        <li className={ styles.menuItem }>
            <Image
                src='./intro-section-with-dropdown-navigation/icon-planning.svg'
                alt=''
                width={16}
                height={17}
            />
            <Link href='/intro-section-with-dropdown-navigation'>Planning</Link>
        </li>
    </ul>

    let companyMenu =
    <ul className={
        style==='navbar'?
        isOpen?`${styles.menu} ${styles.active}`:`${styles.menu}`
        :isOpen?`${styles.menuSide} ${styles.activeSide}`:`${styles.menuSide}`
    }>
        <li className={ styles.menuItem }><Link href='/intro-section-with-dropdown-navigation'>History</Link></li>
        <li className={ styles.menuItem }><Link href='/intro-section-with-dropdown-navigation'>Our&nbsp;Team</Link></li>
        <li className={ styles.menuItem }><Link href='/intro-section-with-dropdown-navigation'>Blog</Link></li>
    </ul>

    return (
        <div ref={menuRef} className={ styles.navDiv }>
            <button onClick={handleClick} className={ styles.navButton }>
                { text }
                <Image
                    src='./intro-section-with-dropdown-navigation/icon-arrow-down.svg'
                    alt=''
                    width={10}
                    height={6}
                    className={ isOpen?styles.hideArrow:styles.showArrow }
                />
                <Image
                    src='./intro-section-with-dropdown-navigation/icon-arrow-up.svg'
                    alt=''
                    width={10}
                    height={6}
                    className={ isOpen?styles.showArrow:styles.hideArrow }
                />
            </button>
            {text==='Features'?featuresMenu:companyMenu}
        </div>
    )
}

export default NavButton