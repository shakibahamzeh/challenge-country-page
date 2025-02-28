"use client";

import Borders from "@/components/Borders";
import Loading from "@/components/Loading";
import { useGetCountryDetail } from "@/hooks/useCountryDetail";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

export default function CountryPage() {
  const params = useParams();
  const code = Array.isArray(params.code) ? params.code[0].toLowerCase() : params.code;

  const { data: country, isPending } = useGetCountryDetail(code?.toLowerCase());

  if (!code) return notFound();
  if (isPending) return <Loading imageSrc="/Logo.svg" />;
  if (!country) return <p>Country not found</p>;

  return (
    <div className="bg-outerBackground min-h-screen flex flex-col items-center py-20 3xl:px-[300px] 2xl:px-[250px] xl:px-[200px] lg:px-[150px] md:px-[100px] sm:px-[50px] px-0">
      <div className="relative -mt-40 mb-8 z-10">
        <Image
          src={country[0].flags?.svg}
          alt="flag"
          width={300}
          height={300}
          className="rounded"
        />
      </div>
      <div className="w-full max-w-4xl bg-outerBackground rounded-2xl shadow-lg relative -mt-20 z-0">
        <div className="text-center mb-8 pt-20">
          <h1 className="text-3xl font-bold">{country[0].name?.common}</h1>
          <h2 className="text-xl">{country[0].name?.official}</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex gap-2 p-4 bg-innerBackground rounded-2xl">
            <p>Population</p>
            <span>|</span>
            <p>{country[0].population.toLocaleString()}</p>
          </div>
          <div className="flex gap-2 p-4 bg-innerBackground rounded-2xl">
            <p>Area (km²)</p>
            <span>|</span>
            <p>{country[0].area.toLocaleString()}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center border-y border-y-innerBackground p-4">
            <p>Capital</p>
            <p>{country[0].capital[0]}</p>
          </div>
          <div className="flex justify-between items-center border-y border-y-innerBackground p-4">
            <p>Subregion</p>
            <p>{country[0].subregion}</p>
          </div>
          <div className="flex justify-between items-center border-y border-y-innerBackground p-4">
            <p>Language</p>
            <p>{Object.values(country[0].languages).join(", ")}</p>
          </div>
          <div className="flex justify-between items-center border-y border-y-innerBackground p-4">
            <p>Currencies</p>
            <p>
              {Object.values(country[0].currencies)
                .map((currency: any) => currency.name)
                .join(", ")}
            </p>
          </div>
          <div className="flex justify-between items-center border-y border-y-innerBackground p-4">
            <p>Continents</p>
            <p>{country[0].continents.join(", ")}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-lg font-semibold mb-4">Neighboring Countries</p>
          <Borders borders={country[0].borders} />
        </div>
      </div>
    </div>
  );
}