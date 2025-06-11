/* eslint-disable max-lines */
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { DateInput } from "./date-input";

export interface DateRange {
  from: Date;
  to: Date | undefined;
}

interface Preset {
  name: string;
  label: string;
}

const PRESETS: Preset[] = [
  { name: "today", label: "Today" },
  { name: "yesterday", label: "Yesterday" },
  { name: "last7", label: "Last 7 days" },
  { name: "last14", label: "Last 14 days" },
  { name: "last30", label: "Last 30 days" },
  { name: "thisWeek", label: "This Week" },
  { name: "lastWeek", label: "Last Week" },
  { name: "thisMonth", label: "This Month" },
  { name: "lastMonth", label: "Last Month" },
];

export interface DateRangePickerProps {
  onUpdate?: (values: { range: DateRange }) => void;
  initialDateFrom?: Date | string;
  initialDateTo?: Date | string;
  align?: "start" | "center" | "end";
  locale?: string;
  className?: string;
}

const formatDate = (date: Date, locale = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
  if (typeof dateInput === "string") {
    const parts = dateInput.split("-").map((part) => Number.parseInt(part, 10));
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return dateInput;
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  onUpdate,
  align = "center",
  locale = "en-US",
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange>({
    from: getDateAdjustedForTimezone(initialDateFrom),
    to: initialDateTo
      ? getDateAdjustedForTimezone(initialDateTo)
      : getDateAdjustedForTimezone(initialDateFrom),
  });

  const openedRangeRef = React.useRef<DateRange>(range);
  const [selectedPreset, setSelectedPreset] = React.useState<
    string | undefined
  >(undefined);
  const [calendarMonths, setCalendarMonths] = React.useState<[Date, Date]>([
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 1)),
  ]);

  const getPresetRange = React.useCallback((presetName: string): DateRange => {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const endToday = new Date(now.setHours(23, 59, 59, 999));

    switch (presetName) {
      case "today":
        return { from: today, to: endToday };
      case "yesterday": {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return {
          from: yesterday,
          to: new Date(yesterday.setHours(23, 59, 59, 999)),
        };
      }
      case "last7":
        return {
          from: new Date(today.setDate(today.getDate() - 6)),
          to: endToday,
        };
      case "last14":
        return {
          from: new Date(today.setDate(today.getDate() - 13)),
          to: endToday,
        };
      case "last30":
        return {
          from: new Date(today.setDate(today.getDate() - 29)),
          to: endToday,
        };
      case "thisWeek": {
        const first = today.getDate() - today.getDay();
        return { from: new Date(today.setDate(first)), to: endToday };
      }
      case "lastWeek": {
        const first = today.getDate() - today.getDay() - 7;
        const last = first + 6;
        return {
          from: new Date(today.setDate(first)),
          to: new Date(today.setDate(last)),
        };
      }
      case "thisMonth": {
        return {
          from: new Date(today.setDate(1)),
          to: endToday,
        };
      }
      case "lastMonth": {
        const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
        return {
          from: new Date(lastMonth.setDate(1)),
          to: new Date(lastMonth.setDate(0)),
        };
      }
      default:
        throw new Error(`Unknown date range preset: ${presetName}`);
    }
  }, []);

  const setPreset = (preset: string): void => {
    const newRange = getPresetRange(preset);
    setRange(newRange);
    setSelectedPreset(preset);
    if (newRange.from) {
      setCalendarMonths([
        newRange.from,
        new Date(newRange.from.setMonth(newRange.from.getMonth() + 1)),
      ]);
    }
  };

  const checkPreset = React.useCallback(() => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name);
      if (
        presetRange.from.getTime() === range.from.getTime() &&
        presetRange.to?.getTime() === range.to?.getTime()
      ) {
        setSelectedPreset(preset.name);
        return;
      }
    }
    setSelectedPreset(undefined);
  }, [range, getPresetRange]);

  const resetValues = (): void => {
    setRange({
      from: getDateAdjustedForTimezone(initialDateFrom),
      to: initialDateTo
        ? getDateAdjustedForTimezone(initialDateTo)
        : getDateAdjustedForTimezone(initialDateFrom),
    });
    setSelectedPreset(undefined);
    setCalendarMonths([
      new Date(),
      new Date(new Date().setMonth(new Date().getMonth() + 1)),
    ]);
  };

  React.useEffect(() => {
    checkPreset();
  }, [checkPreset]);

  const PresetButton = ({
    preset,
    label,
    isSelected,
  }: {
    preset: string;
    label: string;
    isSelected: boolean;
  }) => (
    <Button
      className={cn("justify-start", isSelected && "bg-muted")}
      variant="ghost"
      onClick={() => setPreset(preset)}
    >
      <CheckIcon
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {label}
    </Button>
  );

  const areRangesEqual = (a?: DateRange, b?: DateRange): boolean => {
    if (!a || !b) return a === b;
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to || a.to.getTime() === b.to.getTime())
    );
  };

  React.useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
    }
  }, [isOpen, range]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:w-[300px] justify-start text-left text-[11px] font-normal text-wrap",
            className,
          )}
        >
          {formatDate(range.from, locale)}
          {range.to && (
            <>
              <ChevronDownIcon className="mx-2 h-4 w-4" />
              {formatDate(range.to, locale)}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align} sideOffset={4}>
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* Calendar Section */}
          <div className="space-y-4">
            <div className="hidden lg:flex space-x-4">
              {/* Two calendars side by side for desktop */}
              <Calendar
                mode="range"
                selected={range}
                onSelect={(newRange) =>
                  newRange && setRange(newRange as DateRange)
                }
                month={calendarMonths[0]}
                onMonthChange={(month) =>
                  setCalendarMonths([
                    month,
                    new Date(month.setMonth(month.getMonth() + 1)),
                  ])
                }
                className="border rounded-md"
              />
              <Calendar
                mode="range"
                selected={range}
                onSelect={(newRange) =>
                  newRange && setRange(newRange as DateRange)
                }
                month={calendarMonths[1]}
                onMonthChange={(month) =>
                  setCalendarMonths([
                    new Date(month.setMonth(month.getMonth() - 1)),
                    month,
                  ])
                }
                className="border rounded-md"
              />
            </div>

            {/* Single calendar for mobile */}
            <div className="lg:hidden">
              <Calendar
                mode="range"
                selected={range}
                onSelect={(newRange) =>
                  newRange && setRange(newRange as DateRange)
                }
                className="border rounded-md"
              />
            </div>

            <div className="flex justify-between items-center">
              <DateInput
                value={range.from}
                onChange={(date) => {
                  const toDate =
                    range.to == null || date > range.to ? date : range.to;
                  setRange((prevRange) => ({
                    ...prevRange,
                    from: date,
                    to: toDate,
                  }));
                }}
              />
              <ChevronDownIcon className="mx-2 h-4 w-4" />
              <DateInput
                value={range.to}
                onChange={(date) => {
                  const fromDate = date < range.from ? date : range.from;
                  setRange((prevRange) => ({
                    ...prevRange,
                    from: fromDate,
                    to: date,
                  }));
                }}
              />
            </div>
          </div>

          {/* Presets Section */}
          <div className="lg:border-l lg:pl-4 space-y-2">
            <h3 className="font-medium text-sm">Presets</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
              {PRESETS.map((preset) => (
                <PresetButton
                  key={preset.name}
                  preset={preset.name}
                  label={preset.label}
                  isSelected={selectedPreset === preset.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 p-4 border-t">
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              resetValues();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              if (!areRangesEqual(range, openedRangeRef.current)) {
                onUpdate?.({ range });
              }
            }}
          >
            Update
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

DateRangePicker.displayName = "DateRangePicker";
