import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIntelligence } from '../redux/slices/intelligenceSlice';

// Component for displaying search history with hover tooltips
// Shows previous searches and allows re-searching by clicking
const HistoryPanel = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.intelligence);

  const handleHistoryClick = (ip) => {
    console.info(`User clicked on history item: ${ip}`);
    dispatch(fetchIntelligence(ip));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (history.length === 0) {
    return (
      <div className="history-panel">
        <h3>Search History</h3>
        <p>No previous searches</p>
      </div>
    );
  }

  return (
    <div className="history-panel">
      <h3>Search History</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div 
            key={`${item.ip}-${item.timestamp}`}
            className="history-item"
            onClick={() => handleHistoryClick(item.ip)}
            title={`Click to search ${item.ip} again`}
          >
            <div className="history-main">
              <div className="history-ip">{item.ip}</div>
              <div className="history-time">{formatTimestamp(item.timestamp)}</div>
            </div>
            <div className="history-tooltip">
              <div className="tooltip-content">
                <div className="tooltip-title">Previous Results:</div>
                {item.data.country && <div>🌍 Country: {item.data.country}</div>}
                {item.data.isp && <div>🏢 ISP: {item.data.isp}</div>}
                {item.data.abuseScore !== undefined && <div>⚠️ Abuse Score: {item.data.abuseScore}/100</div>}
                {item.data.threatScore !== undefined && <div>🎯 Threat Score: {item.data.threatScore}/100</div>}
                <div className="tooltip-note">Click to search again</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;