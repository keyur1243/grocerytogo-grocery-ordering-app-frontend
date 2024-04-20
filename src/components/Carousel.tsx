import { useState, useEffect } from 'react';
import { useGetRandomGroceryStores } from '@/api/GroceryStoreApi';
import SearchResultCard from './SearchResultCard';

const Carousel = () => {
    const { randomGroceryStores, isLoading } = useGetRandomGroceryStores();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlideIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(slideInterval);
    }, []); 

    if (isLoading || !randomGroceryStores) {
        return <div>Loading...</div>;
    }

    return (
        <div>

         <h1 className="text-2xl font-bold tracking-tight text-center mb-4 text-orange-600">Top Grocery Stores</h1>

        <div className="relative w-full md:w-10/12 overflow-hidden shadow-lg px-3 py-6 rounded-md md:mx-auto">
                   
            <SearchResultCard groceryStore={randomGroceryStores[currentSlideIndex]} />
                
        </div>
        </div>
    );
};

export default Carousel;
