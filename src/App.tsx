import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../Components/Login/Login';
import Home from '../Components/Home';

const App : React.FC = () => {
  

  return (
    <div style={{
      width: '100%',
      height: "100%",
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element ={<Home />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
