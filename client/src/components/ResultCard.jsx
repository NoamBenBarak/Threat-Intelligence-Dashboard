import React from "react";
import { UI_TEXT } from "../constants/consts.js";

export const ResultCard = ({ data }) => {
  if (!data) {
    console.info(`ResultCard rendered with no data`);
    return null;
  }

  console.info(`ResultCard rendered with data for IP: ${data.ip}`, {
    abuseScore: data.abuseScore,
    threatScore: data.threatScore,
    vpnOrProxyDetected: data.vpnOrProxyDetected});

  // Helper function to format boolean values
  const formatBoolean = (value) => {
    return value ? 'Yes' : 'No';
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <div className="result-ip">{data.ip}</div>
        <div className="result-subtitle">Threat Intelligence Report</div>
      </div>
      
      <div className="result-grid">
        <div className="result-item">
          <div className="result-label">Hostname</div>
          <div className="result-value">{data.hostname || UI_TEXT.N_A}</div>
        </div>
        
        <div className="result-item">
          <div className="result-label">ISP</div>
          <div className="result-value">{data.isp || UI_TEXT.N_A}</div>
        </div>
        
        <div className="result-item">
          <div className="result-label">Country</div>
          <div className="result-value">{data.country || UI_TEXT.N_A}</div>
        </div>
        
        <div className="result-item">
          <div className="result-label">Abuse Score</div>
          <div className="result-value">
            {data.abuseScore}/100
          </div>
        </div>
        
        <div className="result-item">
          <div className="result-label">Recent Reports</div>
          <div className="result-value">{data.recentReports || 0}</div>
        </div>
        
        <div className="result-item">
          <div className="result-label">VPN/Proxy Detected</div>
          <div className="result-value">
            {formatBoolean(data.vpnOrProxyDetected)}
          </div>
        </div>
        
        <div className="result-item">
          <div className="result-label">Threat Score</div>
          <div className="result-value">
            {data.threatScore}/100
          </div>
        </div>
      </div>
    </div>
  );
};
