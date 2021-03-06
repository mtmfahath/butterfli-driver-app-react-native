import { connect } from 'react-redux';
import RideRequest from '../components/rideRequest';

import { openMapsRoute, 
        getCurrentRoute,
        watchingDriverLocation, 
        updateBookingDetails,
        newSelectedDriverSocketId,
        updateDriverLocationDetails,
        getDriverStatus } from '../../Home/modules/home';

import { getCurrentLocation, 
        getMarkerLocation,
        getPassengerRoute,
        getTotalDistance
        } from '../modules/rideRequest';

const mapStateToProps = (state) => ({
    region: state.home.region,
    user_id: state.login.user_id,
    driverInfo: state.profile.driverInfo || {},
    driverLocation: state.home.driverLocation || {},
    bookingDetails: state.home.bookingDetails || {},
    watchDriverLocation: state.home.watchDriverLocation || {},
    driverSocketId: state.home.driverSocketId,
    driverStatus: state.home.driverStatus ,
    updateWatchDriverLocation: state.home.updateWatchDriverLocation || {},
    routes: state.rideRequest.routes || {},
    totalTripDistance: state.rideRequest.totalTripDistance || {},
    currentRoute: state.home.currentRoute
});

const mapActionCreators = {
    getCurrentLocation,
    getCurrentRoute,
    watchingDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    getPassengerRoute,
    openMapsRoute,
    updateBookingDetails,
    newSelectedDriverSocketId,
    updateDriverLocationDetails,
    getTotalDistance
};

export default connect(mapStateToProps, mapActionCreators)(RideRequest)