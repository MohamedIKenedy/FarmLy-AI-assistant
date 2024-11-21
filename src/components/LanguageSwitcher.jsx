import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCog, FaCheck } from 'react-icons/fa'; // Import the settings and check icons from react-icons
import './LanguageSwitcher.css'; // Import the CSS file

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false); // State to toggle the dropdown menu
  const [location, setLocation] = useState(''); // State to manage the location
  const menuRef = useRef(null); // Reference to the dropdown menu

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('selectedLanguage', language); // Save the selected language to localStorage
  };

  const changeLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('location', newLocation); // Save the location to localStorage
    // Save to config.json via backend server
    fetch('http://localhost:8000/config', { // Update the URL to point to the correct backend server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: newLocation }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Location saved successfully');
      } else {
        console.error('Failed to save location');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleLocationSubmit = () => {
    console.log('Submitting location:', location);
    changeLocation(location);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
    const savedLocation = localStorage.getItem('location');
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, [i18n]);

  return (
    <div className="language-switcher" ref={menuRef}>
      <button onClick={toggleMenu} className={`settings-icon ${showMenu ? 'rotate' : ''}`}>
        <FaCog />
      </button>
      {showMenu && (
        <div className="dropdown-menu animate-dropdown">
          <button
            className={i18n.language === 'en' ? 'selected' : ''}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button
            className={i18n.language === 'ur' ? 'selected' : ''}
            onClick={() => changeLanguage('ur')}
          >
            Urdu
          </button>
          <div className="location-input-container">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="location-input"
            />
            <button onClick={handleLocationSubmit} className="location-submit-button">
              <FaCheck size={20} color="#1E90FF" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;