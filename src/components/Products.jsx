"use client"

import styles from '@/style/MainContent.module.css'
import Link from 'next/link'
import Loading from '@/components/Loading'

import { useSession } from "next-auth/react"


export default function Products(props) {

    const { data: session, status } = useSession()

    const cartButton = {
        classes: "btn btn-primary",
        txt: "Add to cart",
    }

    const products = props.products
    const mainProducts = props.mainProducts
    const setProducts = props.setProducts
    const setMainProducts = props.setMainProducts
    const currentCategory = props.currentCategory

    const isSearch = props.isSearch
    const isCart = props.isCart
    const loadingStyles = (isCart) ? "loading100" : "loading88"

    const changeCart = async (e) => {
        e.preventDefault()
        const action = e.target.getAttribute("data-action")
        const response = await fetch('/api/changeCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                add: action === "add",
                name: e.target.getAttribute("data-name"),
                username: session.user.name,
            })
        })
        const data = await response.json()
        if (!data.ok) {
            console.log(data.message)
        }
        switch (action) {
            case 'add':
                e.target.setAttribute('data-action', 'remove')
                e.target.innerHTML = "Remove from cart"
                e.target.classList.remove('btn-primary')
                e.target.classList.add('btn-secondary')
                if (!isCart) {
                    setMainProducts((prevProducts) => {
                        prevProducts.find((product) => data.product.id === product.id).Users.push({ name: data.username })
                        return prevProducts // modified version
                    })
                }
                break
            case 'remove':
                e.target.setAttribute('data-action', 'add')
                e.target.innerHTML = "Add to cart"
                e.target.classList.remove('btn-secondary')
                e.target.classList.add('btn-primary')
                if (!isCart) {
                    setProducts((prevProducts) => {
                        const gprod = prevProducts.map((item) =>
                            data.product.id === item.id ? { ...item, Users: item.Users.filter((user) => user.name !== data.username) } : item
                        )
                        setMainProducts((prevProducts) => {
                            if (currentCategory === 'all_products')
                                return gprod
                            const mapper = prevProducts.map((prod) =>
                                gprod.find(prd => prd.id === prod.id) || prod
                            )
                            return mapper
                        })
                        return gprod
                    })
                }
                break
        }

    }

    return (
        <div className={styles.products}>
            {
                (products) ?
                    (!products.length) ? <Loading styles={loadingStyles} txt={`There are no products ${(isCart) ? "in your cart!" : "to display"}`} /> :
                        (products.map((product) => {
                            const cartRemoveElem = <button className="btn btn-secondary" data-name={product.name} data-action="remove" onClick={changeCart}>Remove from cart</button>
                            const mappedUsers = (!isCart || isSearch) ? product?.Users?.map(user => user.name) : null
                            return (
                                <div key={product.name} className={`card ${styles.productcard}`}>
                                    <img src={product.img} className="card-img-top" alt="Product image" />
                                    <div className={`card-body ${styles.productcardbody}`}>
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.desc}</p>
                                        <div className={styles.cardflex}>
                                            {(isCart && !isSearch) ? cartRemoveElem :
                                                status === "authenticated" ?
                                                    (mappedUsers.includes(session?.user?.name) ?
                                                        cartRemoveElem
                                                        : <button className={cartButton.classes} data-name={product.name} data-action="add" onClick={changeCart}>{cartButton.txt}</button>
                                                    ) : <Link href="/login" className={cartButton.classes}>{cartButton.txt}</Link>}
                                            <div>{product.category}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))
                    : (props.err) ? <Loading styles={loadingStyles} txt={`Error: ${props.errMsg}`} />
                        : <Loading styles={loadingStyles} txt="Loading . . ." />
            }
        </div>
    )
}