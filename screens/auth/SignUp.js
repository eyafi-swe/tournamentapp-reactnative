import { useContext, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import g from '../../assets/styles/global'
import CText from '../../components/common/CText'
import colors from '../../assets/constants/colors'
import CInput from '../../components/common/CInput'
import CButtonInput from '../../components/common/CButtonInput'
import { AuthContext } from '../../context/UserContext'
import { BASE_URL } from '../../utils/constants'

const SignUp = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, signUpWithEmail } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState({
        email: '',
        password: '',
        name: '',
    })

    const handleSignUp = () => {
        setLoading(true)
        if (name === '') {
            setErrorMessage({ ...errorMessage, name: 'Name is required' })
            setLoading(false)
            return
        }
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

        // handleSignUp()
        signUpWithEmail(email, password)
            .then((res) => {
                console.log(res)
                // navigation.navigate('Home')
                saveUser()
            })
            .catch((err) => {
                console.log(err)
                Alert.alert('Error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })

    }


    const saveUser = () => {
        const user = {
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
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                console.log('finally')
            })
    }

    if (!loading) {
        return (
            <View style={[s.container]}>
                {/* <LogoIcon /> */}
                <Text style={s.header}>Cholo Kheli</Text>
                <CInput
                    spaces={false}
                    maxLength={255}
                    placeholder="Name"
                    style={s.input}
                    value={name}
                    setValue={setName}
                    errorMessage={errorMessage.name}
                />
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

                <CButtonInput label='Sign Up' style={{ width: '100%' }} onPress={handleSignUp} loading={loading} />
                {/* <CButtonInput label='Sign Up' style={{ width: '100%' }} onPress={saveUser} loading={loading} /> */}
                <CText style={{ marginTop: 28 }}>
                    Already have an account?{' '}
                    <Text
                        onPress={() => {
                            navigation.replace('SignIn')
                        }}
                        style={{ color: colors.SIGN_IN_BTN_BG, textDecorationLine: 'underline' }}
                    >
                        Sign in here
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
        color: colors.WHITE,
        fontSize: 32,
        fontFamily: 'inter-bold',
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

export default SignUp
