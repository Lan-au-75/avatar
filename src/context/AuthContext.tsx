import { auth, db } from '@/firebase'
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface Props {
    user: User | null
    fullName: string
    errorMessage: string
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logOut: () => Promise<void>
    googleSignIn: () => Promise<void>
    facebookSignIn: () => Promise<void>
}

const AuthContext = createContext<Props>({
    user: null,
    fullName: '',
    errorMessage: '',
    googleSignIn: async () => {},

    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    facebookSignIn: async () => {},
})

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => JSON.parse(localStorage.user ?? null) ?? null)
    const [fullName, setFullName] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)

            // Cloud Firestore
            await setDoc(doc(db, 'users', email), {
                fullName,
                savedMovies: [],
            })
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider()

            const { user } = await signInWithPopup(auth, provider)

            // Cloud Firestore
            await setDoc(doc(db, 'users', user.email as string), {
                fullName,
                savedMovies: [],
            })
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    const facebookSignIn = async () => {
        try {
            const provider = new FacebookAuthProvider()

            const { user } = await signInWithPopup(auth, provider)

            // Cloud Firestore
            await setDoc(doc(db, 'users', user.email as string), {
                fullName,
                savedMovies: [],
            })
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    const logOut = () => signOut(auth)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)

                localStorage.setItem('user', JSON.stringify(currentUser))

                if (typeof localStorage !== 'undefined') {
                    JSON.parse(localStorage.getItem('user') as string)
                }

                // get fullName

                ;(async () => {
                    const UserRef = doc(db, 'users', currentUser?.email as string)
                    const docSnap = await getDoc(UserRef)

                    const result = docSnap.data()

                    result && setFullName(result.fullName)
                })()

                // console.log({ user })
            } else {
                // console.log('fail')
            }
        })

        return () => unsubscribe()
    }, [user])

    return (
        <AuthContext.Provider
            value={{
                user,
                fullName,
                errorMessage,
                signIn,
                signUp,
                logOut,
                googleSignIn,
                facebookSignIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const userAth = () => useContext(AuthContext)
