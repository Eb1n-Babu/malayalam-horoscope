import axios from "axios";

export const fetchHoroscope = async (sign) => {
    try {
        const response = await axios.post(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${sign}:`, error);
        return null;
    }
};