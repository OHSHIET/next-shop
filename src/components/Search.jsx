'use client'

import styles from '@/style/Search.module.css'
import stylesMC from '@/style/MainContent.module.css'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Products from '@/components/Products'

export default function Search() {

    const searchParams = useSearchParams()
    const query = searchParams.get('q')

    const [found, setFound] = useState(null)
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    const findProducts = async () => {
        const response = await fetch(`/api/findProducts?q=${query}`)
        const data = await response.json()
        if (!data.ok) {
            setErr(() => true)
            setErrMsg(() => data.message)
            return
        }

        setFound(() => data.products)
    }

    useEffect(() => {
        findProducts()
    }, [])

    return (
        <>
            <div className={styles.search}>
                <div>Search results for query: "{query}"</div>
            </div>
            <div className={stylesMC.contentSearch}>
                <div className={`${stylesMC.containerSearch} container-fluid`}>
                    <Products products={found} isSearch={true} isCart={true} err={err} errMsg={errMsg} />
                </div>
            </div>
        </>
    )
}