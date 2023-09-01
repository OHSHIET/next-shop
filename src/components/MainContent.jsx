"use client"

import React, { useEffect, useState } from 'react';
import styles from '@/style/MainContent.module.css';
import Link from 'next/link'

export default function MainContent() {

    // mainProducts for storing info about all products
    // products will change depending on the filter

    const [products, setProducts] = useState()
    const [mainProducts, setMainProducts] = useState()
    const [currentCategory, setCurrentCategory] = useState('all_products')

    const makeRequest = async () => {
        const response = await fetch('/api/getProducts')
        const data = await response.json()
        setMainProducts(() => data.products)
        setProducts(() => data.products)
    }

    useEffect(() => {
        makeRequest()
    }, [])

    const changeCategory = (e) => {
        setProducts(() => mainProducts)
        const category = e.target.value
        setCurrentCategory(() => category)
        const filtered = mainProducts.filter(product => category === 'all_products' || product.category === category)
        setProducts(() => filtered)
    }

    function Sidebar() {

        let categories = []

        return (
            <div className={styles.sidebar}>
                {(products) ?
                    <>
                        <h3 className={styles.categoriesheader}>Categories:</h3>
                        <div className={styles.categories}>
                            <div className="form-check">
                                <input className="form-check-input" checked={currentCategory === 'all_products'} type="radio" name="categoriesradio" id="all_products" value="all_products" onChange={changeCategory} />
                                <label className="form-check-label" htmlFor="all_products">
                                    All products
                                </label>
                            </div>
                            {
                                mainProducts.map((product) => {
                                    const category = product.category
                                    if (!categories.includes(category)) {
                                        categories.push(category)
                                        return (
                                            <div key={category} className="form-check">
                                                <input className="form-check-input" checked={currentCategory === category} type="radio" name="categoriesradio" id={category} value={category} onChange={changeCategory} />
                                                <label className="form-check-label" htmlFor={category}>
                                                    {category}
                                                </label>
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>
                    </>
                    : <></>
                }
            </div>
        )
    }


    function Products() {
        return (
            <div className={styles.products}>
                {
                    (products) ?
                    (products.map((product) => {
                        return (
                            <div key={product.name} className={`card ${styles.productcard}`}>
                                <img src={product.img} className="card-img-top" alt="Product image" />
                                <div className={`card-body ${styles.productcardbody}`}>
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.desc}</p>
                                    <div className={styles.cardflex}>
                                        <Link href={`/cart?name=${product.name}`} className="btn btn-primary">Add to cart</Link>
                                        <div>{product.category}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }))
                    : <Loading />
                }
            </div>
        )
    }

    function Main() {
        return (
            <div className={styles.content}>
                <div className={`${styles.container} container-fluid`}>
                    <div className={`row ${styles.row}`} style={{ padding: 0 }}>
                        <div className={`col-2 ${styles.sidebarcol}`}>
                            <Sidebar />
                        </div>
                        <div className={`col-10 text-center ${styles.productscol}`}>
                            <Products />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function Loading() {
        return (
            <div className={styles.loading}>
                Loading . . .
            </div>
        )
    }


    return (
        <main>
            <Main />
        </main>
    );
}