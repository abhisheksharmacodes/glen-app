import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function getDisabledDates(ranges) {
  const dates = [];
  ranges.forEach(({ start, end }) => {
    let current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  });
  return dates;
}

function DatePicker({ startDate, endDate, onChange, disabledRanges = [] }) {
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handleSelect = (ranges) => {
    onChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  const disabledDates = getDisabledDates(disabledRanges);

  return (
    <div className="flex flex-col mx-auto">
      <DateRangePicker
        ranges={[selectionRange]}
        minDate={new Date()}
        rangeColors={["#FD5B61"]}
        onChange={handleSelect}
        disabledDates={disabledDates}
      />
    </div>
  );
}

export default DatePicker; 