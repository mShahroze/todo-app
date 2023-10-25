'use client'

import Image from 'next/image'
import styles from './TodoItem.module.css'

const TodoItem = ({
  id,
  text,
  state,
  checkFunction,
  removeFunction,
}:{
  id: number,
  text: string,
  state: 'active' | 'completed',
  checkFunction: Function,
  removeFunction: Function,
}) => {
  const handleCheck = () => {
    checkFunction(id)
  }

  const handleRemove = () => {
    removeFunction(id)
  }
  
  return (
    <div className={ styles.div }>
        <button onClick={handleCheck} className={ state==='completed'?styles.checked:styles.check }>
          {state==='completed'?
            <Image
              src='./todo-app/icon-check.svg'
              alt='done'
              width={11}
              height={9}
            />
          :<></>}
        </button>
        <p className={ state==='completed'?`${styles.p} ${styles.checkedP}`:styles.p }>{text}</p>
        <button onClick={handleRemove} className={ styles.remove }>
          <Image
            src='./todo-app/icon-cross.svg'
            alt='remove'
            width={18}
            height={18}
          />
        </button>
    </div>
  )
}

export default TodoItem