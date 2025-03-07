"use client";

import { useState } from "react";
import { DateRangePicker } from "@/components/date-time-range-picker/date-range-picker";
import type { DateTimeRange } from "@/components/date-time-range-picker/date-time-range-picker";

export default function DateRangePickerWithComparisonExample() {
  const [dateRange, setDateRange] = useState<{
    range: DateTimeRange;
    rangeCompare?: DateTimeRange;
  }>({
    range: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    rangeCompare: {
      from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      to: new Date(
        new Date().setFullYear(
          new Date().getFullYear() - 1,
          new Date().getMonth(),
          new Date().getDate() + 7,
        ),
      ),
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <DateRangePicker
        initialDateFrom={dateRange.range.from}
        initialDateTo={dateRange.range.to}
        initialCompareFrom={dateRange.rangeCompare?.from}
        initialCompareTo={dateRange.rangeCompare?.to}
        onUpdate={(values) => setDateRange(values)}
      />

      <div className="mt-4 rounded-md bg-muted p-4">
        <pre className="text-sm">
          {JSON.stringify(
            dateRange,
            (key, value) => {
              if (value instanceof Date) {
                return value.toISOString();
              }
              return value;
            },
            2,
          )}
        </pre>
      </div>
    </div>
  );
}
