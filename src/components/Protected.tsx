import { userAth } from '@/context/AuthContext'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected({ children }: { children: ReactNode }) {
    const { user } = userAth()

    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate('/login')
        }
    }, [user])

    return <>{children}</>
}

export default Protected
