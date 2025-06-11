"use client";

import { DateInput } from "@/components/date-time-range-picker/date-input";
import { DateRangePicker } from "@/components/date-time-range-picker/date-range-picker";
import { DateTimeInput } from "@/components/date-time-range-picker/date-time-input";
import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range-picker";
import { TimeInput } from "@/components/date-time-range-picker/time-input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface RegistryComponentPreviewProps {
  componentName: string;
  className?: string;
}

interface DateRange {
  from: Date;
  to: Date | undefined;
}

interface DateTimeRange {
  from: Date | undefined;
  to: Date | undefined;
}

export function RegistryComponentPreview({
  componentName,
  className,
}: RegistryComponentPreviewProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [dateTimeRange, setDateTimeRange] = useState<DateTimeRange>({
    from: new Date(),
    to: new Date(),
  });

  const renderComponent = () => {
    switch (componentName) {
      case "date-input":
        return <DateInput value={date} onChange={setDate} />;
      case "time-input":
        return <TimeInput value={date} onChange={setDate} />;
      case "date-time-input":
        return <DateTimeInput value={date} onChange={setDate} />;
      case "date-range-picker":
        return (
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            onUpdate={({ range }: { range: DateRange }) => setDateRange(range)}
          />
        );
      case "date-time-range-picker":
        return (
          <DateTimeRangePicker
            initialDateFrom={dateTimeRange.from}
            initialDateTo={dateTimeRange.to}
            onUpdate={({ range }: { range: DateTimeRange }) =>
              setDateTimeRange(range)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex justify-center w-full", className)}>
      {renderComponent()}
    </div>
  );
}
