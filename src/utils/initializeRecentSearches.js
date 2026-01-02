// Initialize recent searches in localStorage for testing
export const initializeRecentSearches = () => {
    // Flight searches
    const recentFlightSearches = [
        {
            origin: 'New York, NY',
            destination: 'Rome, Italy',
            departDate: 'Feb 10',
            returnDate: 'Feb 18',
            travelers: 2,
            class: 'Economy'
        },
        {
            origin: 'Los Angeles, CA',
            destination: 'Tokyo, Japan',
            departDate: 'Mar 15',
            returnDate: 'Mar 25',
            travelers: 1,
            class: 'Business'
        },
        {
            origin: 'Miami, FL',
            destination: 'Paris, France',
            departDate: 'Apr 5',
            returnDate: 'Apr 12',
            travelers: 4,
            class: 'Economy'
        },
        {
            origin: 'Chicago, IL',
            destination: 'London, UK',
            departDate: 'May 20',
            returnDate: 'May 28',
            travelers: 2,
            class: 'Premium Economy'
        },
        {
            origin: 'San Francisco, CA',
            destination: 'Barcelona, Spain',
            departDate: 'Jun 10',
            returnDate: 'Jun 20',
            travelers: 3,
            class: 'Economy'
        }
    ];

    // Hotel/Stays searches
    const recentHotelSearches = [
        {
            destination: 'Paris, France',
            location: 'Paris, France',
            checkIn: 'Feb 10',
            checkOut: 'Feb 15',
            departDate: 'Feb 10',
            returnDate: 'Feb 15',
            guests: 4,
            travelers: 4,
            rooms: 2,
            class: 'Standard'
        },
        {
            destination: 'Tokyo, Japan',
            location: 'Tokyo, Japan',
            checkIn: 'Mar 20',
            checkOut: 'Mar 27',
            departDate: 'Mar 20',
            returnDate: 'Mar 27',
            guests: 2,
            travelers: 2,
            rooms: 1,
            class: 'Luxury'
        },
        {
            destination: 'Barcelona, Spain',
            location: 'Barcelona, Spain',
            checkIn: 'Apr 15',
            checkOut: 'Apr 22',
            departDate: 'Apr 15',
            returnDate: 'Apr 22',
            guests: 2,
            travelers: 2,
            rooms: 1,
            class: 'Standard'
        },
        {
            destination: 'New York, NY',
            location: 'New York, NY',
            checkIn: 'May 5',
            checkOut: 'May 10',
            departDate: 'May 5',
            returnDate: 'May 10',
            guests: 3,
            travelers: 3,
            rooms: 2,
            class: 'Boutique'
        },
        {
            destination: 'Dubai, UAE',
            location: 'Dubai, UAE',
            checkIn: 'Jun 1',
            checkOut: 'Jun 8',
            departDate: 'Jun 1',
            returnDate: 'Jun 8',
            guests: 2,
            travelers: 2,
            rooms: 1,
            class: 'Resort'
        }
    ];

    localStorage.setItem('recentFlightSearches', JSON.stringify(recentFlightSearches));
    localStorage.setItem('recentHotelSearches', JSON.stringify(recentHotelSearches));

    console.log('✅ Recent searches initialized:', {
        flights: recentFlightSearches.length,
        hotels: recentHotelSearches.length
    });
};
