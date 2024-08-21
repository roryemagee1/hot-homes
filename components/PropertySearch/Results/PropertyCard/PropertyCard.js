import Link from 'next/link'
import Image from 'next/image'
import numeral from 'numeral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBathtub, faBed, faCar, faDog } from '@fortawesome/free-solid-svg-icons'

export function PropertyCard({ title, destination, bedrooms, bathrooms, price, hasParking, petFriendly, image }) {
  return (
    <Link 
      href={destination} 
      className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200"
    >
      <div className="flex w-full">
        <Image src={image} alt="Property Image" style={{ objectFit: "cover", height: "200px", width: "300px" }} height="200" width="300" />
      </div>
      <div className="mt-3 text-lg font-bold">
        {title}
      </div>
      <div className="mt-3 text-lg font-bold">
        ${numeral(price).format("0,0")}
      </div>
      <div className="flex justify-between text-sm mt-3">
        <div>
          <FontAwesomeIcon icon={faBathtub} />
          <span className="pl-2">{bathrooms} bathrooms</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBed} />
          <span className="pl-2">{bedrooms} bedrooms</span>
        </div>
        { 
          !!hasParking || !!petFriendly && (
            <div className="flex justify-between text-sm mt-3">
              { !!hasParking && <FontAwesomeIcon icon={faCar} />}
              { !!petFriendly && <FontAwesomeIcon icon={faDog} />}
            </div>
          )
        }
      </div>
    </Link>
  )
}