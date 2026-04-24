import { Copy, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useMemo, useState } from 'react';
import { getFieldValue, useQRScoutState } from '../../store/store';
import { appendToGoogleSheet } from '../../util/googleSheets';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { PreviewText } from './PreviewText';

/** Serialize a field value for QR code or display; TBA-team-and-robot is stored as an object. */
function fieldValueToQrString(value: unknown): string {
  if (value != null && typeof value === 'object' && 'teamNumber' in value) {
    const { teamNumber } = value as { teamNumber: number };
    return String(teamNumber);
  }
  if (value === null || value === undefined) return '';
  return String(value);
}

export interface QRModalProps {
  disabled?: boolean;
}

export function QRModal(props: QRModalProps) {
  const fieldValues = useQRScoutState(state => state.fieldValues);
  const formData = useQRScoutState(state => state.formData);
  const robotValue = getFieldValue('robot');
  const title = `${fieldValueToQrString(robotValue)} - M${getFieldValue(
    'matchNumber',
  )}`.toUpperCase();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const qrCodeData = useMemo(
    () =>
      fieldValues
        .map(f => fieldValueToQrString(f.value))
        .join(formData.delimiter),
    [fieldValues, formData.delimiter],
  );
  //Two seperate values are required- qrCodePreview is what is shown to the user beneath the QR code, qrCodeData is the actual data.

  const handleSubmitToSheet = async () => {
    setIsSubmitting(true);
    setSubmitMessage(null);
    const result = await appendToGoogleSheet(fieldValues);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitMessage({ type: 'success', text: 'Data submitted to sheet!' });
    } else {
      setSubmitMessage({ type: 'error', text: `Error: ${result.error}` });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={props.disabled}>
          <QrCode className="size-5" />
          Commit
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[95%]">
        <DialogTitle className="text-3xl text-primary text-center font-rhr-ns tracking-wider ">
          {title}
        </DialogTitle>
        <div className="flex flex-col items-center gap-6 overflow-y-scroll">
          <div className="bg-white p-4 rounded-md">
            <QRCodeSVG className="m-2 mt-4" size={256} value={qrCodeData} />
          </div>
          <PreviewText data={qrCodeData} />
          {submitMessage && (
            <div className={`text-center text-sm font-medium ${submitMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {submitMessage.text}
            </div>
          )}
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            onClick={handleSubmitToSheet}
            disabled={isSubmitting}
            variant="default"
          >
            {isSubmitting ? 'Submitting...' : 'Submit to Sheet'}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(qrCodeData)}
          >
            <Copy className="size-4" /> Copy Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
