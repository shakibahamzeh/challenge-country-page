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
    <div className="bg-outerBackground absolute top-[23vh] left-0 right-0 p-3 sm:p-5 3xl:mx-[300px] 2xl:mx-[250px] xl:mx-[200px] lg:mx-[150px] md:mx-[100px] sm:mx-[50px] mx-0 sm:rounded-2xl flex flex-col gap-5">
      <div className="absolute top-[-70px] left-[50%] translate-x-[-50%]">
       <Image src={country[0].flags?.svg} alt="flag" width={400} height={500} className="rounded" />
      </div>
      <div className="flex flex-col gap-3 ">
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
