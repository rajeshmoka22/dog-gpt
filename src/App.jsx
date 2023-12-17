// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Chat } from './components/Chat'
import {Header} from './components/Header'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Chat />
    </>
  )
}

export default App
