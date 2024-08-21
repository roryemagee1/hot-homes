import { useState, useEffect } from 'react'
import queryString from 'query-string'

import { Input } from 'components/Input'

export function Filters({ onSearch }) {
  const [ petFriendly, setPetFriendly ] = useState(false);
  const [ hasParking, setHasParking ] = useState(false);
  const [ minPrice, setMinPrice ] = useState("");
  const [ maxPrice, setMaxPrice ] = useState("");

  function handleSearch() {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice
    })
  }

  useEffect(() => {
    const { 
      "pet-friendly": petFriendlyInitial,
      "has-parking": hasParkingInitial,
      "min-price": minPriceInitial,
      "max-price": maxPriceInitial,
    } = queryString.parse(window.location.search);

    setPetFriendly(petFriendlyInitial === "true");
    setHasParking(hasParkingInitial === "true");
    setMinPrice(minPriceInitial || "");
    setMaxPrice(maxPriceInitial || "");
  }, [])

  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
          <label className="cursor-pointer">
            <input 
              type="checkbox" 
              checked={hasParking}
              onChange={() => setHasParking(prevState => !prevState)} 
            />
            <span className="pl-2">Has Parking</span>
          </label>
        </div>
        <div>
          <label className="cursor-pointer">
            <input 
              type="checkbox" 
              checked={petFriendly}
              onChange={() => setPetFriendly(prevState => !prevState)}
            />
            <span className="pl-2">Pet Friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min Price</span>
        <Input 
          type="number"
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
        />
      </div>
      <div className="flex-1">
        <span>Max Price</span>
        <Input
          type="number"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </div>
      <div>
        <div className="btn" onClick={handleSearch}>Search</div>
      </div>
    </div>
  )
}