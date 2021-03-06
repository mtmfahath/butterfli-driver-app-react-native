import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions, Platform, Linking } from 'react-native';
import { API_URL, MAPBOX_ACCESS_TOKEN, GOOGLE_API_KEY } from '../../../api';
import { updateBookingDetails } from '../../Home/modules/home'
import { unAuthUser } from '../../Login/modules/login';
import request from '../../../util/request';
const polyline = require('@mapbox/polyline');
//-------------------------------
// Constants
//-------------------------------
const { GET_CURRENT_LOCATION, 
        DRIVER_STATUS,
        // IN_ROUTE_TO,
        // WATCH_DRIVER_LOCATION,
        MARKER_LOCATION,
        GET_PASSENGER_ROUTES,
        GET_TOTAL_DISTANCE
        } = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0181;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    region: {}
};



//-------------------------------
// Action
//-------------------------------
export function getCurrentLocation() {
    return(dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                });
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
}

export function getDriverStatus(payload){
    return(dispatch) => {
        dispatch({
            type: DRIVER_STATUS,
            payload: payload
        });
    }
}

// export function watchDriverLocation(){
//     return(dispatch, store) => {
//         navigator.geolocation.watchPosition(
//             (position) => {
//                 dispatch({
//                     type: WATCH_DRIVER_LOCATION,
//                     payload: position
//                 });

//                 if(true){
//                     console.log("Sending drivers location to passenger")
//                         dispatch({
//                             type: "server/driverlocation",
//                             payload: position
//                         });
//                 }
//             },
//             (error) => console.log(error.message),
//             {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1}
//         );
//     }
// }

export function getMarkerLocation(location){
    return(dispatch, store) => {
        dispatch({
            type: MARKER_LOCATION,
            payload: location
        });

        dispatch({
            type: "server/driverlocation",
            payload: location
        });
    }
}

export function getTotalDistance() {
    return(dispatch, store) => {
        if(store().home.watchDriverLocation){
            console.log("Getting arrival time");

            var origin1 = store().home.watchDriverLocation.coords.latitude + "," + store().home.watchDriverLocation.coords.longitude

            var origin2 = store().home.bookingDetails.pickUp.latitude + "," + store().home.bookingDetails.pickUp.longitude;

            var destination2 = store().home.bookingDetails.dropOff.latitude + "," + store().home.bookingDetails.dropOff.longitude;

            request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
            .query({
                units: 'imperial',
                // origins: store().home.updateWatchDriverLocation.coordinates.coordinates[1] + 
                // "," + store().home.updateWatchDriverLocation.coordinates.coordinates[0],
                // origins: store().home.watchDriverLocation.coords.latitude + 
                // "," + store().home.watchDriverLocation.coords.longitude,
                origins: origin1 + "|" + origin2,
                // destinations: store().home.bookingDetails.pickUp.latitude + 
                // "," + store().home.bookingDetails.pickUp.longitude,
                destinations: origin2 + "|" + destination2,
                mode: "driving",
                key: GOOGLE_API_KEY
            })
            .finish((error, res) => {
                console.log(error);
                route1 =  res.body.rows[0].elements[0].distance.value
                route2 =  res.body.rows[1].elements[1].distance.value
                time1 = res.body.rows[0].elements[0].duration.value
                time2 = res.body.rows[1].elements[1].duration.value
                totalMiles = (route1 + route2) / 1609.344;
                totalTime = (time1 + time2) / 60;
                console.log("This is the total miles expected to be traveled", totalMiles);
                console.log("This is the total time expected to be traveled", totalTime);
                dispatch({
                    type: GET_TOTAL_DISTANCE,
                    payload: {
                        totalTime: Math.round(totalTime * 100) / 100,
                        totalMiles: Math.round(totalMiles * 100) / 100
                    }
                });
                dispatch(updateBookingDetails("tripDistance", {
                    totalTime: Math.round(totalTime * 100) / 100, 
                    totalMiles: Math.round(totalMiles * 100) / 100
                }));
            })
        }
    }
}


// export function openMapsRoute(payload){
//     return(dispatch, store) => {
//         const pickUpArr = {
//             latitude:  store().home.bookingDetails.pickUp.latitude,
//             longitude: store().home.bookingDetails.pickUp.longitude 
//         };

//         const dropOffArr = {
//             latitude:  store().home.bookingDetails.dropOff.latitude,
//             longitude: store().home.bookingDetails.dropOff.longitude
//         };

//          buildLngLat = (position) => {
//             console.log(position);
//             console.log(position.latitude);
//             return `${position.latitude},${position.longitude}`
//         }
        
//         const origin = buildLngLat(pickUpArr);
//         const destination = buildLngLat(dropOffArr);

//         buildMapBoxUrl = (origin, destination) => {
//             return `http://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`
//         } 

//         const url = buildMapBoxUrl(origin, destination);
        
//         console.log('open directions') 
//         if (Platform.OS === "ios") { 
//             let updateBooking = {
//                 ...store().home.bookingDetails,
//                 inRouteTo: payload
//             }

//             Linking.openURL(url)
//             dispatch({
//                 type:IN_ROUTE_TO,
//                 payload: updateBooking
//             })

//         } else { 
//             Linking.openURL('http://maps.google.com/maps?daddr='); 
//         } 
//     }
// }

// Get polyline route from Mapbox for route between pick and drop-off location

export function getPassengerRoute(){

    return(dispatch, store) => {
        
        const driverArr = {
            // latitude:  store().home.updateWatchDriverLocation.coordinates.coordinates[1],
            // longitude: store().home.updateWatchDriverLocation.coordinates.coordinates[0]
            latitude:  store().home.watchDriverLocation.coords.latitude,
            longitude: store().home.watchDriverLocation.coords.longitude,
        }   

        const pickUpArr = {
            latitude:  store().home.bookingDetails.pickUp.latitude,
            longitude: store().home.bookingDetails.pickUp.longitude 
        };
    
        const dropOffArr = {
            latitude:  store().home.bookingDetails.dropOff.latitude,
            longitude: store().home.bookingDetails.dropOff.longitude
        };
    
        buildLngLat = (position) => {
            return `${position.longitude},${position.latitude}`
        }
    
        buildMapBoxUrl = (mode, driver, origin, destination, accessToken) => {
            return `https://api.mapbox.com/directions/v5/mapbox/${mode}/${driver};${origin};${destination}.json?access_token=${accessToken}&steps=true&overview=full&geometries=polyline`
        }
    
        const mode = 'driving';
        const origin = buildLngLat(pickUpArr);
        const destination = buildLngLat(dropOffArr);
        const driver = buildLngLat(driverArr);
        const url = buildMapBoxUrl(mode, driver, origin, destination, MAPBOX_ACCESS_TOKEN);
        // const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${driver};${origin};${destination}.json?access_token=${accessToken}&steps=true&overview=full&geometries=polyline`
    
        getCoordinates = (json) => {
            let route = []
        
            if (json.routes.length > 0) {
              json.routes[0].legs.forEach(legs => {
                legs.steps.forEach(step => {
                  polyline.decode(step.geometry).forEach(coord => route.push(coord))
                })
              })
            }
        
            return route.map(l => ({latitude: l[0], longitude: l[1]}))
        }
        console.log(url);

        if(store().home.bookingDetails.pickUp && store().home.bookingDetails.dropOff){
            fetch(url).then(response => response.json()).then(json => {

                const getLineRoute = getCoordinates(json);
                dispatch({
                    type: GET_PASSENGER_ROUTES,
                    payload: getLineRoute
                })
                // this.route = {};
                // this.route1 = this.getCoordinates(json);
            }).catch(e => {
              console.warn(e)
              	if (error.response.status === 401) {
                	dispatch(unAuthUser());
                	Actions.login({type: 'replace'})
            	}
            })
        }
    }    
}

//-------------------------------
// Action Handlers
//-------------------------------

function handleGetCurrentLocation(state, action) {
    return update(state, {
        region: {
            latitude: {
                $set: action.payload.coords.latitude
            },
            longitude: {
                $set: action.payload.coords.longitude
            },
            latitudeDelta: {
                $set: LATITUDE_DELTA
            },
            longitudeDelta: {
                $set: LONGITUDE_DELTA
            }
            
        }
    });
}

function handleDriverStatus(state, action){
    return update(state, {
        driverStatus: {
            $set: action.payload
        }
    });
}

// function handelWatchDriverLocation(state, action) {
//     return update(state, {
//         watchDriverLocation: {
//             $set: action.payload
//         }
//     });
// }

function handleUpdateDriverLocation(state, action) {
    return update(state, {
        updateWatchDriverLocation: {
            $set: action.payload
        }
    });
}

function handleGetTotalDistance(state, action) {
    return update(state, {
        totalTripDistance: {
            $set: action.payload
        }
    });
}

function handleGetMarkerLocation(state, action) {
    return update(state, {
        markerLocation: {
            $set: action.payload
        }
    });
}


// function handleInRouteTo(state, action){
//     return update(state, {
//         bookingDetails: {
//             $set: action.payload
//         }
//     });
// }

function handleGetPassengerRoutes(state, action) {
    return update(state, {
        routes: {
            $set:action.payload
        }
    })
}


const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    DRIVER_STATUS: handleDriverStatus,
    // IN_ROUTE_TO: handleInRouteTo,
    // WATCH_DRIVER_LOCATION: handelWatchDriverLocation,
    UPDATE_WATCH_LOCATION: handleUpdateDriverLocation,
    MARKER_LOCATION: handleGetMarkerLocation,
    GET_PASSENGER_ROUTES: handleGetPassengerRoutes,
    GET_TOTAL_DISTANCE: handleGetTotalDistance
}



export function RideRequestReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}