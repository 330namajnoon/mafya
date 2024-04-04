import { useEffect } from 'react'
import './App.css'
import socket from './socket'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './Game'

function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/mafya-client' element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
