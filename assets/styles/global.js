import { Platform, StatusBar, StyleSheet } from 'react-native'
import colors from '../constants/colors'

export default StyleSheet.create({
    h1: {
        fontSize: 30, //34,
        lineHeight: 34, //41,
        fontFamily: 'inter-bold',
        textAlignVertical: 'center',
    },
    initailTitle: {
        fontSize: 24,
        lineHeight: 29,
        fontFamily: 'inter-semibold',
        textAlignVertical: 'center',
        color: 'white',
        textAlign: 'center',
    },
    initailText: {
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'inter-medium',
        textAlignVertical: 'center',
        color: 'white',
        textAlign: 'center',
    },
    title1: {
        fontSize: 28,
        lineHeight: 34,
        fontFamily: 'inter-bold',
        textAlignVertical: 'center',
    },
    title2: {
        fontSize: 22,
        lineHeight: 27,
        fontFamily: 'inter-semibold',
        textAlignVertical: 'center',
    },
    title3: {
        fontSize: 20,
        lineHeight: 24,
        fontFamily: 'inter-semibold',
        textAlignVertical: 'center',
    },
    button: {
        fontSize: 18,
        lineHeight: 22,
        fontFamily: 'inter-bold',
        textAlignVertical: 'center',
    },
    body1: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'inter-medium',
        textAlignVertical: 'center',
        color: '#000E29'
    },
    body2: {
        fontSize: 14,
        lineHeight: 17,
        fontFamily: 'inter-medium',
        textAlignVertical: 'center',
    },
    body3: {
        fontSize: 14,
        lineHeight: 17,
        fontFamily: 'inter-bold',
        textAlignVertical: 'center',
    },
    footnote: {
        fontSize: 13,
        lineHeight: 16,
        fontFamily: 'inter-medium',
        textAlignVertical: 'center',
    },
    caption1: {
        fontSize: 12,
        lineHeight: 15,
        fontFamily: 'inter-medium',
        textAlignVertical: 'center',
    },
    caption2: {
        fontSize: 11,
        lineHeight: 13,
        fontFamily: 'inter-medium',
        textAlignVertical: 'center',
    },
    callout: {
        fontSize: 16,
        lineHeight: 18,
        fontFamily: 'inter-regular',
        textAlignVertical: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        border: '5px solid black',
    },
    containerBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 5,
    },
    containerRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    outerContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.BLACK,
    },
    innerContainer: {
        paddingTop: Platform.OS !== 'ios' ? StatusBar.currentHeight : StatusBar.currentHeight + 60,
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    padding1x: {
        padding: 8,
    },
    padding2x: {
        padding: 16,
    },
    marginVertical1x: {
        marginVertical: 8,
    },
    marginVertical2x: {
        marginVertical: 16,
    },
    spaceBelow: {
        marginBottom: 82,
    },
    floatingPlus: {
        position: 'absolute',
        bottom: -15,
        right: 0,
    },
    hFlex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listingSpaceBelow: {
        marginBottom: 55
    },
    loaderConterainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
})
