"use client"

import Auth from '@/components/Auth.jsx'
import { FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default async function Login() {

    const searchParams = useSearchParams()
    const errorMsg = searchParams.get('error')

    async function submitted(e: FormEvent) {
        const form = new FormData(e.target as HTMLFormElement)
        e.preventDefault()
        const result = await signIn("credentials", {
            username: form.get('username'),
            password: form.get('password'),
            callbackUrl: "/",
        })
    }

    return (
        <Auth>
            <form onSubmit={submitted} autoComplete='off'>
                <div className="form-group login-forms">
                    <label htmlFor="username-input">Username</label>
                    <input type="text" className="form-control" name="username" id="username-input" placeholder="Enter username" />
                </div>
                <div className="form-group login-forms">
                    <label htmlFor="password-input">Password</label>
                    <input type="password" name="password" className="form-control" id="password-input" placeholder="Enter password" />
                </div>
                <div id="login-page-flex">
                    <button type="submit" className="btn btn-primary" id="login-page-submit">Sign in/up</button>
                    <div id="login-page-err">{errorMsg}</div>
                </div>
            </form>
        </Auth>
    )
}