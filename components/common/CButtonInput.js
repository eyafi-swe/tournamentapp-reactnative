import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../../assets/constants/colors'
export default function CButtonInput({ style, label = 'Button', onPress, loading = false, textStyle }) {
    return (
        <TouchableOpacity style={[s.buttonContainer, style]} onPress={onPress} disabled={loading}>
            {loading && <ActivityIndicator size="small" color={'white'} />}
            <Text style={[s.buttonText, textStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        backgroundColor: colors.ICON_BG,
        paddingVertical: 20,
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
