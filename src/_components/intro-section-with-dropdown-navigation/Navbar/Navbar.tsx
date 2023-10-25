import Image from 'next/image'
import styles from './Navbar.module.css'
import Link from 'next/link'
import NavbarItems from '../NavbarItems/NavbarItems'

const Navbar = () => {
  return (
    <header className={ styles.header }>
        <Link href='/intro-section-with-dropdown-navigation'><Image
            src='./intro-section-with-dropdown-navigation/logo.svg'
            alt='Logo'
            width={84}
            height={27}
            className={ styles.logoImg }
        /></Link>
        <NavbarItems style='navbar' />
    </header>
  )
}

export default Navbar