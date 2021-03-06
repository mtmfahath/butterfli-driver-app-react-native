import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const styles = ({
    headerContainer:{
        backgroundColor: "white",
        justifyContent: "center",
        paddingLeft:15,
        paddingRight:15,
        height: 70,
        borderBottomWidth:1,
        borderColor: "grey" 
    },
    subText: {
        fontSize: 8
    },
    innerContainer: {
        width: width * 0.95,
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        paddingLeft: 50,
        paddingRight: 50,
    },
    arrivalTextContainer: {
        flex: 2,
        height: 50,
        paddingLeft:15,
        paddingRight:15,
        justifyContent: "center"
    },
    iconButton: {
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    arrivalText: {
        fontSize: 14,
        color:"black",
    },
    btnText: {
        fontSize: 15
    },
    timeIconContainer: {
        paddingRight: 10
    }

})

export default styles;