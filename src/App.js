import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { Route, Switch } from "react-router-dom";
import Cart from "./pages/Cart";


function App() {
  return (
    <div className="wrapper">
    
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
