import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import { API_URL } from '../../../api';
import axios from 'axios';

import { addAlert } from '../../Alert/modules/alerts';

//-------------------------------
// Constants
//-------------------------------
const { 
    UNAUTH_USER,
    GET_DRIVER_INFORMATION,
    EDITTING_PROFILE,
    USER_PROFILE_UPDATED,
    DRIVER_RIDE_HISTORY,
    UPDATE_VEHICLE_TYPE       
    } = constants;


//-------------------------------
// Intial Stat
//-------------------------------

const initialState = {
    canEdit: false
};



//-------------------------------
// Action
//-------------------------------

export function authUser(user_id){
   return(dispatch) => {
       dispatch({
           type: AUTH_USER,
           payload: user_id
       });
   }
}

export function getDriverInfo() {
    return (dispatch, store) => {
        let user_id = store().login.user_id;
        console.log(user_id);
        let id = "5b5d05220fdb907bdb8a5c2d";

        return axios.get(`${API_URL}/api/driver/` + user_id, {
            headers: {authorization: store().login.token}
        }).then((res) => {
            console.log("This is Get Driver Info", res);
            dispatch({
                type: GET_DRIVER_INFORMATION,
                payload: res.data
            });
        }).catch((error) => {
            console.log(error);
            dispatch(addAlert("Could not get Driver Profile."));
        });

    }
}

export function canEditProfile() {
    return(dispatch, store) => {
        dispatch({
            type:EDITTING_PROFILE,
            payload: !store().profile.canEdit
        })
    }
}

export function changeVehicleServiceType(value){
    return(dispatch, store) => {
        newDriver = {
            ...store().profile.driverInfo,
            serviceType: value
        }
        
        dispatch({
            type: UPDATE_VEHICLE_TYPE ,
            payload: newDriver
        })
    }
}

export function updateDriverProfile(){
    return(dispatch, store) => {
        var details = {
            ...store().profile.driverInfo
        }
        console.log(details);
        update_Profile_Url = API_URL + "/api/driver/" + store().login.user_id;
        return axios.put(update_Profile_Url, details, {
            headers: {authorization: store().login.token}
        }).then((response) => {
             var details = response.data;
            //  dispatch(addAlert("User Profile Updated"));
             dispatch({
                 type: USER_PROFILE_UPDATED,
                 payload: details
             });
            //  Actions.home({type: "replace"})
            //  dispatch(isSigningUp(false));

        }).catch((error) => {
            // dispatch(addAlert("Could not update Driver Profile."));
            // dispatch(isSigningUp(false));
            console.log(error)
        });
    }
 }

export function getRideHistory(){
    return(dispatch, store) => {
        const driverId = store().login.user_id
        const rideHistoryUrl = API_URL + "/api/driver/" + driverId + "/bookings";
        console.log(rideHistoryUrl);
        return axios.get(rideHistoryUrl, {
            headers: {authorization: store().login.token}
        }).then((response) => {
             var rideHistory = response.data;
             console.log(rideHistory);
             dispatch({
                 type: DRIVER_RIDE_HISTORY,
                 payload: rideHistory
             });
        }).catch((error) => {  
            console.log(error); 
            dispatch(addAlert("Could not get Ride History."));
        });
    }
}

//-------------------------------
// Action Handlers
//-------------------------------

function handleGetDriverInfo(state, action) {
    return update(state, {
        driverInfo: {
            $set: action.payload
        }
    });
}
function handleCanEditProfile(state, action ) {
    return update(state, {
        canEdit: {
            $set: action.payload
        }
    })
}


function handleChangeServiceType(state, action ) {
    return update(state, {
        driverInfo: {
            $set: action.payload
        }
    })
}

function handleGetRideHistory(state, action ) {
    return update(state, {
        rideHistory: {
            $set: action.payload
        }
    })
}


const ACTION_HANDLERS = {
    GET_DRIVER_INFORMATION: handleGetDriverInfo,
    EDITTING_PROFILE: handleCanEditProfile,
    USER_PROFILE_UPDATED: handleGetDriverInfo,
    UPDATE_VEHICLE_TYPE: handleChangeServiceType,
    DRIVER_RIDE_HISTORY: handleGetRideHistory
}



export function ProfileReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}