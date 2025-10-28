// Load search history from localStorage
// Returns empty array if no history exists or if there's an error
export const loadFromHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem('threat-intelligence-history') || '[]');
      console.info(`Loaded ${history.length} items from search history`);
      return history;
    } catch (error) {
      console.error('Failed to load history:', error);
      return []; 
    }
  };

// Save new search entry to localStorage
// Automatically handles duplicates and maintains max 10 entries
export const saveToHistory = (ip, data) => {
    try {
      const existingHistory = JSON.parse(localStorage.getItem('threat-intelligence-history') || '[]');
      
      const newEntry = {
        ip,
        timestamp: new Date().toISOString(),
        data: {
          abuseScore: data.abuseScore,
          threatScore: data.threatScore,
          country: data.country,
          isp: data.isp
        }
      };
      
      const filteredHistory = existingHistory.filter(item => item.ip !== ip);
      
      const updatedHistory = [newEntry, ...filteredHistory].slice(0, 10);
      
      localStorage.setItem('threat-intelligence-history', JSON.stringify(updatedHistory));
      console.info(`Saved IP ${ip} to search history`);
    } catch (error) {
      console.error('Failed to save to history:', error);
    }
  };

export const clearHistory = () => {
    try {
      localStorage.removeItem('threat-intelligence-history');
      console.info('Cleared all search history from localStorage');
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };