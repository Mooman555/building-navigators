import { StyleSheet } from "react-native";

export default StyleSheet.create({

    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: 'transparent',
        borderColor: '#bbb',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 38,
        left: 15
    },
    textInputProps: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        maxHeight: 40
    },

    textDarkInputProps: {
        padding: 12,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: "#F16437",
        borderRadius: 50,
        maxHeight: 40,
    },

    itemDarkStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#F16437',
        borderColor: 'white',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 38,
        left: 15
    },

    itemContainerStyle: {
        maxHeight: 140,
        zIndex: 1,
        position: 'absolute',
        marginTop: 70,
        backgroundColor: "white",
        width: "100%",
        padding: 5,
        borderRadius: 8
    },

    itemDarkContainerStyle: {
        maxHeight: 140,
        zIndex: 1,
        position: 'absolute',
        marginTop: 70,
        backgroundColor: "transparent",
        width: "100%",
        padding: 5,
        borderRadius: 8
    },

    textInputWrapper : { marginTop: '2.5%', paddingLeft: 50, borderWidth: 1, borderRadius: 50, borderColor: 'black' }

})