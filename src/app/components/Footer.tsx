'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const appleStoreLinks: Record<string, string> = {
  US: 'https://www.apple.com/shop/buy-mac',
  GB: 'https://www.apple.com/uk/shop/buy-mac',
  FR: 'https://www.apple.com/fr/shop/buy-mac',
  DE: 'https://www.apple.com/de/shop/buy-mac',
  CA: 'https://www.apple.com/ca/shop/buy-mac',
  AU: 'https://www.apple.com/au/shop/buy-mac',
  // Add more as needed
};

export const Footer = () => {
  const [storeUrl, setStoreUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/'); // Geolocation API
        const data = await res.json();
        const countryCode = data.country_code; // Example: "US"

        setStoreUrl(appleStoreLinks[countryCode] || appleStoreLinks['US']); // Default to US if unknown
      } catch (error) {
        console.error('Error fetching location:', error);
        setStoreUrl(appleStoreLinks['US']); // Fallback to US
      }
    };

    fetchCountry();
  }, []);

  if (!storeUrl) return null; // Hide footer until we get a link

  return (
    <footer className="row-start-3 flex items-center justify-center p-4">
      <a
        className="flex items-center gap-2 text-blue-600 hover:underline hover:underline-offset-4"
        href={storeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/apple.svg" alt="Apple logo" width={16} height={16} />
        Buy a MacBook →
      </a>
    </footer>
  );
};
