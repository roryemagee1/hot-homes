'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import queryString from 'query-string'

import { Results } from './Results'
import { Pagination } from './Pagination'
import { Filters } from './Filters'

export function PropertySearch() {
  const [ properties, setProperties ] = useState([]);
  const [ totalResults, setTotalResults ] = useState(0);
  const pageSize = 3;
  const router = useRouter();

  async function search() {
    const { 
      page, 
      "has-parking": hasParking, 
      "pet-friendly": petFriendly, 
      "min-price": minPrice, 
      "max-price": maxPrice 
    } = queryString.parse(window.location.search);

    const filters = {};
    if (minPrice) {
      filters.minPrice = parseInt(minPrice);
    }
    if (maxPrice) {
      filters.maxPrice = parseInt(maxPrice);
    }
    if (hasParking === "true") {
      filters.hasParking = true;
    }
    if (petFriendly === "true") {
      filters.petFriendly = true;
    }

    const res = await fetch(`/api/search`, { 
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        ...filters,
      })
    });
    const data = await res.json();
    console.log("SEARCH DATA: ", data);
    setProperties(data.properties);
    setTotalResults(data.total);
  }

  async function handlePageClick(pageNumber) {
    const { 
      "has-parking": hasParking, 
      "pet-friendly": petFriendly, 
      "min-price": minPrice, 
      "max-price": maxPrice 
    } = queryString.parse(window.location.search);

    let filterQueryArray = [];
    if (hasParking) {
      filterQueryArray.push(`&has-parking=${hasParking === "true"}`);
    }
    if (petFriendly) {
      filterQueryArray.push(`&pet-friendly=${petFriendly === "true"}`);
    }
    if (maxPrice) {
      filterQueryArray.push(`&max-price=${maxPrice}`);
    }
    if (minPrice) {
      filterQueryArray.push(`&min-price=${minPrice}`);
    }

    let filterQuery = filterQueryArray.join("");
    
    await router.push(
      `${router.query.slug.join("/")}?page=${pageNumber}${filterQuery}`, 
      null, 
      { shallow: true }
    );
    search();
  }

  async function handleSearch({ petFriendly, hasParking, minPrice, maxPrice }) {
    let filterQueryArray = [];
    if (hasParking) {
      filterQueryArray.push(`&has-parking=${hasParking === "true"}`);
    }
    if (petFriendly) {
      filterQueryArray.push(`&pet-friendly=${petFriendly === "true"}`);
    }
    if (maxPrice) {
      filterQueryArray.push(`&max-price=${maxPrice}`);
    }
    if (minPrice) {
      filterQueryArray.push(`&min-price=${minPrice}`);
    }

    let filterQuery = filterQueryArray.join("");

    await router.push(
      `${router.query.slug.join("/")}?page=1${filterQuery}`, 
      null, 
      { shallow: true }
    );
    search();
    console.log("FILTERS", petFriendly, hasParking, minPrice, maxPrice)
  }
  
  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination onPageClick={handlePageClick} totalPages={Math.ceil(totalResults / pageSize)} />
    </div>
  )
}