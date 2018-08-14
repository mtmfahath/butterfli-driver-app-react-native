import { connect } from 'react-redux';
import PickUp from '../components/pickUp';
import { getDriverStatus } from '../../Home/modules/home';

import { updateBookingDetails, 
        getMarkerLocation, 
        openMapsRoute,
        getCurrentLocation} from '../../Home/modules/home';

import { 
        // updateBookingDetails, 
        watchDriverLocation,
        // getMarkerLocation,
        // getNearDriverAlerted,
        getDistanceFrom,
        getPickUpRoute
        } from '../modules/pickUp';

const mapStateToProps = (state) => ({
    region: state.home.region,
    inputData: state.home.inputData || {},
    driverInfo: state.home.driverInfo || {},
    driverLocation: state.home.driverLocation || {},
    bookingDetails: state.home.bookingDetails || {},
    watchDriverLocation: state.home.watchDriverLocation || {},
    driverSocketId: state.home.driverSocketId,
    driverStatus: state.home.driverStatus,
    // nearDriverAlerted: state.home.nearDriverAlerted, 
    updateWatchDriverLocation: state.home.updateWatchDriverLocation || {},
    routes: state.rideRequest.routes || {},
    distanceFrom: state.pickUp.distanceFrom || {},
    pickUpRoutes: state.pickUp.pickUpRoutes || {}
});

const mapActionCreators = {
    getCurrentLocation,
    openMapsRoute,
    watchDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    // getNearDriverAlerted,
    getDistanceFrom,
    updateBookingDetails,
    getPickUpRoute
};

export default connect(mapStateToProps, mapActionCreators)(PickUp)