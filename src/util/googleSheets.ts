const SHEET_ID = '1KVgrjiXAyfRWLwvgZzVrhMDXPoR3g5oFiuYiZ24E1HE';
const API_KEY = 'AIzaSyCDKnXvvqXwb_vRuPX8lesvbcS4X6EPXsY';

export async function appendToGoogleSheet(
  fieldValues: { code: string; value: any }[]
): Promise<{ success: boolean; error?: string }> {
  try {
    // Prepare the values - add timestamp and then all field values
    const timestamp = new Date().toISOString();
    const values = [
      timestamp,
      ...fieldValues.map(f => {
        const value = f.value;
        // Handle special types
        if (value === null || value === undefined) return '';
        if (typeof value === 'object' && 'teamNumber' in value) {
          return (value as { teamNumber: number }).teamNumber;
        }
        return String(value);
      }),
    ];

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:Z:append?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [values],
          majorDimension: 'ROWS',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to append to sheet');
    }

    return { success: true };
  } catch (error) {
    console.error('Google Sheets error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
