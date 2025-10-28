# Threat Intelligence Dashboard

A full-stack application that allows users to input an IP address and retrieve threat intelligence data about it. 

## Features

- **IP Intelligence Lookup**: Get comprehensive threat intelligence data for any IP address
- **Real-time Data**: Fetch data from multiple external APIs (AbuseIPDB, IPQualityScore)
- **Search History**: Persistent search history with localStorage (last 10 searches)
- **Caching**: Server-side caching for improved performance
- **Error Handling**: Comprehensive error handling and validation

## Data Fields

The application displays the following intelligence data:

- **IP Address**: The validated input IP
- **Hostname**: DNS hostname (if available)
- **ISP**: Internet service provider/carrier name
- **Country**: Geolocation result (country code)
- **Abuse Score**: AbuseIPDB confidence score (0-100)
- **Recent Reports**: Number of abuse reports in last 90 days
- **VPN/Proxy Detected**: Whether IP is flagged as VPN/proxy
- **Threat Score**: Overall threat score from IPQualityScore (0-100)

## Tech Stack

**Frontend:** React, Redux Toolkit, SCSS, Axios  
**Backend:** Node.js (Express), Axios, Winston, NodeCache  
**Testing:** Jest, React Testing Library


## Installation & Setup
```bash
git clone https://github.com/NoamBenBarak/threat-intelligence-dashboard.git
cd threat-intelligence-dashboard
cd server && npm install
touch .env
npm start
cd ../client && npm install
npm start
```

The frontend will run on `http://localhost:3000`
The backend will run on `http://localhost:5000`

`server/.env`:
```env
# API Keys
ABUSE_IPDB_KEY=your_abuseipdb_key_here
IPQUALITYSCORE_KEY=your_ipqualityscore_key_here

# Server Configuration
PORT=5000
```


## Development Approach & Tradeoffs

### **Architecture Decisions**
Below are the main design and implementation decisions made during development.

**Redux Toolkit vs Context API**: Chose Redux Toolkit for state management due to its built-in async thunk support, which simplifies API call handling and provides better debugging tools. The learning curve is steeper than Context API, but the benefits outweigh the complexity for this use case.

**Server-side Caching**: Implemented NodeCache for API responses to reduce external API calls and improve performance. Tradeoff: Added memory usage but significantly improved response times for repeated requests.

**Note**: Client-side API response caching was not implemented due to time constraints. The server-side caching provides sufficient performance benefits for this use case.

**History Storage Strategy**: Implemented a hybrid approach using both Redux state and localStorage for search history. Redux provides real-time state management while localStorage ensures persistence across browser sessions. This dual approach provides immediate UI updates and data persistence, but requires keeping both stores synchronized.

### **Technical Tradeoffs**

**Client-side vs Server-side Validation**: Implemented IP validation on both sides. Client-side provides immediate feedback, server-side ensures security. This adds some code duplication but improves user experience and security.

**Error Handling Strategy**: Used a layered approach - client-side for UX, server-side for logging and fallbacks. This provides comprehensive error coverage but requires maintaining error handling in multiple places.

**API Response Structure**: Chose to aggregate data from multiple APIs into a unified format rather than returning raw responses. This simplifies frontend consumption but requires more backend processing.


---


**Note**: The original API keys provided in the assignment had expired, so new keys were configured for testing purposes. For production use, please register for your own API keys.
