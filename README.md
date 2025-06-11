# Date Time Range Picker

A suite of beautiful, accessible, and fully customizable date and time picker components for modern React apps. Built with [shadcn/ui](https://ui.shadcn.com/).

![image](https://github.com/user-attachments/assets/722586f4-1b1c-4e45-b9fd-e20d9ee6a85d)

---

## 🚀 Installation

**Quick Install (Recommended):**

```bash
npx shadcn add https://date-time-range-picker.vercel.app/r/date-time-range-picker.json
```

> Instantly adds all components and dependencies. No manual copying required.

---

## 📦 Components

- `DateTimeRangePicker` – Select a range of dates and times.
- `DateRangePicker` – Select a range of dates.
- `DateTimeInput` – Input both date and time.
- `DateInput` – Input dates.
- `TimeInput` – Input times.

---

## 🛠️ Usage

```tsx
import { DateTimeRangePicker } from "@/components/date-time-range-picker";

export default function Example() {
  return (
    <DateTimeRangePicker
      onUpdate={(values) => console.log(values)}
      initialDateFrom={new Date()}
      initialDateTo={new Date(new Date().setDate(new Date().getDate() + 7))}
    />
  );
}
```

> See the `/components/date-time-range-picker/` directory for all available pickers and their props.

---

## 🎨 Customization

- Built with [shadcn/ui](https://ui.shadcn.com/) — inherits your project's theme.
- Fully composable and accessible.
- Easily style with Tailwind or your own CSS.

---

## 📚 Documentation

- [Live Demo & Docs](https://date-time-range-picker.vercel.app)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)

---

## 📝 License

[MIT](./LICENSE)
