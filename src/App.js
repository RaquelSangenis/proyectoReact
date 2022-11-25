import React, {createContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './Main';
import {BrowserRouter} from "react-router-dom";
import {db} from"./components/firebase"
import {collection, getDocs } from "firebase/firestore"

export const DataContext = createContext()

function App() {
    const[data, setData] = useState([])

    //traigo la data por unica vez cuando arranca la aplicacion
    useEffect(()=>{
        async function getData(){
            const querySnapshot = await getDocs(collection(db, "categories"));
            let categories = []
            querySnapshot.forEach((cat) => {
                const obj = {...cat.data(), ...{id:cat.id}}
                categories.push(obj);
            })

            setData(categories)
        }
        getData()
    },[])


  return (
    <div className="App">
      <DataContext.Provider value={data}>   
        <BrowserRouter>
          <Header/>       
          <Navbar countItems={data.length}/>
          <Main/>
          <Footer/>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}

export default App;
