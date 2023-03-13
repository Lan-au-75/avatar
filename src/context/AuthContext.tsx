import { auth, db } from '@/firebase'
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signOut,
    User,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface Props {
    user: User | null
    errorMessage: string
    googleSignIn: () => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logOut: () => Promise<void>
    facebookSignIn: () => Promise<void>
}

const AuthContext = createContext<Props>({
    user: null,
    errorMessage: '',
    googleSignIn: async () => {},

    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    facebookSignIn: async () => {},
})

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const signUp = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)

            // Cloud Firestore
            await setDoc(doc(db, 'users', email), {
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

            await signInWithRedirect(auth, provider)
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    const logOut = () => signOut(auth)

    const facebookSignIn = async () => {
        try {
            const provider = new FacebookAuthProvider()

            await signInWithRedirect(auth, provider)
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)

                localStorage.setItem('user', JSON.stringify(currentUser))

                if (typeof localStorage !== 'undefined') {
                    JSON.parse(localStorage.getItem('user') as string)
                }

                // Cloud Firestore
                ;(async () => {
                    // add collection users
                    await setDoc(doc(db, 'users', currentUser?.email as string), {
                        savedMovies: [],
                    })
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
