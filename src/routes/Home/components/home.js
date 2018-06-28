import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';



import MapContainer from './MapContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import FooterComponent from '../../../Components/FooterComponent';
import Fab from './FAB';
import NewBookingCard from './NewBookingCard'


const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class Home extends React.Component {


    
    componentDidMount(){
        var rx = this;
        this.props.getCurrentLocation();
        this.props.getDriverInfo();
        this.props.getDriverSocketId();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.bookingDetails) {
            console.log("You have a new booking");
        }
    }

    render() {
        
        const region = {
            latitude: 34.060988,
            longitude:-118.302358,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        
        return(
        <Container>
                <View style={{flex:1}}>
                    <HeaderComponent logo={buttefliLogo}/>
                    {this.props.region.latitude &&
                        <MapContainer region={this.props.region} 
                        getInputData={this.props.getInputData}
                        carMarker={carMarker}
                        />
                    }
                    <NewBookingCard />
                    <Fab onPressAction={() => this.props.postDriverLocation()}/>
                    <FooterComponent />
                </View>            
        </Container>
        );
       
    }
}

export default Home;