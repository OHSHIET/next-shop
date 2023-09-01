import { NextResponse } from "next/server"
import { prisma } from '../../../../prisma/db.server'

export async function GET(req: Request) {

    if (req.method !== 'GET') {
        return NextResponse.json({ ok: false, message: 'Only GET requests allowed', code: 405 })
    }

    const query = req.url.substring(req.url.indexOf('=') + 1)

    if (!query.length) {
        return NextResponse.json({ ok: false, message: 'Nothing to search for', code: 400 })
    }

    const products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    desc: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            ],
        },
    })

    if(!products.length){
        return NextResponse.json({ ok: false, message: 'No products found', code: 404 })
    }

    return NextResponse.json({ ok: true, message: 'Found products', products: products, code: 200 })

}