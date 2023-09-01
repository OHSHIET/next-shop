import styles from '@/style/Back.module.css'
import Link from 'next/link'

export default function Back() {
    return (
        <div className={styles.back}>
            <Link href="/">&lt; Back</Link>
        </div>
    )
}