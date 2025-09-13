import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // External CSS

const zodiacSigns = [
    { en: 'Aries', ml: 'മേടം (Mēṭaṁ)' },
    { en: 'Taurus', ml: 'ഇടവം (Iṭavaṁ)' },
    { en: 'Gemini', ml: 'മിഥുനം (Mithunaṁ)' },
    { en: 'Cancer', ml: 'കർക്കടകം (Karkaṭakaṁ)' },
    { en: 'Leo', ml: 'ചിങ്ങം (Ciṅṅaṁ)' },
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

    console.log('API Key:', import.meta.env.VITE_API_KEY); // Log API key

    const fetchHoroscope = async () => {
        console.log('Selected Sign:', selectedSign); // Log selected sign
        console.log('Request Params:', { sign: selectedSign, lang: 'ml', api_key: import.meta.env.VITE_API_KEY }); // Log params
        if (!selectedSign) {
            setError('ദയവായി ഒരു രാശി തിരഞ്ഞെടുക്കുക');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('/api/v1/horoscope/daily', {
                params: {
                    sign: selectedSign,
                    lang: 'ml',
                    api_key: import.meta.env.VITE_API_KEY,
                },
                timeout: 10000,
            });

            console.log('API Response:', response.data); // Log full response

            if (response.data.status === 'success') {
                setHoroscope(response.data.data);
            } else {
                setError('ജാതക വിവരങ്ങൾ ലഭ്യമല്ല: ' + (response.data.message || 'അജ്ഞാത പിഴവ്'));
            }
        } catch (err) {
            console.error('Error Details:', err); // Log detailed error
            if (err.response) {
                setError(`സെർവർ പിഴവ്: ${err.response.data.message || err.response.statusText}`);
            } else if (err.request) {
                setError('ജാലകത്തിൽ നിന്ന് പ്രതികരണം ലഭിച്ചില്ല. നെറ്റ്‌വർക്ക് അല്ലെങ്കിൽ CORS പ്രശ്നങ്ങൾ പരിശോധിക്കുക.');
            } else {
                setError('അഭ്യർത്ഥന ക്രമീകരിക്കുന്നതിൽ പിഴവ്: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <h1 className="title">മലയാളം ജാതകം</h1>

                <div className="form-group">
                    <label className="label">നിന്റെ രാശി തിരഞ്ഞെടുക്കുക:</label>
                    <select
                        className="select"
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
                    className="button"
                    disabled={loading}
                >
                    {loading ? 'ലോഡിംഗ്...' : 'ജാതകം കാണുക'}
                </button>

                {error && <p className="error">{error}</p>}

                {horoscope && (
                    <div className="result">
                        <h2 className="result-title">
                            {zodiacSigns.find((s) => s.en === selectedSign)?.ml || 'അജ്ഞാത രാശി'}
                        </h2>
                        <p className="prediction">
                            {horoscope.prediction || 'ജാതക പ്രവചനം ലഭ്യമല്ല'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;