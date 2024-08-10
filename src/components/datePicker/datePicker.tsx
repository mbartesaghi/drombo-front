import { DatePicker as MaterialDatePicker } from "@mui/x-date-pickers"

interface DatePickerProps {
  label: string;
}

const DatePicker = ({ label }: DatePickerProps) => {
  return (
    <MaterialDatePicker label={label} />
  );
}

export default DatePicker;
