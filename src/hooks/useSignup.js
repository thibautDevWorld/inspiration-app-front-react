import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsloading] = useState(null)
    const { dispatch } = useAuthContext()


    const signup = async (email, password) => {
        setIsloading(true)
        setError(null)


        const response = await fetch(`${process.env.REACT_APP_API_URL}api/user/signup`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsloading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            setIsloading(false)
        }
    }
    return { signup, isLoading, error }
}