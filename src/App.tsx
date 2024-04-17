import { Component, ReactNode } from 'react'
import socket from './socket'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './Game'
import AppContext from './contexts/AppContext'
import GameState from './modules/GameState'

class App extends Component<any, GameState> {
  
  constructor(props: any) {
    super(props);
    this.state = new GameState(this.setState.bind(this));
  }
  componentDidMount(): void {
    
    
  }

  componentWillUnmount(): void {
    socket.disconnect();
  }

  render(): ReactNode {
    return (
      this.state && <AppContext.Provider value={this.state}>
        <BrowserRouter>
          <Routes>
            <Route path='/mafya-client' element={<Game />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    )
  }
}

export default App
