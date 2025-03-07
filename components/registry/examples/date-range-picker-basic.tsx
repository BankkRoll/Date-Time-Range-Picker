"use client";

import { useState } from "react";
import { DateRangePicker } from "@/components/date-time-range-picker/date-range-picker";
import type { DateTimeRange } from "@/components/date-time-range-picker/date-time-range-picker";

export default function BasicDateRangePickerExample() {
  const [dateRange, setDateRange] = useState<{
    range: DateTimeRange;
  }>({
    range: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <DateRangePicker
        initialDateFrom={dateRange.range.from}
        initialDateTo={dateRange.range.to}
        onUpdate={(values) => setDateRange(values)}
        showCompare={false}
      />
    </div>
  );
}
