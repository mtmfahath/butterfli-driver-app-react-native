import React, { Component } from 'react';
var moment = require('moment');
import { connect } from 'react-redux';
import { View, Image, ScrollView } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RideHistoryStyles';

import { getCurrentRoute } from '../../../Home/modules/home';
import { getRideHistory } from '../../modules/profile';

class RideHistoryContainer extends React.Component { 
	componentDidMount(){
		this.props.getCurrentRoute();
		this.props.getRideHistory();
	}

	render() {
		const { bookingDetails, rideHistory } = this.props
		const { firstName, lastName, tripDistance, tripDuration, bookingCompletedAt} = bookingDetails || {}
		console.log("this is the ride history", rideHistory);
		return (
			<Container>
				<Header />
					{/*
						<View style={{borderBottomWidth: 2, borderColor: '#ECECEC', marginBottom: 20, alignItems: "center"}}>
							<Text style={{fontSize: 16, fontWeight: "700", marginTop: 20, marginBottom: 15}}>Ride History</Text>
						</View>
					*/}
					
					<Content style={{paddingTop: 10}}>
					{(rideHistory && rideHistory.length > 0) &&
							<List 
							dataArray={rideHistory} 
							renderRow={(item) =>
								<ListItem avatar style={{paddingBottom: 10}}>
								<Left>
									{ item.profilePic &&
										<Thumbnail source={{ uri: item.profilePic }} />
										||
										<Icon name="user-circle-o" style={{ color: "#fff", fontSize: 30, opacity: 5}} />
									}
								</Left>
								<Body>
									<Text>{item.firstName + " " + item.lastName}</Text>
									{ item.tripDistance[0] &&
										<Text note>
											{item.tripDistance[0].totalMiles + "mi  "}
												<Icon name="circle" style={{ marginHorizontal: 5, color: "#ccc", fontSize: 8, opacity: 5}} />
											{"  " + item.tripDistance[0].totalTime + "m"}
										</Text>
									}
								</Body> 
								<Right>
									<Text note>{moment(item.bookingCreateAt).format('MMM Do YYYY, h:mm a')}</Text>
								</Right>
								</ListItem>
							}
							/>
							||
							<View style={styles.noHistoryContainer}>
								<Text> No Ride History</Text>
							</View>
						}
					</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
   driverInfo: state.profile.driverInfo || {},
   user_id: state.home.user_id,
   rideHistory: state.profile.rideHistory || {},
   bookingDetails: state.home.bookDetails || {}
});

const mapActionCreators = {
	getCurrentRoute,
	getRideHistory
};
export default connect(mapStateToProps, mapActionCreators)(RideHistoryContainer)