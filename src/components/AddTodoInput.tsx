import { useState } from 'react'

import { createTodo } from 'src/api'
import styles from 'styles/Home.module.css'

export const AddTodoInput = () => {
  const [text, setText] = useState('')

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        createTodo(text)
        setText('')
      }}
      className={styles.addTodo}
    >
      <input
        className={styles.input}
        placeholder='Buy some milk'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.addButton}>Add</button>
    </form>
  )
}
