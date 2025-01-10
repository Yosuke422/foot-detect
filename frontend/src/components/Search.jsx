import React from "react"
import { useNavigate } from "react-router-dom"
import "../assets/styles/Search.css"

const Search = ({ showModal, onClose }) => {
  const mockData = [
    {
      id: 1,
      name: "Center 1",
      city: "Paris",
      playersRange: "U18",
      date: "2025-01-10",
    },
    {
      id: 2,
      name: "Center 2",
      city: "Lyon",
      playersRange: "U12",
      date: "2025-02-15",
    },
    {
      id: 3,
      name: "Center 3",
      city: "Nice",
      playersRange: "U14",
      date: "2025-02-15",
    },
    {
      id: 4,
      name: "Center 4",
      city: "Marseille",
      playersRange: "U16",
      date: "2025-03-01",
    },
    {
      id: 5,
      name: "Center 5",
      city: "Paris",
      playersRange: "U18",
      date: "2025-01-10",
    },
    {
      id: 6,
      name: "Center 6",
      city: "Toulouse",
      playersRange: "Senior",
      date: "2025-01-10",
    },
  ]

  const navigate = useNavigate()
  const [selectedCities, setSelectedCities] = React.useState([])
  const [showAdditionalFilters, setShowAdditionalFilters] = React.useState(false)
  const [selectedPlayersRange, setSelectedPlayersRange] = React.useState("")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState("")

  const cityFilters = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"]
  const playerRanges = ["U12", "U14", "U16", "U18", "Senior"]

  const toggleCity = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city))
    } else {
      setSelectedCities([...selectedCities, city])
    }
  }

  const filteredData = mockData.filter((item) => {
    const matchCity =
      selectedCities.length === 0 || selectedCities.includes(item.city)

    const matchPlayers =
      selectedPlayersRange === "" ||
      item.playersRange === selectedPlayersRange

    const normalizedSearch = searchTerm.toLowerCase()
    const matchSearch =
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.city.toLowerCase().includes(normalizedSearch)

    const matchDate = !selectedDate || item.date === selectedDate

    return matchCity && matchPlayers && matchSearch && matchDate
  })

  const handleReserve = () => {
    onClose()
    navigate("/booking")
  }


  if (!showModal) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-modal-button"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="modal-title">List of Training Centers</h2>

        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="plus-criteres-button"
          onClick={() => setShowAdditionalFilters(!showAdditionalFilters)}
        >
          {showAdditionalFilters ? "Hide Filters" : "+ More Filters"}
        </button>

        {showAdditionalFilters && (
          <>
            <div className="city-filter-section">
              <h4 className="section-title">Filter by City:</h4>
              <div className="filter-bubbles">
                {cityFilters.map((city) => (
                  <div
                    key={city}
                    className={`filter-bubble ${
                      selectedCities.includes(city) ? "active" : ""
                    }`}
                    onClick={() => toggleCity(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <div className="additional-filters">
              <h4 className="section-title">Number of Players:</h4>
              <div className="player-range-options">
                {playerRanges.map((range) => (
                  <label key={range} className="radio-label">
                    <input
                      type="radio"
                      name="playerRange"
                      value={range}
                      checked={selectedPlayersRange === range}
                      onChange={(e) => setSelectedPlayersRange(e.target.value)}
                    />
                    {range}
                  </label>
                ))}
                <label className="radio-label">
                  <input
                    type="radio"
                    name="playerRange"
                    value=""
                    checked={selectedPlayersRange === ""}
                    onChange={(e) => setSelectedPlayersRange(e.target.value)}
                  />
                  Any
                </label>
              </div>
            </div>

            <div className="date-filter-section">
              <h4 className="section-title">Select a Date:</h4>
              <input
                type="date"
                className="date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {selectedDate && (
                <button
                  className="clear-date-button"
                  onClick={() => setSelectedDate("")}
                >
                  Clear Date
                </button>
              )}
            </div>
          </>
        )}

        <div className="results-section">
          <h3 className="section-title">Results</h3>
          {filteredData.length > 0 ? (
            <ul className="results-list">
              {filteredData.map((center) => (
                <li key={center.id} className="result-item">
                  <div className="center-info">
                    <strong>{center.name}</strong>
                    <span className="center-details">
                      {center.city} — {center.playersRange} players
                      <br />
                      <em>Available on: {center.date}</em>
                    </span>
                  </div>
                  <button
                    className="reserve-button"
                    onClick={() => handleReserve()}
                    
                  >
                    Reserve
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
