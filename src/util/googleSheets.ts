const SCRIPT_URL = 'https://script.googleapis.com/macros/s/AKfycbwhWVN-NZES4GrHK35p2o_T5O3IHfmN8BrX2THR0jF6QauLXiKN5HCSVUpPiQ42TkZUSQ/exec';

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
      body: JSON.stringify(values),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to append to sheet');
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
