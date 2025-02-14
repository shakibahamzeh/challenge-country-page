// components/Sort.tsx
interface SortProps {
  onSort: (sortBy: string) => void;
}

export default function Sort({ onSort }: SortProps) {
  return (
    <select
      onChange={(e) => onSort(e.target.value)}
      className="p-2 rounded-md w-full bg-innerBackground text-textColor text-sm outline-none"
    >
      <option value="population">Population</option>
      <option value="name">Name (A-Z)</option>
      <option value="area">Area (km²)</option>
    </select>
  );
}