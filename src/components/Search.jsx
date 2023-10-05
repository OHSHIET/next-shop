'use client'

import styles from '@/style/Search.module.css'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Search() {

    const searchParams = useSearchParams()
    const query = searchParams.get('q')

    const [found, setFound] = useState()

    const findProducts = async () => {
        const response = await fetch(`/api/findProducts?q=${query}`)
        const data = await response.json()
        if(!data.ok){
            setFound(() => data.message)
        }
        else
        setFound(() => data.products)

        console.log(found)
    }

    useEffect(() => {
        findProducts()
    }, [])

    return (
        <div className={styles.search}>
            <div>Search results for query: "{query}"</div>
            <div className={styles.results}>
                {found}
            </div>
        </div>
    )
}