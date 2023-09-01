"use client"

import { useSession } from "next-auth/react";
import { useState } from 'react';
import Back from '@/components/Back'
import '@/style/admin.css'
import { FormEvent } from "react";

export default function Admin() {
    const { data: session } = useSession();

    const [err, setErr] = useState('')

    function AdminJSX() {
        return (
            <div className="admin">
                <div className="header">
                    <div>Admin</div>
                    <div className="subheader">
                        Add a product
                    </div>
                </div>
                <form onSubmit={addProduct} className="admin-form" autoComplete="off">
                    <div className="form-group">
                        <input type="text" name="name" className="form-control" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="img" className="form-control" placeholder="Image" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="desc" className="form-control" placeholder="Description" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="category" className="form-control" placeholder="Category" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
                {err}
            </div>
        )
    }

    async function addProduct(e: FormEvent) {
        const form = new FormData(e.target as HTMLFormElement)
        e.preventDefault()
        const body = {
            name: form.get('name'),
            img: form.get('img'),
            desc: form.get('desc'),
            category: form.get('category')
        }
        if (!body.name || !body.img || !body.desc || !body.category) {
            setErr('One of the params is missing')
        }
        const response = await fetch('/api/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        setErr(data.message)
    }

    return (
        <>
            <Back />
            {
                (session?.user?.name === 'superuser') ?
                    <AdminJSX />
                    :
                    <div className="unauthorized">You don't have permission to access this page</div>
            }
        </>
    )
}