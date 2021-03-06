import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const styles = ({
    footerContainer:{
        backgroundColor: "white",
        borderBottomWidth:1,
        borderColor: "grey"
    },
    subText: {
        fontSize: 8
    },
    buttonContainer: {
        width: width,
        // paddingTop: 5,
        // paddingBottom: 5,
        justifyContent: "center",
        flexDirection:"row",
    },
    navButton: {
        width: width * 0.8,
        width: width,
        justifyContent: "center",
        borderRadius: 0
    },
    btnText: {
        fontSize: 20,
        color:"#fff",
        fontWeight: "bold",
    },

})

export default styles;