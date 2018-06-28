import React from 'react';
import { Text, Image } from 'react-native';
import { Header, Left, Body, Right, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './HeaderComponentStyles';

export const HeaderComponent = ({logo}) => {
    return (
        <Header style={{backgroundColor: "#E9DEFF"}} iosBarStyle="light-content">
            <Left>
                <Button transparent>
                    <Icon name="user-circle-o" style={styles.icon} />>
                </Button>
            </Left>
            <Body>
                <Image resizeMode="contain" style={styles.logo} source={logo} />
                ||
                <Text style={styles.headerText}>Driver on the way</Text>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name="gift" style={styles.icon} />>
                </Button>
            </Right>
        </Header>
    );
}

export default HeaderComponent;