
import url from "./api";

export async function getAllCountries() {
    const res = (await url.get('all/',{

    })).data
    return res;
}