const SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbyoo45v9awPvH1U3xwKGgtZFWw8IT6vaEiyA27uvmFVFhB0MTDQaxROEM97cN2aqGrl-w/exec';

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

    await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      mode: 'no-cors',
    });

    // With no-cors mode, we can't read the response directly
    // So we'll assume success if the fetch doesn't throw
    return { success: true };
  } catch (error) {
    console.error('Google Sheets error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
