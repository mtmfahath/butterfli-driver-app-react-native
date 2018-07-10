import { connect } from 'react-redux';
import RideRequest from '../components/rideRequest';

import { getCurrentLocation, 
        openMapsRoute,
        watchDriverLocation,
        getDriverStatus,
        getMarkerLocation,
        getPassengerRoute
        } from '../modules/rideRequest';

const mapStateToProps = (state) => ({
    region: state.home.region,
    driverInfo: state.home.driverInfo || {},
    driverLocation: state.home.driverLocation || {},
    bookingDetails: state.home.bookingDetails || {},
    watchDriverLocation: state.home.watchDriverLocation || {},
    driverSocketId: state.home.driverSocketId,
    driverStatus: state.home.driverStatus ,
    updateWatchDriverLocation: state.home.updateWatchDriverLocation || {},
    routes: state.rideRequest.routes || {}
});

const mapActionCreators = {
    getCurrentLocation,
    openMapsRoute,
    watchDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    getPassengerRoute
};

export default connect(mapStateToProps, mapActionCreators)(RideRequest)