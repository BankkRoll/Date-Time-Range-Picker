"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { DateInput } from "./date-input";
import { TimeInput } from "./time-input";

interface DateTimeInputProps {
  value?: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  label,
}) => {
  const [date, setDate] = React.useState<Date>(value || new Date());

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);

  const handleDateChange = (newDate: Date) => {
    if (disabled) return;

    const updatedDate = new Date(newDate);
    if (date) {
      updatedDate.setHours(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      );
    }

    setDate(updatedDate);
    onChange(updatedDate);
  };

  const handleTimeChange = (newTime: Date) => {
    if (disabled) return;

    const updatedDate = new Date(date);
    updatedDate.setHours(
      newTime.getHours(),
      newTime.getMinutes(),
      newTime.getSeconds(),
      newTime.getMilliseconds(),
    );

    setDate(updatedDate);
    onChange(updatedDate);
  };

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <div className="flex flex-col sm:flex-row gap-2">
        <DateInput
          value={date}
          onChange={handleDateChange}
          disabled={disabled}
        />
        <TimeInput
          value={date}
          onChange={handleTimeChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

DateTimeInput.displayName = "DateTimeInput";
