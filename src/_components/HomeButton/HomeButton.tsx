import Image from "next/image"
import Link from "next/link"
import './HomeButton.css'

const HomeButton = () => {
  return (
    <Link href='/' className="home">
        <Image
            src='./home-button.png'
            alt='Home'
            width={47}
            height={47}
        />
    </Link>
  )
}

export default HomeButton