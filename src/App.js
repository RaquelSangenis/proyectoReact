import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './Main';
import {BrowserRouter} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>       
        <Navbar/>
        <Main/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
