interface SortProps {
  onSort: (sortBy: string) => void;
  initialValue: string
}

export default function Sort({ onSort, initialValue  }: SortProps ) {
  return (
    <div className="flex flex-col">
      <h6 className="text-secondary text-base font-medium mb-2">Sort by:</h6>
      <select
        onChange={(e) => onSort(e.target.value)}
        value={initialValue}
        className="p-2 rounded-md w-full bg-innerBackground border border-secondary text-textColor text-sm outline-none shadow-lg shadow-[2px 6px 9px -1px rgba(0,0,0,0.9)]"
      >
        <option value="population">Population</option>
        <option value="name">Name (A-Z)</option>
        <option value="area">Area (km²)</option>
      </select>
    </div>
  );
}