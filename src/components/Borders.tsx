"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import url from "@/services/api";


export default function Borders({ borders }: { borders: string[] }) {
  const [borderCountries, setBorderCountries] = useState<{ code: string; name: string; flag: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!borders || borders.length === 0) return;

    async function fetchBorders() {
      try {
        const responses = await Promise.all(
          borders.map((code) => url.get(`alpha/${code.toLowerCase()}`).then((res) => res.data))
        );

        const formattedData = responses.map((countryArray, index) => {
          const country = countryArray[0];

          return {
            code: borders[index],
            name: country.name.common,
            flag: country.flags.svg,
          };
        });

        setBorderCountries(formattedData);
      } catch (error) {
        console.error("Error fetching border countries:", error);
      }
    }

    fetchBorders();
  }, [borders]);

  if (borderCountries.length === 0) return <p>No border countries</p>;

  return (
    <div className="flex flex-wrap gap-3">
      {borderCountries.map((border) => (
        <div
          key={border.code}
          className="flex  gap-3 flex-col p-2 rounded cursor-pointer"
          onClick={() => router.push(`/countries/${border?.code?.toLowerCase()}`)}
        >
          <div className="w-20 h-16 relative">
            <Image
              src={border.flag}
              alt={border.name}
              className="rounded object-cover"
              fill
            />
          </div>
          <p className="text-xs">{border.name}</p>
        </div>
      ))}
    </div>
  );
}