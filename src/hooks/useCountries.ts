import { getAllCountries } from "@/services/countriesService";
import { useQuery } from "@tanstack/react-query";

export function useGetCountries(enabled: boolean = true ) {
    const { data: countries = [] , isPending} = useQuery({
      queryKey: ["countries"],
      queryFn: () => getAllCountries(), 
      retry: false,
      enabled
    });
    return { countries, isPending };
} 