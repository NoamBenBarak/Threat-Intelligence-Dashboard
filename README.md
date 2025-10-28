# Threat Intelligence Dashboard

A full-stack application that allows users to input an IP address and retrieve threat intelligence data about it. Built with React frontend and Node.js backend-for-frontend (BFF).

## Features

- **IP Intelligence Lookup**: Get comprehensive threat intelligence data for any IP address
- **Real-time Data**: Fetch data from multiple external APIs (AbuseIPDB, IPQualityScore)
- **Search History**: Persistent search history with localStorage (last 10 searches)
- **Responsive UI**: Modern, clean interface with SCSS styling
- **Caching**: Server-side caching for improved performance
- **Error Handling**: Comprehensive error handling and validation
- **Logging**: Structured logging for debugging and monitoring

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

### Frontend

- **React** with functional components and hooks
- **Redux Toolkit** for state management
- **SCSS** for styling
- **Axios** for API calls
- **React Testing Library** for testing

### Backend

- **Node.js** with Express
- **Winston** for logging
- **NodeCache** for server-side caching
- **Axios** for external API calls
- **Jest** for testing

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API keys for external services (provided below)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/NoamBenBarak/threat-intelligence-dashboard.git
cd threat-intelligence-dashboard
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

Add the following environment variables to `server/.env`:

```env
# API Keys
# The original API keys provided in the assignment had expired, please register for your own API keys.
ABUSE_IPDB_KEY=your_abuseipdb_key_here
IPQUALITYSCORE_KEY=your_ipqualityscore_key_here

# Server Configuration
PORT=5000
```

### 4. Start the Application

#### Start Backend Server

```bash
cd server
npm start
```

The backend will run on `http://localhost:5000`

#### Start Frontend (in a new terminal)

```bash
cd client
npm start
```

The frontend will run on `http://localhost:3000`

## Testing

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

## API Endpoint

### GET /api/intel?ip={ip_address}

Fetches threat intelligence data for the specified IP address.

**Parameters:**

- `ip` (query string): Valid IPv4 address

**Response:**

```json
{
  "ip": "8.8.8.8",
  "hostname": "dns.google",
  "isp": "Google LLC",
  "country": "US",
  "abuseScore": 0,
  "recentReports": 0,
  "vpnDetected": false,
  "threatScore": 0
}
```

**Error Responses:**

- `400`: Invalid IP address format
- `500`: Server error or API failure

## IP Validation

The application validates IP addresses on both client and server sides:

- **Format**: Must be valid IPv4 format
- **Private IPs**: Not allowed (192.168.x.x, 10.x.x.x, etc.)
- **Localhost**: Not allowed (127.0.0.1)
- **Special IPs**: Not allowed (0.0.0.0, 255.255.255.255)

## Caching

- **Server-side**: NodeCache with 1-hour TTL for API responses
- **Client-side**: localStorage for search history persistence (10 entries max)

**Note**: Client-side API response caching was not implemented due to time constraints. The server-side caching provides sufficient performance benefits for this use case.

## Logging

- **Backend**: Winston logger with console and file output
- **Frontend**: Console logging for debugging
- **Log Levels**: info, warn, error

## Styling

The application uses SCSS with:

- CSS variables for consistent theming
- Responsive design
- Modern UI components
- Clean, minimal styling

## Deployment

### Production Build

```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

### Environment Variables for Production

Ensure the following are set in production:

- `PORT=5000` (or your preferred port)
- API keys for external services

## Troubleshooting

### Common Issues

1. **API Key Errors**: Ensure `.env` file exists and contains valid API keys
2. **Port Conflicts**: Change PORT in `.env` if 5000 is occupied
3. **CORS Issues**: Backend is configured to allow frontend requests
4. **Cache Issues**: Clear browser cache or restart server

### Debug Mode

The application uses Winston logger with `info` level logging by default. All API calls, cache operations, and errors are logged to console and files.

## Development Approach & Tradeoffs

### **Architecture Decisions**

**Redux Toolkit vs Context API**: Chose Redux Toolkit for state management due to its built-in async thunk support, which simplifies API call handling and provides better debugging tools. The learning curve is steeper than Context API, but the benefits outweigh the complexity for this use case.

**Server-side Caching**: Implemented NodeCache for API responses to reduce external API calls and improve performance. Tradeoff: Added memory usage but significantly improved response times for repeated requests.

**History Storage Strategy**: Implemented a hybrid approach using both Redux state and localStorage for search history. Redux provides real-time state management while localStorage ensures persistence across browser sessions. This dual approach provides immediate UI updates and data persistence, but requires keeping both stores synchronized.

### **Technical Tradeoffs**

**Client-side vs Server-side Validation**: Implemented IP validation on both sides. Client-side provides immediate feedback, server-side ensures security. This adds some code duplication but improves user experience and security.

**Error Handling Strategy**: Used a layered approach - client-side for UX, server-side for logging and fallbacks. This provides comprehensive error coverage but requires maintaining error handling in multiple places.

**API Response Structure**: Chose to aggregate data from multiple APIs into a unified format rather than returning raw responses. This simplifies frontend consumption but requires more backend processing.

### **Performance Considerations**

**Parallel API Calls**: Used Promise.all for simultaneous API calls to AbuseIPDB and IPQualityScore. This reduces total response time but increases complexity if one API fails.

**Cache TTL**: Set 1-hour cache TTL as a balance between data freshness and performance. Longer TTL improves performance but may show stale data.

**History Limit**: Limited search history to 10 entries to prevent localStorage bloat while maintaining useful functionality.

### **Code Organization**

**Constants Centralization**: Created separate consts.js files for client and server to centralize configuration. This improves maintainability but requires keeping constants in sync.

**Component Structure**: Used functional components with hooks throughout for consistency and modern React practices. This provides better performance and cleaner code.

**Testing Strategy**: Implemented minimal but comprehensive tests covering core logic and component rendering. Focused on essential functionality rather than 100% coverage to balance development time with quality assurance.

### **Security Considerations**

**API Key Management**: Used environment variables for API keys with .env file. This keeps sensitive data out of version control but requires proper deployment configuration.

**IP Validation**: Implemented comprehensive IP validation to prevent abuse and ensure data quality. This adds validation overhead but prevents invalid requests from reaching external APIs.

**Error Messages**: Used generic error messages for users while logging detailed errors server-side. This prevents information leakage but maintains debugging capability.

---

**Note**: The original API keys provided in the assignment had expired, so new keys were configured for testing purposes. For production use, please register for your own API keys.
