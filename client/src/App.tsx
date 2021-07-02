import React, {useState} from 'react';
import './App.css';
import { Header } from './components/Header';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { CardsForTraining } from './components/CardsForTraining';
import { CardsForPlay } from './components/CardsForPlay';
import { useSelector, useDispatch } from "react-redux";


type StoreTypeInterface = {
  isModeGameTraining: boolean,
}




function App() {

  const isModeGameTraining = useSelector( (state: StoreTypeInterface) => state.isModeGameTraining);
  return (
    <div className="container">
          <Router>
              <Header/> 
              <Switch>
                {!isModeGameTraining && <Route exact  path={`/category/words/:id`} component={withRouter(CardsForTraining)}/>}
                {isModeGameTraining && <Route exact  path={`/category/words/:id`} component={withRouter(CardsForPlay)}/>}
              </Switch>
          </Router>    
    </div>
   
  );
}

export default App;
