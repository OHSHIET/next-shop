import { NextResponse, NextRequest } from "next/server"
import { prisma } from '../../../../prisma/db.server'

export async function GET(req: NextRequest) {

    if (req.method !== 'GET') {
        return NextResponse.json({ ok: false, message: 'Only GET requests allowed', code: 405 })
    }

    let products = await prisma.product.findMany({
        include: {
            Users: {
                select: {
                    id: false,
                    name: true,
                    password: false,
                    cart: false,
                }
            }
        }
    })

    if (!products) {
        return NextResponse.json({ ok: false, message: 'Unable to get products from database', code: 500 })
    }

    return NextResponse.json({ ok: true, message: 'Got products', products: products, code: 200 })
}