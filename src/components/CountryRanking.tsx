"use client";

import { useGetCountries } from "@/hooks/useCountries";
import { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Search from "./SearchInput";
import Sort from "./Sort";
import { Country, Header } from "@/types/countriesType";
import Loading from "./Loading";
import { useRouter, useSearchParams } from "next/navigation";

const headers: Header[] = [
  { id: 0, title: "Flag" },
  { id: 1, title: "Name" },
  { id: 2, title: "Population" },
  { id: 3, title: "Area (km²)" },
  { id: 4, title: "Region" },
];

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { countries, isPending } = useGetCountries();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "population");
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    searchParams.get("regions")?.split(",") || []
  );
  const [isUN, setIsUN] = useState(searchParams.get("isUN") === "true");
  const [isIndependent, setIsIndependent] = useState(searchParams.get("isIndependent") === "true");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (sortBy) queryParams.set("sortBy", sortBy);
    if (selectedRegions.length > 0) queryParams.set("regions", selectedRegions.join(","));
    if (isUN) queryParams.set("isUN", "true");
    if (isIndependent) queryParams.set("isIndependent", "true");
    if (page > 1) queryParams.set("page", page.toString());

    router.replace(`?${queryParams.toString()}`);
  }, [search, sortBy, selectedRegions, isUN, isIndependent, page, router]);

  const filteredAndSortedCountries = useMemo<Country[]>(() => {
    const filtered = countries.filter(
      ({ name, region, subregion, unMember, independent }: Country) =>
        (name.common.toLowerCase().includes(search.toLowerCase()) ||
        region?.toLowerCase().includes(search.toLowerCase()) ||
        subregion?.toLowerCase().includes(search.toLowerCase())) &&
        (selectedRegions.length === 0 || selectedRegions.includes(region)) &&
        (!isUN || unMember) &&
        (!isIndependent || independent)
    );

    return filtered.sort((a: Country, b: Country) => {
      if (sortBy === "name") return a.name.common.localeCompare(b.name.common);
      if (sortBy === "area") return b.area - a.area;
      return b.population - a.population;
    });
  }, [countries, search, sortBy, selectedRegions, isUN, isIndependent]);

  const totalPages = Math.ceil(filteredAndSortedCountries.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-outerBackground absolute shadow-lg top-[20%] left-0 right-0 p-3 md:p-5 sm:m-10 m-0 rounded-2xl flex flex-col gap-5 h-[calc(100vh - 25vh)] m-0">
      {isPending ? (
        <Loading imageSrc="/Logo.svg" />
      ) : (
        <>
          <section className="flex justify-between flex-col md:flex-row gap-4 md:gap-0">
            <p className="text-textColor">Found {filteredAndSortedCountries.length} countries</p>
            <Search onSearch={setSearch} initialValue={search} />
          </section>
          <div className="w-full rounded-lg h-full grid gap-6 md:grid-cols-[1fr_3fr] sm:grid-cols-1">
            <aside className="rounded-lg gap-10 flex flex-col">
              <Sort onSort={setSortBy} initialValue={sortBy} />
              <Filter
                onFilter={{ setSelectedRegions, setIsUN, setIsIndependent, selectedRegions }}
                initialValues={{ selectedRegions, isUN, isIndependent }}
              />
            </aside>
            <main className="flex flex-col md:items-end items-center gap-4">
              <Table
                countries={filteredAndSortedCountries}
                isPending={isPending}
                page={page}
                headers={headers}
              />
              <Pagination page={page} total={totalPages} setPage={setPage} />
            </main>
          </div>
        </>
      )}
    </div>
  );
}