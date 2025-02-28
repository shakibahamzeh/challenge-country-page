import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export default function Search({ onSearch, initialValue }: SearchProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative md:w-[300px] w-full">
      <input
        type="text"
        placeholder="Search by Name, Region, Subregion"
        value={query}
        onChange={handleChange}
        className="p-2 pl-10 rounded-md w-full bg-innerBackground text-textColor text-sm outline-none"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}