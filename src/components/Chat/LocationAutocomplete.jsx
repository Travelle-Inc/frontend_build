import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Plane } from 'lucide-react';
import { searchLocations } from '../../utils/mockLocations';
import './InputArea.css'; // Relies on existing Css, will add specifics there

const LocationAutocomplete = ({ placeholder, onSelect, icon: Icon = MapPin }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);
        if (val.length >= 2) {
            const results = searchLocations(val);
            setSuggestions(results);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    const handleSelect = (location) => {
        setInputValue(location.name);
        setIsOpen(false);
        if (onSelect) onSelect(location);
    };

    return (
        <div className="location-autocomplete-wrapper" ref={wrapperRef}>
            <div className="input-with-icon">
                <Icon size={18} className="input-inner-icon" />
                <input
                    type="text"
                    className="location-input"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => inputValue.length >= 2 && setIsOpen(true)}
                />
            </div>

            {isOpen && suggestions.length > 0 && (
                <div className="autocomplete-dropdown">
                    {suggestions.map((loc) => (
                        <div
                            key={loc.id}
                            className="autocomplete-item"
                            onClick={() => handleSelect(loc)}
                        >
                            <div className="autocomplete-icon">
                                {loc.type === 'airport' ? <Plane size={14} /> : <MapPin size={14} />}
                            </div>
                            <div className="autocomplete-text">
                                <span className="main-text">{loc.name}</span>
                                <span className="sub-text">{loc.subtext}</span>
                            </div>
                            <span className="code-text">{loc.id}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationAutocomplete;
