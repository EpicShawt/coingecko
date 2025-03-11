import axiosInstance from "../helpers/axiosinstance";

export async function fetchCoinData(page = 1, currency = 'usd') {
    const perPage = 10;
    try {
        const response = await axiosInstance.get(`/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}`);
        console.log("Fetched");
        console.log(response.data); // Log the actual data
        return response.data; // Return the data array, not the whole response
    } catch (error) {
        console.log("Error", error);
        return null; // Return null on error
    }
}
