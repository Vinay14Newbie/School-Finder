import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/card'

function App() {
  const [count, setCount] = useState(0)

  let obj = {name:'vinay', age:19}
  let arr = [1, 2, 3]

  return (
    <>
      {/* <Card data={obj}></Card> */}
      <Card username="Vinay" btnText="Visit here"></Card>
      <Card username="Dipak" ></Card>
    </>
  )
}

export default App
