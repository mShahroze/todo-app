import styles from './NavbarItems.module.css'
import Link from 'next/link'
import NavButton from '../NavButton/NavButton'

type Style = 'navbar' | 'sidebar'

const NavbarItems = ({style}: {style: Style}) => {
  return (
    <div className={ style==='navbar'?styles.noStyle:styles.divSide }>
        <ul className={ style==='navbar'?styles.ul:styles.ulSide }>
            <li><NavButton text='Features' style={style} /></li>
            <li><NavButton text='Company' style={style} /></li>
            <li><Link href='/intro-section-with-dropdown-navigation' className={ styles.a }>Careers</Link></li>
            <li><Link href='/intro-section-with-dropdown-navigation' className={ styles.a }>About</Link></li>
        </ul>
        <div className={ style==='navbar'?styles.buttonDiv:styles.buttonDivSide }>
          <Link href='/intro-section-with-dropdown-navigation'><button className={ style==='navbar'?styles.button:styles.buttonSide }>Login</button></Link>
          <Link href='/intro-section-with-dropdown-navigation'><button className={ style==='navbar'?`${styles.button} ${styles.buttonBorder}`:`${styles.buttonSide} ${styles.buttonBorderSide}` }>Register</button></Link>
        </div>
    </div>
  )
}

export default NavbarItems