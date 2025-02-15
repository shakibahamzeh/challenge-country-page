import url from "./api";

export async function getCountryDetail(countryCode : string) {
    const res = (await url.get(`alpha/${countryCode}`,{

    })).data
    return res;
}