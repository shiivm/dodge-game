import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import AppNavbar from './component/AppNavbar';

import ROUTES from "./routes/Route";
import RenderRoutes from "./routes/RenderRoutes";
import { loadUser } from "./action/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/css/App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <RenderRoutes routes={ROUTES} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
