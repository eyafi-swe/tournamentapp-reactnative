import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../../assets/constants/colors'
import GoogleIcon from '../../assets/svg/GoogleIcon'
export default function CGoogleButtonInput({ style, label = 'Button', onPress, loading = false, textStyle }) {
    return (
        <TouchableOpacity style={[s.buttonContainer, style]} onPress={onPress} disabled={loading}>
            {loading && <ActivityIndicator size="small" color={'white'} />}
            <View style={{ display: 'flex', gap: 3, alignItems: 'center', flexDirection: 'row' }}>
                <GoogleIcon />
                <Text style={[s.buttonText, textStyle]}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        backgroundColor: colors.ICON_BG,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },

    buttonText: {
        color: colors.WHITE,
        fontWeight: 'bold',
        fontSize: 18,
    },
})
