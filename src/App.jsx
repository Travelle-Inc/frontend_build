import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import MainLayout from './components/Layout/MainLayout'
import ChatInterface from './components/Chat/ChatInterface'
import SecondarySidebar from './components/Sidebar/SecondarySidebar'
import BucketList from './components/BucketList/BucketList'
import ItineraryList from './components/Itineraries/ItineraryList'
import Membership from './components/Membership/Membership'
import Planner from './components/Planner/Planner'
import PlannerSecondarySidebar from './components/Planner/PlannerSecondarySidebar'
import FlightResults from './components/Search/FlightResults'
import ResultsSecondarySidebar from './components/Search/ResultsSecondarySidebar'
import HotelResults from './components/Search/HotelResults'
import SearchOnlyView from './components/Search/SearchOnlyView'
import HotelSecondarySidebar from './components/Search/HotelSecondarySidebar'
import { initializeRecentSearches } from './utils/initializeRecentSearches'
import AddToTripModal from './components/Modals/AddToTripModal';
import SettingsModal from './components/Modals/SettingsModal';

// Pre-defined uncategorized chats data
const INITIAL_UNCATEGORIZED_CHATS = [
  { id: 101, name: 'New Chat', hasIndicator: true, indicatorColor: 'green' },
  { id: 102, name: 'Chat 2', hasIndicator: true, indicatorColor: 'orange' },
  { id: 103, name: 'Chat 3', hasIndicator: true, indicatorColor: 'green' },
  { id: 104, name: 'Chat 2', hasIndicator: true, indicatorColor: 'green' },
  { id: 105, name: 'Chat 2', hasIndicator: false },
  { id: 106, name: 'Chat 3', hasIndicator: true, indicatorColor: 'green' },
  { id: 107, name: 'Chat 2', hasIndicator: false, isActive: true },
];

function App() {
  const [appMode, setAppMode] = useState('initial');
  const [activeTab, setActiveTab] = useState(null); // null = home page, no active tab
  const [searchType, setSearchType] = useState('Flights'); // Track search type
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(true);
  const [isPrimarySidebarCollapsed, setIsPrimarySidebarCollapsed] = useState(true); // Track primary sidebar state

  // Initialize recent searches on app load
  useEffect(() => {
    initializeRecentSearches();
  }, []);

  // Uncategorized chats state
  const [uncategorizedChats, setUncategorizedChats] = useState(INITIAL_UNCATEGORIZED_CHATS);

  // Enhanced trip state with rich mock data
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'Italy',
      isPinned: true,
      sections: [
        {
          id: 11,
          name: 'Flights',
          order: 0,
          items: [
            {
              id: 111,
              type: 'link',
              content: 'https://www.google.com/travel/flights',
              preview: null,
              createdAt: Date.now() - 100000
            },
            {
              id: 112,
              type: 'text',
              content: 'Emirates A380 - Direct Rome to NYC',
              preview: null,
              createdAt: Date.now() - 90000
            }
          ]
        },
        {
          id: 12,
          name: 'Hotels',
          order: 1,
          items: [
            {
              id: 121,
              type: 'link',
              content: 'https://www.booking.com',
              preview: null,
              createdAt: Date.now() - 80000
            },
            {
              id: 122,
              type: 'image',
              content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iIzRhOTBiYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Um9tZSBIb3RlbDwvdGV4dD48L3N2Zz4=',
              preview: null,
              createdAt: Date.now() - 70000
            }
          ]
        },
        {
          id: 13,
          name: 'Car Rental',
          order: 2,
          items: [
            {
              id: 131,
              type: 'text',
              content: 'Europcar FCO Airport - Confirmed',
              preview: null,
              createdAt: Date.now() - 60000
            }
          ]
        },
        {
          id: 14,
          name: 'Things to Do',
          order: 3,
          items: [
            {
              id: 141,
              type: 'image',
              content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2Y0YTI2MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29sb3NzZXVtPC90ZXh0Pjwvc3ZnPg==',
              preview: null,
              createdAt: Date.now() - 50000
            },
            {
              id: 142,
              type: 'text',
              content: 'Vatican Museums - Skip the line tickets',
              preview: null,
              createdAt: Date.now() - 40000
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Hawaii 2026',
      isPinned: true,
      sections: [
        {
          id: 21,
          name: 'Hotels',
          order: 0,
          items: [
            {
              id: 211,
              type: 'image',
              content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iIzI2YmVhNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V2Fpa2lraSBCZWFjaDwvdGV4dD48L3N2Zz4=',
              preview: null,
              createdAt: Date.now() - 20000
            }
          ]
        },
        { id: 22, name: 'Flights', order: 1, items: [] },
        {
          id: 23,
          name: 'Restaurants',
          order: 2,
          items: [
            {
              id: 231,
              type: 'text',
              content: 'Mama\'s Fish House - MUST TRY!',
              preview: null,
              createdAt: Date.now() - 10000
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'SaaS Conference',
      isPinned: true,
      sections: [
        { id: 31, name: 'Hotels', order: 0, items: [] },
        { id: 32, name: 'Flights', order: 1, items: [] }
      ]
    }
  ]);

  const [activeTrip, setActiveTrip] = useState(1);

  const handleChatStart = () => {
    setAppMode('chat_active');
    setIsChatSidebarOpen(true);
  };

  const handleSearchStart = () => {
    setAppMode('search_results');
    setIsChatSidebarOpen(true);
  };

  const handleChatSidebarCollapse = () => {
    setIsChatSidebarOpen(false);
  };

  const handleChatSidebarExpand = () => {
    setIsChatSidebarOpen(true);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    // Handle transport tabs - show search-only interface
    const transportTabs = ['stays', 'flights', 'cars', 'cruises', 'experiences'];
    if (transportTabs.includes(tabId)) {
      setAppMode('search_only');
      setIsChatSidebarOpen(false);
      // Map tab ID to search type
      const searchTypeMap = {
        'stays': 'Stays',
        'flights': 'Flights',
        'cars': 'Cars',
        'cruises': 'Cruises',
        'experiences': 'Experiences'
      };
      setSearchType(searchTypeMap[tabId]);
    } else if (tabId === 'journii' && appMode !== 'initial') {
      setIsChatSidebarOpen(true);
    }
  };

  // Trip CRUD operations
  const handleCreateTrip = () => {
    const newTrip = {
      id: Date.now(),
      name: 'New Trip',
      isPinned: false,
      sections: [
        { id: Date.now() + 1, name: 'Flights', order: 0, items: [] },
        { id: Date.now() + 2, name: 'Hotels', order: 1, items: [] },
        { id: Date.now() + 3, name: 'Things to Do', order: 2, items: [] }
      ]
    };
    setTrips([...trips, newTrip]);
    setActiveTrip(newTrip.id);
    setActiveTab('planner');
  };

  const handleUpdateTripName = (tripId, newName) => {
    setTrips(trips.map(trip =>
      trip.id === tripId ? { ...trip, name: newName } : trip
    ));
  };

  const handleTogglePin = (tripId) => {
    setTrips(trips.map(trip =>
      trip.id === tripId ? { ...trip, isPinned: !trip.isPinned } : trip
    ));
  };

  // Section CRUD operations  
  const handleAddSection = (tripId, sectionName = 'New Section') => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        const maxOrder = Math.max(...trip.sections.map(s => s.order), -1);
        return {
          ...trip,
          sections: [
            ...trip.sections,
            {
              id: Date.now(),
              name: sectionName,
              order: maxOrder + 1,
              items: []
            }
          ]
        };
      }
      return trip;
    }));
  };

  const handleUpdateSectionName = (tripId, sectionId, newName) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          sections: trip.sections.map(section =>
            section.id === sectionId ? { ...section, name: newName } : section
          )
        };
      }
      return trip;
    }));
  };

  const handleDeleteSection = (tripId, sectionId) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          sections: trip.sections.filter(s => s.id !== sectionId)
        };
      }
      return trip;
    }));
  };

  // Item CRUD operations
  const handleAddItem = (tripId, sectionId, itemData) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          sections: trip.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                items: [...section.items, {
                  id: Date.now(),
                  createdAt: Date.now(),
                  ...itemData
                }]
              };
            }
            return section;
          })
        };
      }
      return trip;
    }));
  };

  const handleDeleteItem = (tripId, sectionId, itemId) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          sections: trip.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                items: section.items.filter(item => item.id !== itemId)
              };
            }
            return section;
          })
        };
      }
      return trip;
    }));
  };

  // Drag and drop handlers
  const handleReorderSections = (tripId, startIndex, endIndex) => {
    console.log('[App.jsx] Reorder sections called:', { tripId, startIndex, endIndex });
    setTrips(prevTrips => prevTrips.map(trip => {
      if (trip.id === tripId) {
        const sortedSections = [...trip.sections].sort((a, b) => a.order - b.order);
        const [removed] = sortedSections.splice(startIndex, 1);
        sortedSections.splice(endIndex, 0, removed);

        // Update order values
        const reorderedSections = sortedSections.map((section, index) => ({
          ...section,
          order: index
        }));

        console.log('[App.jsx] Reordered sections:', reorderedSections.map(s => s.name));
        return {
          ...trip,
          sections: reorderedSections
        };
      }
      return trip;
    }));
  };

  const handleMoveItem = (tripId, sourceSectionId, sourceIndex, destSectionId, destIndex) => {
    console.log('[App.jsx] Move item called:', { tripId, sourceSectionId, sourceIndex, destSectionId, destIndex });
    setTrips(prevTrips => prevTrips.map(trip => {
      if (trip.id === tripId) {
        const newSections = trip.sections.map(s => ({ ...s, items: [...s.items] }));

        const sourceSection = newSections.find(s => s.id === sourceSectionId);
        const destSection = newSections.find(s => s.id === destSectionId);

        if (!sourceSection || !destSection) return trip;

        const [movedItem] = sourceSection.items.splice(sourceIndex, 1);
        destSection.items.splice(destIndex, 0, movedItem);

        console.log('[App.jsx] Item moved from', sourceSection.name, 'to', destSection.name);
        return {
          ...trip,
          sections: newSections
        };
      }
      return trip;
    }));
  };

  // Get only pinned trips for sidebar
  const pinnedTrips = trips.filter(trip => trip.isPinned);

  // State for search parameters
  const [currentSearchParams, setCurrentSearchParams] = useState(null);

  // Modal State
  const [addToTripModalOpen, setAddToTripModalOpen] = useState(false);
  const [itemToAdd, setItemToAdd] = useState(null);

  // Settings Modal State
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profile');

  const handleOpenSettings = (tab = 'profile') => {
    setSettingsTab(tab);
    setSettingsModalOpen(true);
  };

  const handleOpenAddToTripModal = (item) => {
    setItemToAdd(item);
    setAddToTripModalOpen(true);
  };

  const handleCloseAddToTripModal = () => {
    setAddToTripModalOpen(false);
    setItemToAdd(null);
  };

  const handleAddItemToTripFromModal = (tripId) => {
    if (!itemToAdd) return;

    const targetTrip = trips.find(t => t.id === tripId);
    if (!targetTrip) return;

    const isHotel = itemToAdd.id && itemToAdd.id.toString().startsWith('hotel');

    // Determine content
    const newItem = {
      id: Date.now(),
      type: 'text',
      content: isHotel ? `Hotel: ${itemToAdd.name}` : `Flight: ${itemToAdd.airline || 'Flight'}`, // Use available data
      preview: itemToAdd.image || null,
      createdAt: Date.now()
    };

    const targetSectionId = targetTrip.sections[0].id; // Default to first section
    // Or better specific sections:
    const hotelsSection = targetTrip.sections.find(s => s.name === 'Hotels');
    const flightsSection = targetTrip.sections.find(s => s.name === 'Flights');

    let finalSectionId = targetSectionId;
    if (isHotel && hotelsSection) finalSectionId = hotelsSection.id;
    else if (!isHotel && flightsSection) finalSectionId = flightsSection.id;

    handleAddItem(tripId, finalSectionId, newItem);
    handleCloseAddToTripModal();

    // Optional: switch to planner?
    // setActiveTrip(tripId);
    // setActiveTab('planner');
  };

  const handleCreateTripFromModal = () => {
    // Create trip and add item
    const newTripId = Date.now();
    const newTrip = {
      id: newTripId,
      name: 'New Trip',
      isPinned: true,
      sections: [
        { id: newTripId + 1, name: 'Flights', order: 0, items: [] },
        { id: newTripId + 2, name: 'Hotels', order: 1, items: [] },
        { id: newTripId + 3, name: 'Things to Do', order: 2, items: [] }
      ]
    };

    // Add item
    if (itemToAdd) {
      const isHotel = itemToAdd.id && itemToAdd.id.toString().startsWith('hotel');
      const newItem = {
        id: Date.now() + 10,
        type: 'text',
        content: isHotel ? `Hotel: ${itemToAdd.name}` : `Flight: ${itemToAdd.airline || 'Flight'}`,
        preview: itemToAdd.image || null,
        createdAt: Date.now()
      };

      if (isHotel) {
        newTrip.sections[1].items.push(newItem);
      } else {
        newTrip.sections[0].items.push(newItem);
      }
    }

    setTrips([...trips, newTrip]);
    setActiveTrip(newTripId);
    setActiveTab('planner');
    handleCloseAddToTripModal();
  };

  const handleSearchUpdate = (params) => {
    console.log('Search params updated:', params);
    setCurrentSearchParams(params);
  };

  // Handler for adding booked itinerary to planner
  const handleAddBookedTripToPlanner = (itinerary, bookingDetails) => {
    const tripId = Date.now();
    const baseTime = tripId;

    // Create sections based on itinerary days + flights/hotels
    const sections = [
      {
        id: baseTime + 1,
        name: 'Flights',
        order: 0,
        items: [
          {
            id: baseTime + 100,
            type: 'text',
            content: `✈️ ${bookingDetails.flight.outbound.airline} ${bookingDetails.flight.outbound.flight} - Departure ${bookingDetails.flight.outbound.departure}`,
            preview: null,
            createdAt: Date.now()
          },
          {
            id: baseTime + 101,
            type: 'text',
            content: `✈️ ${bookingDetails.flight.return.airline} ${bookingDetails.flight.return.flight} - Return ${bookingDetails.flight.return.departure}`,
            preview: null,
            createdAt: Date.now()
          }
        ]
      },
      {
        id: baseTime + 2,
        name: 'Accommodation',
        order: 1,
        items: [
          {
            id: baseTime + 200,
            type: 'text',
            content: `🏨 ${bookingDetails.hotel.name} - ${bookingDetails.hotel.nights} nights (${bookingDetails.hotel.roomType})`,
            preview: itinerary.image || null,
            createdAt: Date.now()
          }
        ]
      },
      {
        id: baseTime + 3,
        name: 'Car Rental',
        order: 2,
        items: [
          {
            id: baseTime + 300,
            type: 'text',
            content: `🚗 ${bookingDetails.carRental.company} - ${bookingDetails.carRental.vehicle}`,
            preview: null,
            createdAt: Date.now()
          }
        ]
      }
    ];

    // Add day-by-day activities as sections
    if (itinerary.days && itinerary.days.length > 0) {
      itinerary.days.forEach((day, index) => {
        sections.push({
          id: baseTime + 10 + index,
          name: `Day ${index + 1} - ${day.date}`,
          order: 3 + index,
          items: day.activities.map((activity, actIdx) => ({
            id: baseTime + 1000 + (index * 100) + actIdx,
            type: 'text',
            content: `${activity.time} - ${activity.title} (${activity.cost})`,
            preview: null,
            createdAt: Date.now()
          }))
        });
      });
    }

    const newTrip = {
      id: tripId,
      name: itinerary.title || 'Booked Trip',
      isPinned: false,
      sections
    };

    setTrips([...trips, newTrip]);
    setActiveTrip(tripId);
  };

  const handleNavigateToPlanner = () => {
    setActiveTab('planner');
  };

  // Render appropriate secondary sidebar based on active tab
  const renderSecondarySidebar = () => {
    if (activeTab === 'planner') {
      return (
        <PlannerSecondarySidebar
          trips={trips}
          activeTrip={activeTrip}
          onTripSelect={setActiveTrip}
          onTogglePin={handleTogglePin}
        />
      );
    }

    // Pass onSelectSearch to sidebars
    if (activeTab === 'journii' && appMode === 'search_results') {
      if (searchType === 'Stays') {
        return <HotelSecondarySidebar onSelectSearch={handleSearchUpdate} />;
      }
      return <ResultsSecondarySidebar onSelectSearch={handleSearchUpdate} />;
    }

    if (activeTab === 'journii' && appMode === 'chat_active') {
      return (
        <SecondarySidebar
          onCollapse={handleChatSidebarCollapse}
          onExpand={handleChatSidebarExpand}
          isCollapsed={!isChatSidebarOpen}
        />
      );
    }

    return null;
  };

  const renderContent = () => {
    // Transport tabs - show search-only interface
    const transportTabs = ['stays', 'flights', 'cars', 'cruises', 'experiences'];
    if (transportTabs.includes(activeTab)) {
      return (
        <SearchOnlyView
          initialSearchType={searchType}
          onSearchStart={(type, params) => {
            // Update search type and parameters
            setSearchType(type || 'Flights');
            setCurrentSearchParams(params || null);
            // Navigate to search results
            setActiveTab('journii');
            handleSearchStart();
          }}
        />
      );
    }

    if (activeTab === 'bucket_list') {
      return <BucketList />;
    }
    if (activeTab === 'itineraries') {
      return (
        <ItineraryList
          onAddTripToPlanner={handleAddBookedTripToPlanner}
          onNavigateToPlanner={handleNavigateToPlanner}
        />
      );
    }
    if (activeTab === 'membership') {
      return <Membership />;
    }
    if (activeTab === 'planner') {
      return (
        <Planner
          activeTrip={activeTrip}
          trips={trips}
          onUpdateTripName={handleUpdateTripName}
          onTogglePin={handleTogglePin}
          onAddSection={handleAddSection}
          onUpdateSectionName={handleUpdateSectionName}
          onDeleteSection={handleDeleteSection}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
          onReorderSections={handleReorderSections}
          onMoveItem={handleMoveItem}
        />
      );
    }
    // Search Results View - Pass currentSearchParams and use key to force refresh
    if (activeTab === 'journii' && appMode === 'search_results') {
      if (searchType === 'Stays') {
        return (
          <HotelResults
            initialSearchParams={currentSearchParams}
            key={currentSearchParams ? `hotels-${JSON.stringify(currentSearchParams)}` : 'hotels-default'}
            onAddToPlanner={handleOpenAddToTripModal}
          />
        );
      }
      return (
        <FlightResults
          initialSearchParams={currentSearchParams}
          key={currentSearchParams ? `flights-${JSON.stringify(currentSearchParams)}` : 'flights-default'}
          onAddToPlanner={handleOpenAddToTripModal}
        />
      );
    }
    // Home page (null activeTab) or Journii AI tab - show Chat Interface
    // viewMode determines whether to show initial welcome screen or chat history
    return (
      <ChatInterface
        viewMode={appMode}
        onChatStart={handleChatStart}
        onSearchStart={(type, params) => {
          // Update search type and parameters
          setSearchType(type || 'Flights');
          setCurrentSearchParams(params || null);
          // Navigate to search results
          setActiveTab('journii');
          handleSearchStart();
        }}
      />
    );
  };

  // Drag and Drop Handler
  const onDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;
    console.log('Global Drag End:', result);

    // If dropped outside any droppable
    if (!destination) return;

    // Handle Sidebar Item Drops
    if (type === 'SIDEBAR_ITEM') {
      // Case 1: Dragging Uncategorized Chat to a Section
      if (source.droppableId === 'uncategorized-chats' && destination.droppableId.startsWith('section-')) {
        const chatId = parseInt(draggableId.split('-')[1]);
        const chat = uncategorizedChats.find(c => c.id === chatId);

        if (chat) {
          // Parse destination trip and section IDs
          const [_, destTripIdStr, destSectionIdStr] = destination.droppableId.split('-');
          const destTripId = parseInt(destTripIdStr);
          const destSectionId = parseInt(destSectionIdStr);

          // Add as new item to the section
          const newItem = {
            type: 'text', // Default to text for chat
            content: `Chat: ${chat.name}`,
            preview: null
          };
          handleAddItem(destTripId, destSectionId, newItem);

          // Optional: Remove from uncategorized list
          setUncategorizedChats(prev => prev.filter(c => c.id !== chatId));
        }
        return;
      }

      // Case 2: Moving Items between Sections (or within same section)
      if (draggableId.startsWith('item-') && destination.droppableId.startsWith('section-')) {
        // draggableId format: item-tripId-sectionId-itemId
        const [__, sourceTripIdStr, sourceSectionIdStr, itemIdStr] = draggableId.split('-');
        const itemId = parseInt(itemIdStr);
        const sourceTripId = parseInt(sourceTripIdStr);
        const sourceSectionId = parseInt(sourceSectionIdStr);

        const [_, destTripIdStr, destSectionIdStr] = destination.droppableId.split('-');
        const destTripId = parseInt(destTripIdStr);
        const destSectionId = parseInt(destSectionIdStr);

        // Same trip, same section (Reorder) OR Same trip, different section (Move)
        // Note: Our handleMoveItem logic currently assumes same Trip. 
        // If dragging between trips, we'd need a cross-trip move handler. 
        // For now, assuming same trip or handling via add/delete if different.

        if (sourceTripId === destTripId) {
          handleMoveItem(sourceTripId, sourceSectionId, source.index, destSectionId, destination.index);
        } else {
          // Cross-trip drag (More complex, optional for now based on "between folders" usually implying same trip or global folders)
          // But let's implement basic cross-trip move:
          // 1. Find item data
          const sourceTrip = trips.find(t => t.id === sourceTripId);
          const sourceSection = sourceTrip.sections.find(s => s.id === sourceSectionId);
          const itemToMove = sourceSection.items.find(i => i.id === itemId);

          if (itemToMove) {
            // 2. Add to destination
            handleAddItem(destTripId, destSectionId, {
              ...itemToMove,
              id: Date.now() // New ID to be safe
            });
            // 3. Remove from source
            handleDeleteItem(sourceTripId, sourceSectionId, itemId);
          }
        }
        return;
      }
    }

    // Handle Planner Internal Reordering (delegated from Planner structure)
    if (type === 'section' || type === 'item') {
      // If it's a planner action, we use the existing handlers
      // We assume the destination.droppableId logic matches what Planner expects
      if (type === 'section') {
        if (source.index !== destination.index) {
          handleReorderSections(activeTrip, source.index, destination.index);
        }
      } else if (type === 'item') {
        const sourceSectionId = parseInt(source.droppableId);
        const destSectionId = parseInt(destination.droppableId);

        if (sourceSectionId !== destSectionId || source.index !== destination.index) {
          handleMoveItem(activeTrip, sourceSectionId, source.index, destSectionId, destination.index);
        }
      }
      return;
    }

    return;
  }

  const handleNavigateHome = () => {
    setActiveTab(null); // Clear active tab for neutral home state
    setAppMode('initial');
    setIsChatSidebarOpen(false); // No sidebar on home page
  };

  const handleJourniiClick = () => {
    setActiveTab('journii'); // Set Journii as active tab
    setAppMode('chat_active'); // Show chat interface with history
    setIsChatSidebarOpen(true); // Open the chat history sidebar
  };

  const handleGlobalChatStart = () => {
    // When user sends a message from global chat bar, switch to Journii
    handleJourniiClick();
  };

  // Determine if secondary sidebar is present
  const secondarySidebar = renderSecondarySidebar();
  const hasSecondarySidebar = secondarySidebar !== null;

  // Determine if secondary sidebar is collapsed
  // Only the chat secondary sidebar can be collapsed, others are always expanded
  const isSecondarySidebarCollapsed = (activeTab === 'journii' && appMode === 'chat_active')
    ? !isChatSidebarOpen
    : false; // Other secondary sidebars are always expanded

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MainLayout
        secondarySidebar={secondarySidebar}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        trips={pinnedTrips}
        onCreateTrip={handleCreateTrip}
        onNavigateHome={handleNavigateHome}
        onJourniiClick={handleJourniiClick}
        uncategorizedChats={uncategorizedChats}
        onOpenSettings={handleOpenSettings}
        onChatStart={handleGlobalChatStart}
        isPrimarySidebarCollapsed={isPrimarySidebarCollapsed}
        onPrimarySidebarToggle={setIsPrimarySidebarCollapsed}
        hasSecondarySidebar={hasSecondarySidebar}
        isSecondarySidebarCollapsed={isSecondarySidebarCollapsed}
      >
        {renderContent()}
      </MainLayout>

      <AddToTripModal
        isOpen={addToTripModalOpen}
        onClose={handleCloseAddToTripModal}
        trips={trips}
        onSelectTrip={handleAddItemToTripFromModal}
        onCreateNewTrip={handleCreateTripFromModal}
      />
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        initialTab={settingsTab}
      />
    </DragDropContext>
  )
}

export default App
