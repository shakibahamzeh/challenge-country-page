interface FilterProps {
  onFilter: {
    selectedRegions: string[];
    setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
    setIsUN: React.Dispatch<React.SetStateAction<boolean>>;
    setIsIndependent: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];

export default function Filter({ onFilter }: FilterProps) {
  const { selectedRegions, setSelectedRegions, setIsUN, setIsIndependent } = onFilter;

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h6 className="text-secondary text-base font-medium mb-2">Region:</h6>
        <div className="flex flex-wrap gap-2 mt-1">
          {REGIONS.map((region) => {
            const isChecked = selectedRegions.includes(region);
            return (
              <label
                key={region}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md cursor-pointer hover:bg-innerBackground hover:text-white ${
                  isChecked ? "bg-innerBackground text-white" : "bg-transparent text-textColor"
                }`}
              >
                <input
                  type="checkbox"
                  value={region}
                  className="hidden"
                  checked={isChecked}
                  onChange={() => toggleRegion(region)}
                />
                <span className="select-none">{region}</span>
              </label>
            );
          })}
        </div>
      </div>
      <h6 className="text-secondary text-base font-medium mb-2">Status:</h6>
      <label className="flex items-center space-x-2">
        <input type="checkbox" onChange={(e) => setIsUN(e.target.checked)} />
        <span>Only UN Members</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" onChange={(e) => setIsIndependent(e.target.checked)} />
        <span>Only Independent Countries</span>
      </label>
    </div>
  );
}