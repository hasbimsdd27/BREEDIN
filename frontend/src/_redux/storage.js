import { createStore, combineReducers, applyMiddleware } from "redux";

import { promise, logger } from "../middleware";
import auth from "../_reducers/auth";
import age from "../_reducers/age";
import species from "../_reducers/species";
import pet from "../_reducers/pet";
import payment from "../_reducers/payment";

const rootReducers = combineReducers({
  auth,
  age,
  species,
  pet,
  payment
});
const store = createStore(rootReducers, applyMiddleware(promise, logger));
export default store;
