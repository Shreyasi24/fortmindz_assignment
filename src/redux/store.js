import { createStore, applyMiddleware, combineReducers } from "redux";
import { employeeReducer } from "./reducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  employee: employeeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
