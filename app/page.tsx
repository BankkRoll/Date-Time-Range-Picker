import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegistryExample } from "@/components/registry/registry-example";
import {
  ClientCalendar,
  ClientDateInput,
  ClientTimeInput,
  ClientDateTimeInput,
  ClientDateRangePicker,
  ClientDateTimeRangePicker,
  ClientBasicDateRangePickerExample,
  ClientDateRangePickerWithComparisonExample,
  ClientBasicDateTimeRangePickerExample,
} from "@/components/client-components";
import { InstallationCard } from "@/components/installation-card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-10">
        <section className="mx-auto max-w-5xl space-y-8 pb-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Date Time Range Picker
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of date and time picker components for selecting
              dates, times, and ranges.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <InstallationCard />

            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>
                  Key features of the date time range picker components.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Light and dark mode support</li>
                  <li>Keyboard navigation</li>
                  <li>Date range selection</li>
                  <li>Time selection</li>
                  <li>Preset date ranges</li>
                  <li>Comparison mode</li>
                  <li>Fully customizable</li>
                  <li>Accessible</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RegistryExample
              title="Calendar"
              description="A calendar component for selecting dates."
              componentName="calendar"
              exampleName="calendar-basic"
            >
              <ClientCalendar />
            </RegistryExample>

            <RegistryExample
              title="DateInput"
              description="A component for inputting dates with separate fields."
              componentName="date-input"
              exampleName="date-input-basic"
            >
              <ClientDateInput />
            </RegistryExample>

            <RegistryExample
              title="TimeInput"
              description="A component for inputting time with hours, minutes, and AM/PM."
              componentName="time-input"
              exampleName="time-input-basic"
            >
              <ClientTimeInput />
            </RegistryExample>

            <RegistryExample
              title="DateTimeInput"
              description="A component that combines date and time input."
              componentName="date-time-input"
              exampleName="date-time-input-basic"
            >
              <ClientDateTimeInput />
            </RegistryExample>

            <RegistryExample
              title="DateRangePicker"
              description="A component for selecting a range of dates with presets."
              componentName="date-range-picker"
              exampleName="date-range-picker-basic"
            >
              <ClientDateRangePicker />
            </RegistryExample>

            <RegistryExample
              title="DateTimeRangePicker"
              description="A component for selecting a range of dates and times."
              componentName="date-time-range-picker"
              exampleName="date-time-range-picker-basic"
            >
              <ClientDateTimeRangePicker />
            </RegistryExample>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RegistryExample
              title="Basic Date Range Picker"
              description="A simple date range picker with default settings."
              componentName="date-range-picker-basic"
              exampleName="date-range-picker-basic"
            >
              <ClientBasicDateRangePickerExample />
            </RegistryExample>

            <RegistryExample
              title="Date Range Picker with Comparison"
              description="A date range picker with comparison mode enabled."
              componentName="date-range-picker-with-comparison"
              exampleName="date-range-picker-with-comparison"
            >
              <ClientDateRangePickerWithComparisonExample />
            </RegistryExample>

            <RegistryExample
              title="Basic Date Time Range Picker"
              description="A date time range picker for selecting dates and times."
              componentName="date-time-range-picker-basic"
              exampleName="date-time-range-picker-basic"
              className="md:col-span-2"
            >
              <ClientBasicDateTimeRangePickerExample />
            </RegistryExample>
          </div>
        </section>
      </main>
    </div>
  );
}
