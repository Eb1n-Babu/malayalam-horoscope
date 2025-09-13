import React, { useState } from 'react';
import axios from 'axios';

const zodiacSigns = [
    { en: 'Aries', ml: 'മേടം (Mēṭaṁ)' },
    { en: 'Taurus', ml: 'ഇടവം (Iṭavaṁ)' },
    { en: 'Gemini', ml: 'മിഥുനം (Mithunaṁ)' },
    { en: 'Cancer', ml: 'കർക്കടകം (Karkaṭakaṁ)' },
    { en: 'Leo', ml: 'ചിങ্ঙം (Ciṅṅaṁ)' },
    { en: 'Virgo', ml: 'കന്നി (Kanni)' },
    { en: 'Libra', ml: 'തുലാം (Tulāṁ)' },
    { en: 'Scorpio', ml: 'വൃശ്ചികം (Vr̥ścikaṁ)' },
    { en: 'Sagittarius', ml: 'ധനു (Dhanu)' },
    { en: 'Capricorn', ml: 'മകരം (Makaraṁ)' },
    { en: 'Aquarius', ml: 'കുംഭം (Kumbhaṁ)' },
    { en: 'Pisces', ml: 'മീനം (Mīnaṁ)' },
];

const App = () => {
    const [selectedSign, setSelectedSign] = useState('');
    const [horoscope, setHoroscope] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHoroscope = async () => {
        if (!selectedSign) {
            setError('ദയവായി ഒരു രാശി തിരഞ്ഞെടുക്കുക');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('https://api.vedicastroapi.com/v1/horoscope/daily', {
                params: {
                    sign: selectedSign,
                    lang: 'ml', // Malayalam language
                    api_key: '9b0c4550-0451-5550-b163-91a41c95c546', // Your provided API key
                },
            });
            console.log('API Response:', response.data); // Debugging log
            if (response.data.status === 'success') {
                setHoroscope(response.data.data);
            } else {
                setError('Horoscope data not available: ' + (response.data.message || 'Unknown error'));
            }
        } catch (err) {
            console.error('API Error:', err.response ? err.response.data : err.message); // Detailed error logging
            setError('Error fetching horoscope: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // Debugging: Log component rendering
    console.log('App.jsx: Rendering, selectedSign:', selectedSign, 'horoscope:', horoscope);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">മലയാളം ജാതകം</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">നിന്റെ രാശി തിരഞ്ഞെടുക്കുക:</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedSign}
                        onChange={(e) => setSelectedSign(e.target.value)}
                    >
                        <option value="">രാശി തിരഞ്ഞെടുക്കുക</option>
                        {zodiacSigns.map((sign) => (
                            <option key={sign.en} value={sign.en}>{sign.ml}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={fetchHoroscope}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'ലോഡിംഗ്...' : 'ജാതകം കാണുക'}
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {horoscope && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">{zodiacSigns.find((s) => s.en === selectedSign)?.ml || 'Unknown Sign'}</h2>
                        <p className="mt-2 text-gray-600">{horoscope.prediction || 'No prediction available'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;