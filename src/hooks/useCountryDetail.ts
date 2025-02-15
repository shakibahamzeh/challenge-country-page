import { getCountryDetail } from "@/services/countryDetailService";
import { useQuery } from "@tanstack/react-query";

export function useGetCountryDetail(code?: string, enabled: boolean = true) {
  const { data, isPending } = useQuery({
    queryKey: ["countryDetail", code], // فقط وقتی کد داریم، درخواست بفرست
    queryFn: () => getCountryDetail(code!),
    retry: false,
    enabled: !!code && enabled, // فقط وقتی کد معتبره، کوئری اجرا بشه
  });

  return { data, isPending };
}
