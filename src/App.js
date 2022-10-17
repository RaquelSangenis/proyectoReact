import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import SiteTitle from './components/SiteTitle';

function App() {
  return (
    <div className="App">
      <header>
        <SiteTitle/>
        <Navbar/>
        <ItemListContainer greeting='Hola desde el componente ItemListContainer!'/>
        </header>

    </div>
  );
}

export default App;
