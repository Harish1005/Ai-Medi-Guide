import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppPage from './pages/AppPage'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/app' element={<AppPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
