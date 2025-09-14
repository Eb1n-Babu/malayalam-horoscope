import React, { useEffect, useState } from "react";
import HoroscopeCard from "./components/HoroscopeCard";
import { fetchHoroscope } from "./api/fetchHoroscope";
import { malayalamSigns, translateToMalayalam } from "./utils/malayalam";
import "./App.css";

const zodiacList = Object.keys(malayalamSigns);

function App() {
    const [horoscopes, setHoroscopes] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHoroscopes = async () => {
            const promises = zodiacList.map(async (sign) => {
                const data = await fetchHoroscope(sign);
                return {
                    sign,
                    description: data ? translateToMalayalam(data.description) : "⚠️ ലഭ്യമല്ല",
                };
            });

            const resultsArray = await Promise.all(promises);
            const results = Object.fromEntries(
                resultsArray.map(({ sign, description }) => [sign, description])
            );

            setHoroscopes(results);
            setLoading(false);
        };

        loadHoroscopes();
    }, []);

    return (
        <div className="app">
            <h1>🔮 മലയാളം ജാതകം</h1>
            {loading ? (
                <p>⏳ ജാതക വിവരങ്ങൾ ലഭ്യമാക്കുന്നു...</p>
            ) : (
                <div className="grid">
                    {zodiacList.map((sign) => (
                        <HoroscopeCard
                            key={sign}
                            malayalamSign={malayalamSigns[sign]}
                            description={horoscopes[sign]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;