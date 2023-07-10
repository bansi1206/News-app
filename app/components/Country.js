'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlagIcon } from 'react-flag-kit';

const CountryInfo = ({ ip }) => {
    const [country, setCountry] = useState('');
    const [flag, setFlag] = useState('');

    useEffect(() => {
        const fetchCountryInfo = async () => {
            try {
                const response = await axios.get(`https://api.iplocation.net/?cmd=ip-country&ip=${ip}`);
                const { country } = response.data;

                setCountry(country);
                // setFlag(country.toLowerCase());
                console.log(response.data)
            } catch (error) {
                console.log('Error fetching country info:', error);
            }
        };

        fetchCountryInfo();
    }, [ip]);

    return (
        <div>
            <h5>Country: {country}</h5>
            <FlagIcon code={flag} />
        </div>
    );
};

export default CountryInfo;

