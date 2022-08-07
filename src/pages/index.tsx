import { NextPage } from 'next'
import Head from 'next/head'

import { AddTodoInput } from 'components/AddTodoInput'
import { deleteTodo, toggleTodo, useTodos } from 'src/api'
import { Todo } from 'src/types'
import styles from 'styles/Home.module.css'

export const TodoList: React.FC = () => {
  const { data: todos, error } = useTodos()

  if (error != null) return <div>Error loading todos...</div>
  if (todos == null) return <div>Loading...</div>

  if (todos.length === 0) {
    return <div className={styles.emptyState}>Try adding a todo ☝️️</div>
  }

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => (
  <li className={styles.todo}>
    <label className={`${styles.label} ${todo.completed ? styles.checked : ''}`}>
      <input
        type='checkbox'
        checked={todo.completed}
        className={`${styles.checkbox}`}
        onChange={() => toggleTodo(todo)}
      />
      {todo.text}
    </label>

    <button className={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>
      ✕
    </button>
  </li>
)

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Railway NextJS Prisma</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>My Todos</h1>
        <h2 className={styles.desc}>
          NextJS app connected to Postgres using Prisma and hosted on{' '}
          <a href='https://railway.app'>Railway</a>
        </h2>
      </header>

      <main className={styles.main}>
        <AddTodoInput />

        <TodoList />
      </main>
    </div>
  )
}

export default Home
