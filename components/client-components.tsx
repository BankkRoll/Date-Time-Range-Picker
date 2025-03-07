"use client";

import { Calendar } from "@/components/date-time-range-picker/calendar";
import { DateInput } from "@/components/date-time-range-picker/date-input";
import { DateRangePicker } from "@/components/date-time-range-picker/date-range-picker";
import { DateTimeInput } from "@/components/date-time-range-picker/date-time-input";
import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range-picker";
import { TimeInput } from "@/components/date-time-range-picker/time-input";
import BasicDateRangePickerExample from "@/components/registry/examples/date-range-picker-basic";
import DateRangePickerWithComparisonExample from "@/components/registry/examples/date-range-picker-with-comparison";
import BasicDateTimeRangePickerExample from "@/components/registry/examples/date-time-range-picker-basic";

export const ClientCalendar = () => <Calendar />;
export const ClientDateInput = () => (
  <DateInput onChange={(date) => console.log(date)} />
);
export const ClientTimeInput = () => (
  <TimeInput onChange={(time) => console.log(time)} />
);
export const ClientDateTimeInput = () => (
  <DateTimeInput onChange={(dateTime) => console.log(dateTime)} />
);
export const ClientDateRangePicker = () => (
  <DateRangePicker onUpdate={(values) => console.log(values)} />
);
export const ClientDateTimeRangePicker = () => (
  <DateTimeRangePicker onUpdate={(values) => console.log(values)} />
);

export const ClientBasicDateRangePickerExample = BasicDateRangePickerExample;
export const ClientDateRangePickerWithComparisonExample =
  DateRangePickerWithComparisonExample;
export const ClientBasicDateTimeRangePickerExample =
  BasicDateTimeRangePickerExample;
