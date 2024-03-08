import { useContext, useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import g from '../../assets/styles/global'
import CText from '../../components/common/CText'
import colors from '../../assets/constants/colors'
import CInput from '../../components/common/CInput'
import CButtonInput from '../../components/common/CButtonInput'
import { AuthContext } from '../../context/UserContext'
import Logo from '../../assets/img/Logo.png'
import NameText from '../../assets/img/nametext2.png'
import CGoogleButtonInput from '../../components/common/CGoogleButtonInput'
import { BASE_URL } from '../../utils/constants'

const SignIn = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user, setUserInfo, fetchUser, onGoogleButtonPress, signInWithEmail } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState({
        email: '',
        password: '',
    })


    const handleGoogleSignIn = async () => {
        try {
            onGoogleButtonPress()
                .then((res) => {
                    console.log('Google user', res)
                    // navigation.navigate('Home')
                    saveUser(res.additionalUserInfo.profile.name, res.additionalUserInfo.profile.email)
                    // fetchUser(res.additionalUserInfo.profile.email)
                }
                )
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const saveUser = (name, email) => {
        const userDetails = {
            name,
            email,
            role: 'user',
            wallet: 0,
            matchPlayed: 0,
            totalkill: 0,
            totalEarned: 0,
        }

        console.log(user)
        fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log({ data })
                fetchUser(email)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                console.log('finally')
            })
    }




    const handleSignIn = () => {
        setLoading(true)
        if (email === '') {
            setErrorMessage({ ...errorMessage, email: 'Email is required' })
            setLoading(false)
            return
        }
        if (password === '') {
            setErrorMessage({ ...errorMessage, password: 'Password is required' })
            setLoading(false)
            return
        }
        if (password.length < 6) {
            setErrorMessage({ ...errorMessage, password: 'Password must be at least 6 characters' })
            setLoading(false)
            return
        }

        signInWithEmail(email, password)
            .then((res) => {
                console.log(res)
                // navigation.navigate('Home')
                fetchUser(email)
            })
            .catch((err) => {
                console.log(err)
                Alert.alert('Error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    if (!loading) {
        return (
            <View style={[s.container]}>
                {/* <LogoIcon /> */}
                <View style={{ justifyContent: 'center', alignItems: "center", marginBottom: 20 }}>
                    <Image source={Logo} style={{ width: 100, height: 100, }} />
                    <Image source={NameText} />

                </View>
                <CInput
                    spaces={false}
                    maxLength={255}
                    placeholder="Email"
                    style={s.input}
                    value={email}
                    setValue={setEmail}
                    errorMessage={errorMessage.email}
                />
                <CInput
                    spaces={false}
                    password
                    maxLength={16}
                    placeholder="Password"
                    style={s.input}
                    value={password}
                    setValue={setPassword}
                    errorMessage={errorMessage.password}
                />

                <CButtonInput label='Sign In' style={{ width: '100%', marginTop: 16 }} onPress={handleSignIn} />

                <CGoogleButtonInput
                    onPress={handleGoogleSignIn}
                    label='Google'
                    style={{ width: '100%', marginTop: 16, backgroundColor: '#9a031e' }}
                />


                <CText style={{ marginTop: 28 }}>
                    {/* <Text onPress={() => { }}>Forget Password?</Text> */}
                </CText>
                <CText style={{ marginTop: 28 }}>
                    Don’t have an account?{' '}
                    <Text
                        onPress={() => {
                            navigation.replace('SignUp')
                        }}
                        style={{ color: colors.SIGN_IN_BTN_BG, textDecorationLine: 'underline' }}
                    >
                        Sign up here
                    </Text>
                </CText>
            </View>
        )
    }
    return (
        <View style={[g.container, s.container]}>
            <ActivityIndicator size="large" color={colors.WHITE} />
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        backgroundColor: colors.BG,
        padding: 23,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // height: '100%',
        // borderWidth: 1,
        // borderColor: 'White',
        // marginVertical: 5,
        flex: 1,
        // top: 0,
        // left: 0,

        // position: 'relative',
    },
    header: {
        color: colors.BTN_BG,
        fontSize: 32,
        fontFamily: 'gaming-font',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 32,
    },
    title: {
        marginBottom: 32,
    },
    subHeader: {
        color: colors.WHITE,
        marginVertical: 16,
        fontFamily: 'inter-regular',
        fontWeight: '500',
    },
    input: {
        maxHeight: 44,
        color: colors.WHITE,
    },
    termsText: {
        marginLeft: 8,
    },
    terms: {
        alignSelf: 'flex-start',
        marginBottom: 32,
    },
    btnText: {
        color: colors.WHITE,
    },
})

export default SignIn
