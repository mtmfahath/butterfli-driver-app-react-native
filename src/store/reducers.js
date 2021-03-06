import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/modules/home";
import { RideRequestReducer as rideRequest } from "../routes/RideRequest/modules/rideRequest"; 
import { PickUpReducer as pickUp } from "../routes/PickUp/modules/pickUp";
import { DropOffReducer as dropOff } from "../routes/DropOff/modules/dropOff";
import { reducer as formReducer } from 'redux-form';
import { LoginReducer as login } from '../routes/Login/modules/login';
import { MenuReducer as menu } from '../routes/Menu/modules/menu';
import { AlertsReducer as alerts } from '../routes/Alert/modules/alerts';
import { ProfileReducer as profile } from '../routes/Profile/modules/profile';



export const makeRootReducer = (asyncReducers) =>
(state, action) => {
	return combineReducers({
		home,
		rideRequest,
		pickUp,
		dropOff,
		form: formReducer,
		login,
		menu,
		alerts,
		profile,
		...asyncReducers
	})(action.type === 'UNAUTH_USER' ? undefined : state, action);
}

export default makeRootReducer;

// // This is needed if you use reducer code split (you don't put ALL your reducers in the makeRootReducer function...). 
// export const injectReducer = (store, { key, reducer }) => {
// 	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
 
// 	store.asyncReducers[key] = reducer
// 	store.replaceReducer(persistReducer(persistConfig, combineReducers(makeRootReducer(store.asyncReducers))))
// 	store.persistor.persist() // => **I think this is not needed anymore, i left it here when i was trying to make all this work together...**
//  }