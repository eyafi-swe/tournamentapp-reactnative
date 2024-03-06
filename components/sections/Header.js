import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NotificationIcon from '../../assets/svg/NotificationIcon'
import colors from '../../assets/constants/colors';

const Header = ({ navigation, newsCount }) => {
    return (
        <View style={s.headerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/img/Logo.png')} style={{ width: 48, height: 45, }} />
                <Text style={{ color: colors.WHITE, marginLeft: 5, fontSize: 16, fontWeight: 'bold' }}>CholoKheli</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('News')}>
                <NotificationIcon numb={newsCount} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const s = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.TOP_BOTTOM_BG,
        marginBottom: 24,
        // marginTop: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        // borderWidth: 1,

        borderColor: colors.WHITE,

    },
});