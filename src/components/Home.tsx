"use client"

import { useGetCountries } from "@/hooks/useCountries";
import Image from "next/image";
import { useState } from "react";
interface Header {
  id: number;
  title: string;
}

const headers: Header[] = [
  { id: 0, title: "Flag" },
  { id: 1, title: "Name" },
  { id: 2, title: "Population" },
  { id: 3, title: "Area (km²)" },
  { id: 4, title: "Region" }
];
export default function Home() {
  const {countries, isPending} = useGetCountries()
   const [page, setPage] = useState(1);
  const limit = 10; // تعداد کشورها در هر صفحه

  // محاسبه‌ی کشورهایی که باید در این صفحه نمایش داده شوند
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCountries = countries.slice(startIndex, endIndex);
  return (
    <div>
      <div className="relative w-full h-[600px]">
       <Image
        src="/hero-image.jpg"
        alt="Hero Image"
        width={1920}
        height={600}
        className="w-full h-[600px] object-cover"
        />
      </div>
      <div className="h-screen bg-outerBackground absolute top-[30%] left-0 right-0 flex justify-center m-20  shadow-lg">
          <div className="w-full rounded-lg h-full p-5 grid grid-cols-[1fr_3fr]">
           <div className="bg-secondary">111111</div>
            <div>
            <table className="w-full  border border-gray-300 shadow-md">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header.id} className="px-4 py-2 border">
                      {header.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Handle Loading & Errors */}
                {isPending ? (
                  <tr>
                    <td colSpan={headers.length} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  paginatedCountries?.map((country, index: number) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">
                        <Image
                          src={country.flags.svg}
                          alt="flag"
                          width={40}
                          height={25}
                          className="rounded"
                        />
                      </td>
                      <td className="px-4 py-2 border">{country.name.common}</td>
                      <td className="px-4 py-2 border">{country.population.toLocaleString()}</td>
                      <td className="px-4 py-2 border">{country.area?.toLocaleString() || "N/A"}</td>
                      <td className="px-4 py-2 border">{country.region}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
             <div className="flex justify-between mt-4">
              <button 
                disabled={page === 1} 
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`px-4 py-2 bg-gray-200 rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Previous
              </button>

              <span>Page {page} of {Math.ceil(countries.length / limit)}</span>

              <button 
                disabled={page === Math.ceil(countries.length / limit)}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}