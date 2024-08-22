import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faDog, faCar } from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';

export function PropertyFeatures({ price, bedrooms, bathrooms, hasParking, petFriendly }) {
  return (
    <div className="max-w-lg mx-auto my-10 bg-white text-slate-900 p-5 text-center">
      <div className="grid grid-cols-2 mb-4 gap-y-5">
        <div>
          <FontAwesomeIcon icon={faBed} /> {bedrooms} Bedrooms
        </div>
        <div>
          <FontAwesomeIcon icon={faBath} /> {bathrooms} Bathrooms
        </div>
        <div>
          { 
            !!petFriendly && (
              <>
               <FontAwesomeIcon icon={faDog} /> Pet Friendly
              </>
            )
          }
        </div>
        <div>
          { 
            !!hasParking && (
              <>
               <FontAwesomeIcon icon={faCar} /> Parking Available
              </>
            )
          }
        </div>
      </div>
      <h3 className="text-5xl">${numeral(price).format("0,0")}</h3>
    </div>
  )
}