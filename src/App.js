

import { Routes,Route } from "react-router-dom";
import  Navigation  from './routes/navigation/navigation.component'
import "../src/components/directory/directory.style.scss"
import Home from "./routes/home/home.component";
import SignIn from "./routes/sign-in/sign-in.component";



const Shop = () =>{
  return (
    <h1> Satış sayfası</h1>
  )
}

const App = () => {

  
  return (
    <Routes>
    <Route path="/" element={<Navigation/>} >
    <Route index={true} element = {<Home />} />
    <Route path='shop' element = {<Shop />} />
    <Route path='sign-in' element = {<SignIn />} />
    </Route>
    </Routes>
  );
};

export default App;
