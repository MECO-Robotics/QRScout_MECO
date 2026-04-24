const SCRIPT_URL = 'https://script.googleapis.com/macros/s/AKfycbz0hyBVi_RvGFs_U90OUXUJ4OxwKa5RbegtxEA-maXCfbr-kD-vuA4aYYBIoN6kXkrPbw/exec';

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

    const response = await fetch(SCRIPT_URL, {
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
