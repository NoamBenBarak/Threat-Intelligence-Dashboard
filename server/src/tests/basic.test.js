// Simple test to verify Jest is working
describe('Basic Server Tests', () => {
  test('should pass basic math test', () => {
    expect(2 + 2).toBe(4);
  });

  test('should validate IP format', () => {
    const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    
    expect(ipRegex.test('8.8.8.8')).toBe(true);
    expect(ipRegex.test('1.1.1.1')).toBe(true);
    expect(ipRegex.test('999.999.999.999')).toBe(false);
    expect(ipRegex.test('not-an-ip')).toBe(false);
  });

  test('should check if string is valid IP', () => {
    function isValidIP(ip) {
      const parts = ip.split('.');
      if (parts.length !== 4) return false;
      
      return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255 && part === num.toString();
      });
    }

    expect(isValidIP('8.8.8.8')).toBe(true);
    expect(isValidIP('192.168.1.1')).toBe(true);
    expect(isValidIP('999.999.999.999')).toBe(false);
    expect(isValidIP('not-an-ip')).toBe(false);
  });
});
