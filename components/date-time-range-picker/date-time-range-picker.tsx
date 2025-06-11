"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  addMonths,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isValid,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";
import { enUS, type Locale } from "date-fns/locale";
import { CalendarIcon, CheckIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { DateTimeInput } from "./date-time-input";

export interface DateTimeRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface Preset {
  name: string;
  label: string;
}

const PRESETS: Preset[] = [
  { name: "last7", label: "Last 7 days" },
  { name: "last14", label: "Last 14 days" },
  { name: "last30", label: "Last 30 days" },
  { name: "thisWeek", label: "This Week" },
  { name: "lastWeek", label: "Last Week" },
  { name: "thisMonth", label: "This Month" },
  { name: "lastMonth", label: "Last Month" },
];

export interface DateTimeRangePickerProps {
  onUpdate?: (values: { range: DateTimeRange }) => void;
  initialDateFrom?: Date | string;
  initialDateTo?: Date | string;
  align?: "start" | "center" | "end";
  locale?: Locale;
  className?: string;
}

const formatDateTime = (
  date: Date | undefined,
  locale: Locale = enUS,
): string => {
  if (!date || !isValid(date)) return "Select date";
  return format(date, "PPP p", { locale });
};

const getDateAdjustedForTimezone = (
  dateInput: Date | string | undefined,
): Date | undefined => {
  if (!dateInput) return undefined;
  if (typeof dateInput === "string") {
    const parts = dateInput.split("-").map((part) => Number.parseInt(part, 10));
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return new Date(dateInput);
};

export const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = ({
  initialDateFrom,
  initialDateTo,
  onUpdate,
  align = "center",
  locale = enUS,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateTimeRange>({
    from: getDateAdjustedForTimezone(initialDateFrom),
    to: getDateAdjustedForTimezone(initialDateTo),
  });

  const openedRangeRef = React.useRef<DateTimeRange>(range);
  const [selectedPreset, setSelectedPreset] = React.useState<
    string | undefined
  >(undefined);
  const [calendarMonths, setCalendarMonths] = React.useState<[Date, Date]>([
    new Date(),
    addMonths(new Date(), 1),
  ]);

  const getPresetRange = React.useCallback(
    (presetName: string): DateTimeRange => {
      const now = new Date();
      const today = startOfDay(now);
      const endToday = endOfDay(now);

      switch (presetName) {
        case "today":
          return { from: today, to: endToday };
        case "yesterday": {
          const yesterday = subDays(today, 1);
          return { from: yesterday, to: endOfDay(yesterday) };
        }
        case "last7":
          return { from: subDays(today, 6), to: endToday };
        case "last14":
          return { from: subDays(today, 13), to: endToday };
        case "last30":
          return { from: subDays(today, 29), to: endToday };
        case "thisWeek":
          return {
            from: startOfWeek(today, { weekStartsOn: 0 }),
            to: endToday,
          };
        case "lastWeek": {
          const lastWeekStart = startOfWeek(subDays(today, 7), {
            weekStartsOn: 0,
          });
          const lastWeekEnd = endOfWeek(lastWeekStart, { weekStartsOn: 0 });
          return {
            from: lastWeekStart,
            to: lastWeekEnd,
          };
        }
        case "thisMonth":
          return {
            from: startOfMonth(today),
            to: endToday,
          };
        case "lastMonth": {
          const lastMonth = subMonths(today, 1);
          return {
            from: startOfMonth(lastMonth),
            to: endOfMonth(lastMonth),
          };
        }
        default:
          throw new Error(`Unknown date range preset: ${presetName}`);
      }
    },
    [],
  );

  const setPreset = (preset: string): void => {
    const newRange = getPresetRange(preset);
    setRange(newRange);
    setSelectedPreset(preset);
    if (newRange.from) {
      setCalendarMonths([newRange.from, addMonths(newRange.from, 1)]);
    }
  };

  const checkPreset = React.useCallback(() => {
    if (!range.from || !range.to) return;

    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name);
      if (
        isEqual(startOfDay(range.from), startOfDay(presetRange.from!)) &&
        isEqual(endOfDay(range.to), endOfDay(presetRange.to!))
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
      to: getDateAdjustedForTimezone(initialDateTo),
    });
    setSelectedPreset(undefined);
    setCalendarMonths([new Date(), addMonths(new Date(), 1)]);
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

  const areRangesEqual = (a?: DateTimeRange, b?: DateTimeRange): boolean => {
    if (!a || !b) return a === b;
    return (
      isEqual(a.from || new Date(), b.from || new Date()) &&
      isEqual(a.to || new Date(), b.to || new Date())
    );
  };

  React.useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
    }
  }, [isOpen, range]);

  const handleFromDateTimeChange = (date: Date) => {
    setRange((prev) => ({ ...prev, from: date }));
  };

  const handleToDateTimeChange = (date: Date) => {
    setRange((prev) => ({ ...prev, to: date }));
  };

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
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateTime(range.from, locale)}
          {range.to && (
            <>
              <ChevronRightIcon className="mx-2 h-4 w-4" />
              {formatDateTime(range.to, locale)}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align} sideOffset={4}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Calendar Section */}
          <div className="space-y-4 p-4">
            <div className="hidden lg:flex space-x-4">
              {/* Two calendars side by side for desktop */}
              <Calendar
                mode="range"
                selected={range}
                onSelect={(newRange) =>
                  newRange && setRange(newRange as DateTimeRange)
                }
                month={calendarMonths[0]}
                onMonthChange={(month) =>
                  setCalendarMonths([month, addMonths(month, 1)])
                }
                className="border rounded-md"
              />
              <Calendar
                mode="range"
                selected={range}
                onSelect={(newRange) =>
                  newRange && setRange(newRange as DateTimeRange)
                }
                month={calendarMonths[1]}
                onMonthChange={(month) =>
                  setCalendarMonths([subMonths(month, 1), month])
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
                  newRange && setRange(newRange as DateTimeRange)
                }
                className="border rounded-md"
              />
            </div>

            <div className="flex justify-between items-center">
              <DateTimeInput
                value={range.from}
                onChange={handleFromDateTimeChange}
                label="Start"
              />
              <ChevronRightIcon className="mx-2 h-4 w-4" />
              <DateTimeInput
                value={range.to}
                onChange={handleToDateTimeChange}
                label="End"
              />
            </div>
          </div>

          {/* Presets Section */}
          <div className="lg:border-l lg:pl-4 space-y-2 p-4">
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

DateTimeRangePicker.displayName = "DateTimeRangePicker";
