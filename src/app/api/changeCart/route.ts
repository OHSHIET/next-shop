import { prisma } from '../../../../prisma/db.server'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ ok: false, message: 'Only POST requests allowed', code: 405 })
    }

    const data = await req.json()

    const product = await prisma.product.findUnique({
        where: {
            name: data.name
        }
    })

    if (!product) {
        return NextResponse.json({ ok: false, message: 'Didn\'t find such product', code: 404 })
    }

    const user = await prisma.user.findUnique({
        where: {
            name: data.username
        }
    })

    if (!user) {
        return NextResponse.json({ ok: false, message: 'Current user wasn\'t found', code: 500 })
    }
    
    // add item to cart...
    if (data.add) {

        const newCartItem = await prisma.user.update({
            where: {
                name: data.username,
            },
            data: {
                cart: {
                    connect: [{ id: product.id }],
                },
            },
            include: {
                cart: true,
            },
        })

        return NextResponse.json({ ok: true, message: `Successfully added product ${product.name} to user ${user.name}'s cart`, product: product, username: user.name, code: 201 })
    }

    // else, remove item from cart

    const removedCartItem = await prisma.user.update({
        where: {
            name: data.username,
        },
        data: {
            cart: {
                disconnect: [{ id: product.id }],
            },
        },
        include: {
            cart: true,
        },
    })

    return NextResponse.json({ ok: true, message: `Successfully removed product ${product.name} from user ${user.name}'s cart`, product: product, username: user.name, code: 201 })
}