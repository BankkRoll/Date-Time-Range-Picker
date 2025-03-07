import type { Registry } from "./registry-types";

export const ui: Registry["items"] = [
  {
    name: "calendar",
    type: "registry:component",
    title: "Calendar",
    description: "A calendar component for selecting dates.",
    files: [
      {
        path: "components/date-time-range-picker/calendar.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "date-input",
    type: "registry:component",
    title: "Date Input",
    description: "A component for inputting dates with separate fields.",
    files: [
      {
        path: "components/date-time-range-picker/date-input.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "time-input",
    type: "registry:component",
    title: "Time Input",
    description:
      "A component for inputting time with hours, minutes, and AM/PM.",
    files: [
      {
        path: "components/date-time-range-picker/time-input.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "date-time-input",
    type: "registry:component",
    title: "Date Time Input",
    description: "A component that combines date and time input.",
    files: [
      {
        path: "components/date-time-range-picker/date-time-input.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "date-range-picker",
    type: "registry:component",
    title: "Date Range Picker",
    description: "A component for selecting a range of dates with presets.",
    files: [
      {
        path: "components/date-time-range-picker/date-range-picker.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "date-time-range-picker",
    type: "registry:component",
    title: "Date Time Range Picker",
    description: "A component for selecting a range of dates and times.",
    files: [
      {
        path: "components/date-time-range-picker/date-time-range-picker.tsx",
        type: "registry:component",
      },
    ],
  },
];
