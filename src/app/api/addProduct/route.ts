import { prisma } from '../../../../prisma/db.server'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ ok: false, message: 'Only POST requests allowed', code: 405 })
    }

    const data = await req.json()

    if (!data.name || !data.img || !data.desc || !data.category) {
        return NextResponse.json({ ok: false, message: 'One of the params is missing', code: 400 })
    }

    const product = await prisma.product.findUnique({
        where: {
            name: data.name
        }
    })

    if(product){
        return NextResponse.json({ ok: false, message: 'Product with this name already exists', code: 400 })
    }

    const newProduct = await prisma.product.create({
        data: data,
    })

    if(!newProduct) return NextResponse.json({ ok: false, message: 'Database failed to create new product', code: 500 })

    return NextResponse.json({ ok: true, message: 'Created new product', product: data, code: 201 })
}