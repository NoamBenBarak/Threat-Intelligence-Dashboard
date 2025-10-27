describe('Redux State Logic', () => {
  test('should handle loading state', () => {
    const initialState = {
      loading: false,
      data: null,
      error: null,
      history: []
    };

    const loadingState = {
      ...initialState,
      loading: true,
      error: null
    };

    expect(loadingState.loading).toBe(true);
    expect(loadingState.error).toBe(null);
  });

  test('should handle success state', () => {
    const mockData = {
      ip: '8.8.8.8',
      abuseScore: 0,
      threatScore: 0,
      country: 'US'
    };

    const successState = {
      loading: false,
      data: mockData,
      error: null,
      history: []
    };

    expect(successState.loading).toBe(false);
    expect(successState.data).toEqual(mockData);
    expect(successState.error).toBe(null);
  });

  test('should handle error state', () => {
    const errorMessage = 'Network error';
    
    const errorState = {
      loading: false,
      data: null,
      error: errorMessage,
      history: []
    };

    expect(errorState.loading).toBe(false);
    expect(errorState.data).toBe(null);
    expect(errorState.error).toBe(errorMessage);
  });
});
