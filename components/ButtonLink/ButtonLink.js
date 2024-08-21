import Link from 'next/link'

export function ButtonLink({ destination, label }) {
  return (
    <Link href={destination} className="btn">
      {label}
    </Link>
  )
}