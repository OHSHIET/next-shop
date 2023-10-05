"use client"

import React, { useEffect, useState } from 'react'
import Products from '@/components/Products'
import { useRouter } from 'next/navigation'

export default function Cart() {

    const router = useRouter()

    const [cart, setCart] = useState()
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState()

    const makeRequest = async () => {
        const session = await fetch('/api')
        const sessionData = await session.json()

        if (!sessionData.authenticated) {
            router.push('/login')
        }

        const response = await fetch(`/api/getCart?q=${sessionData.name}`)
        const data = await response.json()
        if (!data.ok) {
            setErr(() => true)
            setErrMsg(() => data.message)
            return
        }
        setCart(() => data.items.cart)
    }

    useEffect(() => {
        makeRequest()
    }, [])

    return (
        <Products products={cart} isCart={true} err={err} errMsg={errMsg} />
    )
}