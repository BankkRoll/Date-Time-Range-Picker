"use client";

import { useState } from "react";
import {
  DateTimeRangePicker,
  type DateTimeRange,
} from "@/components/date-time-range-picker/date-time-range-picker";

export default function BasicDateTimeRangePickerExample() {
  const [dateTimeRange, setDateTimeRange] = useState<{
    range: DateTimeRange;
  }>({
    range: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <DateTimeRangePicker
        initialDateFrom={dateTimeRange.range.from}
        initialDateTo={dateTimeRange.range.to}
        onUpdate={(values) => setDateTimeRange(values)}
      />
    </div>
  );
}
