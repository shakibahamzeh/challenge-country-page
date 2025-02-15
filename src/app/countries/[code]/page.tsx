"use client";

import Borders from "@/components/Borders";
import Loading from "@/components/Loading";
import { useGetCountryDetail } from "@/hooks/useCountryDetail";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

export default function CountryPage() {
  const params = useParams();
  const code = Array.isArray(params.code) ? params.code[0] : params.code;
  
  const { data: country, isPending } = useGetCountryDetail(code);

  if (!code) return notFound();
  if (isPending) return <Loading imageSrc="/Logo.svg" />;
  if (!country) return <p>Country not found</p>;

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-2 p-16">
      <div>
       <Image src={country[0].flags?.svg} alt="flag" width={500} height={500} className="rounded" />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{country[0].name?.common}</h1>
        <p className="text-lg">Capital: {country[0].capital[0]}</p>
        <p className="text-lg">Region: {country[0].region}</p>
        <p className="text-lg">Population: {country[0].population.toLocaleString()}</p>
        <p className="text-lg">Area: {country[0].area.toLocaleString()} km²</p>
        <Borders borders={country[0].borders}/>
      </div>
    </div>
  );
}
