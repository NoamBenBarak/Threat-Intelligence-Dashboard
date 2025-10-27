// API aggregation logic test
describe('API Aggregation Logic', () => {
  test('should aggregate data from multiple sources', () => {
    const abuseData = {
      abuseConfidenceScore: 25,
      totalReports: 5
    };

    const ipqsData = {
      hostname: 'dns.google',
      isp: 'Google LLC',
      country_code: 'US',
      vpn: false,
      fraud_score: 10
    };

    // Simulate aggregation logic
    const aggregatedData = {
      ip: '8.8.8.8',
      hostname: ipqsData.hostname || null,
      isp: ipqsData.isp || null,
      country: ipqsData.country_code || null,
      abuseScore: abuseData.abuseConfidenceScore || 0,
      recentReports: abuseData.totalReports || 0,
      vpnDetected: ipqsData.vpn || false,
      threatScore: ipqsData.fraud_score || 0
    };

    expect(aggregatedData.ip).toBe('8.8.8.8');
    expect(aggregatedData.hostname).toBe('dns.google');
    expect(aggregatedData.isp).toBe('Google LLC');
    expect(aggregatedData.country).toBe('US');
    expect(aggregatedData.abuseScore).toBe(25);
    expect(aggregatedData.recentReports).toBe(5);
    expect(aggregatedData.vpnDetected).toBe(false);
    expect(aggregatedData.threatScore).toBe(10);
  });

  test('should handle missing data gracefully', () => {
    const abuseData = null;
    const ipqsData = null;

    // Simulate aggregation with missing data
    const aggregatedData = {
      ip: '8.8.8.8',
      hostname: ipqsData?.hostname || null,
      isp: ipqsData?.isp || null,
      country: ipqsData?.country_code || null,
      abuseScore: abuseData?.abuseConfidenceScore || 0,
      recentReports: abuseData?.totalReports || 0,
      vpnDetected: ipqsData?.vpn || false,
      threatScore: ipqsData?.fraud_score || 0
    };

    expect(aggregatedData.ip).toBe('8.8.8.8');
    expect(aggregatedData.hostname).toBe(null);
    expect(aggregatedData.isp).toBe(null);
    expect(aggregatedData.country).toBe(null);
    expect(aggregatedData.abuseScore).toBe(0);
    expect(aggregatedData.recentReports).toBe(0);
    expect(aggregatedData.vpnDetected).toBe(false);
    expect(aggregatedData.threatScore).toBe(0);
  });
});
