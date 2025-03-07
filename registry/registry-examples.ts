import type { Registry } from "./registry-types";

export const examples: Registry["items"] = [
  {
    name: "date-range-picker-basic",
    type: "registry:example",
    title: "Basic Date Range Picker",
    description: "A simple date range picker with default settings.",
    files: [
      {
        path: "components/registry/examples/date-range-picker-basic.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-range-picker-with-comparison",
    type: "registry:example",
    title: "Date Range Picker with Comparison",
    description: "A date range picker with comparison mode enabled.",
    files: [
      {
        path: "components/registry/examples/date-range-picker-with-comparison.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-time-range-picker-basic",
    type: "registry:example",
    title: "Basic Date Time Range Picker",
    description: "A date time range picker for selecting dates and times.",
    files: [
      {
        path: "components/registry/examples/date-time-range-picker-basic.tsx",
        type: "registry:example",
      },
    ],
  },
];
