import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { forwardRef, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import CText from './CText'
import g from '../../assets/styles/global'
import colors from '../../assets/constants/colors'
import EyeIcon from '../../assets/svg/EyeIcon.js'
const CInput = forwardRef(
    (
        {
            label,
            onFocus,
            multiline,
            password,
            value,
            setValue,
            placeholder,
            labelStyle = {},
            style,
            inputStyle,
            autoFocus,
            keyboardType,
            maxLength = 255,
            contextMenuHidden,
            errorMessage,
        },
        ref
    ) => {
        const [height, setHeight] = useState(54)
        const [showPassword, setShowPassword] = useState(password)
        React.useEffect(() => {
            if (multiline && value === '') {
                setHeight(128)
            }
        }, [value])

        const togglePassword = () => {
            setShowPassword((prev) => !prev)
        }
        return (
            <>
                <View style={[s.container, style, errorMessage && { marginBottom: 0 }]}>
                    {label ? <CText style={[g.caption1, s.label, labelStyle]}>{label}</CText> : null}

                    <View style={s.inputSection}>
                        <TextInput
                            ref={ref}
                            multiline={multiline}
                            value={value}
                            onChangeText={(e) => {
                                setValue(e)
                            }}
                            onContentSizeChange={(event) => {
                                setHeight(event.nativeEvent.contentSize.height)
                            }}
                            autoFocus={autoFocus}
                            onFocus={onFocus}
                            keyboardType={keyboardType}
                            secureTextEntry={password && showPassword}
                            placeholderTextColor={colors.PRIM_CAPTION}
                            style={[
                                g.body1,
                                s.input,
                                multiline ? { textAlignVertical: 'top', height: Math.max(54, height) } : null,
                                inputStyle,
                                style,
                            ]}
                            placeholder={placeholder || 'Label'}
                            maxLength={maxLength}
                            contextMenuHidden={contextMenuHidden}
                        />
                        {password && (
                            <TouchableOpacity style={s.iconContainer} onPress={togglePassword}>
                                <EyeIcon />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={[{ width: '100%' }, errorMessage && { marginBottom: 16 }]}>
                    <CText style={{ color: '#E9203B' }}>{errorMessage}</CText>
                </View>
            </>
        )
    }
)

const s = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: colors.INPUT_BG,
        borderRadius: 8,
        minHeight: 44,
    },
    input: {
        color: colors.WHITE,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        flex: 1,
        minHeight: 34,
        backgroundColor: colors.INPUT_BG,
        paddingHorizontal: 20,
        borderRadius: 8,
        // borderWidth: 1
    },
    label: {
        color: colors.WHITE,
        marginBottom: 4,
    },
    iconContainer: {
        paddingRight: 14,
        minHeight: 88,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {

    },

    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginVertical: 20,
        borderRadius: 10,
        // borderWidth: 1
    },
    inputIcon: {
        padding: 20,
    },
})

export default CInput
