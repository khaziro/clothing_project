import {Routes, Route} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

const Shop = () => {
  return (
    <div className="shop">I am the shopping page</div>
  )
}
const App = () => {
  return (
    <Routes>
      <Route path='/'
             element={<Navigation/>}>
        <Route
          index
          element={<Home/>}/>
        <Route
          path='shop'
          element={<Shop/>}
        />
      </Route>

    </Routes>)
}

export default App;
