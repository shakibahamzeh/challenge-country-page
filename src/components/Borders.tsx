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
          borders.map((code) => url.get(`alpha/${code}`).then((res) => res.data))
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
          className="flex items-center gap-2 border p-2 rounded cursor-pointer hover:bg-gray-200 transition"
          onClick={() => router.push(`/country/${border.code}`)} // هدایت به صفحه‌ی کشور مرزی
        >
          <Image src={border.flag} alt={border.name} width={40} height={25} className="rounded" />
          <p>{border.name}</p>
        </div>
      ))}
    </div>
  );
}
