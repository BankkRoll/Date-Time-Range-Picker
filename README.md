# Date Time Range Picker

![Screenshot 2025-03-06 210813](https://github.com/user-attachments/assets/e71b8ef9-f8a2-43f5-b980-ef7338382f42)

## Installation

1. Make sure you have the following shadcn/ui components installed:

- Calendar
- Input
- Button
- Label

If you haven't installed these components, you can do so using the shadcn/ui CLI:

```bash
npx shadcn@latest add calendar input button label
```

2. Double check / install the correct versions of dependencies:

```bash
npm install date-fns@3.6.0 react-day-picker@9.4.3
```

## Usage

To use the Date Time Range Picker components in your project, copy the following files into your components directory:

1. `time-input.tsx`
2. `date-input.tsx`
3. `date-time-input.tsx`
4. `date-range-picker.tsx`
5. `date-time-range-picker.tsx`

Make sure to adjust the import paths in these files to match your project structure.

## Components

### DateTimeRangePicker

The main component for selecting a date and time range.

```jsx
import { DateTimeRangePicker } from "@/components/date-time-range-picker";

function MyComponent() {
  return (
    <DateTimeRangePicker
      onUpdate={(values) => console.log(values)}
      initialDateFrom={new Date()}
      initialDateTo={new Date(new Date().setDate(new Date().getDate() + 7))}
    />
  );
}
```

### DateRangePicker

A component for selecting a date range.

```jsx
import { DateRangePicker } from "@/components/date-range-picker";

function MyComponent() {
  return (
    <DateRangePicker
      onUpdate={(values) => console.log(values)}
      initialDateFrom={new Date()}
      initialDateTo={new Date(new Date().setDate(new Date().getDate() + 7))}
    />
  );
}
```

### DateTimeInput

A component for inputting both date and time.

```jsx
import { DateTimeInput } from "@/components/date-time-input";

function MyComponent() {
  return (
    <DateTimeInput value={new Date()} onChange={(date) => console.log(date)} />
  );
}
```

### DateInput

A component for inputting dates.

```jsx
import { DateInput } from "@/components/date-input";

function MyComponent() {
  return (
    <DateInput value={new Date()} onChange={(date) => console.log(date)} />
  );
}
```

### TimeInput

A component for inputting times.

```jsx
import { TimeInput } from "@/components/time-input";

function MyComponent() {
  return (
    <TimeInput value={new Date()} onChange={(date) => console.log(date)} />
  );
}
```

## Customization

These components are built using shadcn/ui, which means they inherit your project's theme and can be easily customized. Refer to the shadcn/ui documentation for more information on customization.

## Notes

- The specific versions of `date-fns` (3.6.0) and `react-day-picker` (9.4.3) are required to ensure UI compatibility.
- A registry for direct installation with shadcn/ui is coming soon, which will simplify the installation process.

## License

This project is open-source and available under the [MIT License](./license).
