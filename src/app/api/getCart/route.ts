import { prisma } from '../../../../prisma/db.server'
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req: Request){
    if (req.method !== 'GET') {
        return NextResponse.json({ ok: false, message: 'Only GET requests allowed', code: 405 })
    }

    const username = req.url.substring(req.url.indexOf('=') + 1)

    if (!username.length) {
        return NextResponse.json({ ok: false, message: 'Nothing to search for', code: 400 })
    }

    const session = await getServerSession(authOptions)

    if(session?.user?.name !== username){
        return NextResponse.json({ ok: false, message: 'Can\'t retrieve cart of another user', code: 403 })
    }

    const cart = await prisma.user.findUnique({
        where: {
            name: username
        },
        include: {
            cart: true
        }
    })

    if(!cart){
        return NextResponse.json({ ok: false, message: 'Such user not found', code: 404 })
    }

    return NextResponse.json({ ok: true, message: 'Successfully found cart items', code: 200, items: cart })

}