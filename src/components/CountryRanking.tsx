import { useGetCountries } from "@/hooks/useCountries";
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
 
      <div className="bg-outerBackground absolute top-[23vh] left-0 right-0 p-3 md:p-5 md:m-10 m-6 rounded-2xl flex flex-col gap-5">
        <section className="flex justify-between flex-col md:flex-row gap-4 md:gap-0">
          <p className="text-textColor">Found {filteredAndSortedCountries.length} countries</p>
          <Search onSearch={setSearch} />
        </section>
        <div className="w-full rounded-lg h-full grid gap-6 md:grid-cols-[1fr_3fr] sm:grid-cols-1">
          <aside className="rounded-lg gap-10 flex flex-col">
            <Sort onSort={setSortBy} />
            <Filter onFilter={{ setSelectedRegions, setIsUN, setIsIndependent, selectedRegions}} />
          </aside>
          <main className="flex flex-col md:items-end  items-center gap-4">
            <Table countries={filteredAndSortedCountries} isPending={isPending} page={page} headers={headers} />
            <Pagination page={page} total={totalPages} setPage={setPage} />
          </main>
        </div>
      </div>

  );
}