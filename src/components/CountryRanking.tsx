import { useGetCountries } from "@/hooks/useCountries";
import Image from "next/image";
import { useMemo, useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Search from "./SearchInput";
import Sort from "./Sort";
import { Country, Header } from "@/types/countriesType";

const headers: Header[] = [
  { id: 0, title: "Flag" },
  { id: 1, title: "Name" },
  { id: 2, title: "Population" },
  { id: 3, title: "Area (km²)" },
  { id: 4, title: "Region" },
];

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const { countries, isPending } = useGetCountries();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("population");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isUN, setIsUN] = useState(false);
  const [isIndependent, setIsIndependent] = useState(false);
  const [page, setPage] = useState(1);

const filteredAndSortedCountries = useMemo<Country[]>(() => {
  const filtered = countries.filter(({ name, region, subregion, unMember, independent }: Country) =>
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
    <div className="relative min-h-screen">
      
      <div className="relative w-full h-[35vh]">
        <div className="absolute left-0 right-0 top-[50%] flex justify-center">
          <Image 
            src="/Logo.svg"
            alt="logo"
            width={200}
            height={25}
            priority
          />
        </div>
       
        <Image
          src="/hero-image.jpg"
          alt="Hero Image"
          width={1920}
          height={600}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="bg-outerBackground absolute top-[23vh] left-0 right-0 flex justify-center m-10 rounded-2xl">
        <div className="w-full rounded-lg h-full p-5 grid grid-cols-[1fr_3fr] gap-6">
          <aside className="rounded-lg">
            <p className="text-textColor">Found {filteredAndSortedCountries.length} countries</p>
            Sort by:
            <Sort onSort={setSortBy} />
            <Filter onFilter={{ setSelectedRegions, setIsUN, setIsIndependent, selectedRegions}} />
          </aside>
          <main className="flex flex-col items-end gap-4">
            <Search onSearch={setSearch} />
            <Table countries={filteredAndSortedCountries} isPending={isPending} page={page} headers={headers} />
            <Pagination page={page} total={totalPages} setPage={setPage} />
          </main>
        </div>
      </div>
    </div>
  );
}