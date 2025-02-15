"use client" 

import { TableProps } from "@/types/countriesType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Loading from "./Loading";

const ITEMS_PER_PAGE = 10;

const Table: FC<TableProps> = ({ countries, isPending, page, headers }) => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedCountries = countries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const router = useRouter();   
  return (
    <table className="w-full">
      <thead className="border-b">
        <tr className="text-left text-secondary font-normal">
          {headers.map(({ id, title }) => (
            <th key={id} className="py-2">{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isPending ? (
          <tr>
            <td colSpan={headers.length} className="py-3 px-1">
              <Loading imageSrc="/Logo.svg" />
            </td>
          </tr>
        ) : (
          paginatedCountries.map(({ flags, name, population, area, region, cca3 }, index) => (
            <tr key={index} className="text-left text-lg text-textColor font-medium hover:bg-secondary hover:cursor-pointer" 
            onClick={() => router.push(`/countries/${cca3.toLowerCase()}`)}>
              <td className="py-3 px-1">
                <Image src={flags.svg} alt="flag" width={50} height={25} className="rounded" />
              </td>
              <td className="py-3 text-2xl px-1">{name.common}</td>
              <td className="py-3 text-2xl px-1">{population.toLocaleString()}</td>
              <td className="py-3 text-2xl px-1">{area?.toLocaleString() || "N/A"}</td>
              <td className="py-3 text-2xl px-1">{region}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;