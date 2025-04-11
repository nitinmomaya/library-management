import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppRoutes } from './routes/Routes';
import Borrow from './pages/Borrow';
import './App.css'
import Home from './pages/Home';
 
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
 

export default App;