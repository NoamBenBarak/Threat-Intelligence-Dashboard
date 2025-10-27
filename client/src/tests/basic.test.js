describe('Basic Frontend Tests', () => {
  test('should pass basic math test', () => {
    expect(2 + 2).toBe(4);
  });

  test('should validate IP regex', () => {
    const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    
    expect(ipRegex.test('8.8.8.8')).toBe(true);
    expect(ipRegex.test('1.1.1.1')).toBe(true);
    expect(ipRegex.test('999.999.999.999')).toBe(false);
    expect(ipRegex.test('not-an-ip')).toBe(false);
  });

  test('should format boolean values correctly', () => {
    const formatBoolean = (value) => value ? 'Yes' : 'No';
    
    expect(formatBoolean(true)).toBe('Yes');
    expect(formatBoolean(false)).toBe('No');
  });
});
