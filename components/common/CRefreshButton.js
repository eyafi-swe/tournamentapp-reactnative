import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Refresh from '../../assets/svg/Refresh';
import colors from '../../assets/constants/colors';

const CRefreshButton = ({
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.plusButton} onPress={onPress}>
            <Refresh />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    plusButton: {
        position: 'absolute',
        bottom: 60,
        opacity: 0.8,
        right: 10,
        backgroundColor: colors.ICON_BG,
        borderRadius: 100,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
})

export default CRefreshButton;