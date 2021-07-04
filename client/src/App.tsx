import React, {useState} from 'react';
import './App.css';
import { Header } from './components/Header';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { CardsForTraining } from './components/CardsForTraining';
import { CardsForPlay } from './components/CardsForPlay';
import { useSelector, useDispatch } from "react-redux";
import { GameFinishPageSuccess } from './components/GameFinishPageSuccess';
import { GameFinishPageErrors } from './components/GameFinishPageErrors';
import { WordsStatistics } from './components/WordsStatistics';
import { Categories } from './components/Categories';


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
                  {isModeGameTraining && <Route exact  path={`/category/words/:id`} component={withRouter(CardsForTraining)}/>}
                  {!isModeGameTraining && <Route exact  path={`/category/words/:id`} component={withRouter(CardsForPlay)}/>}
                  <Route exact  path={`/success`} component={withRouter(GameFinishPageSuccess)}/>
                  <Route exact  path={`/errors/:id`} component={withRouter(GameFinishPageErrors)}/>
                  <Route exact  path={`/statistics`} component={withRouter(WordsStatistics)}/>
                  <Route exact  path={`/`} component={withRouter(Categories)}/>
                </Switch>
          </Router>    
    </div>
   
  );
}

export default App;
