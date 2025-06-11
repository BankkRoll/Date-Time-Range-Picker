import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range-picker";
import { InstallationCard } from "@/components/installation-card";
import { RegistryExample } from "@/components/registry/registry-example";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClockIcon, CalendarIcon, ClockIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1 text-xs font-semibold text-muted-foreground border border-muted-foreground/10 mb-2">
            <CalendarClockIcon className="h-4 w-4" />
            <span>Date Time Range Picker</span>
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
            Date Time Range Picker
          </h1>
          <p className="max-w-xl mt-4 text-lg text-muted-foreground font-medium">
            Beautiful, accessible, and fully customizable date and time pickers
            for modern React apps. Built with shadcn/ui, designed for luxury
            projects.
          </p>
        </div>
        <div className="flex justify-center items-center w-full py-8">
          <Card className="mx-auto shadow-xl bg-background/80 backdrop-blur-lg rounded-2xl p-8">
            <CardContent className="flex flex-col items-center justify-center">
              <DateTimeRangePicker
                initialDateFrom={new Date()}
                initialDateTo={
                  new Date(new Date().setDate(new Date().getDate() + 7))
                }
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Install Card */}
      <section className="flex justify-center">
        <InstallationCard />
      </section>

      {/* Features Card */}
      <section className="flex justify-center">
        <Card className="w-full max-w-3xl rounded-2xl shadow-sm bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <li className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-primary" /> Date range
                selection
              </li>
              <li className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-primary" /> Time selection
              </li>
              <li className="flex items-center gap-3">
                <CalendarClockIcon className="h-5 w-5 text-primary" /> Date &
                time range
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="block w-2 h-2 bg-primary rounded-full" />
                </span>{" "}
                Light & dark mode
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="block w-2 h-2 bg-primary rounded-full" />
                </span>{" "}
                Keyboard navigation
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="block w-2 h-2 bg-primary rounded-full" />
                </span>{" "}
                Fully accessible
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="block w-2 h-2 bg-primary rounded-full" />
                </span>{" "}
                Preset ranges
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="block w-2 h-2 bg-primary rounded-full" />
                </span>{" "}
                Customizable & composable
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Component Gallery */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Component Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RegistryExample
            title="Date Input"
            description="Input dates with separate fields."
            componentName="date-input"
          />
          <RegistryExample
            title="Time Input"
            description="Input time with hours, minutes, and AM/PM."
            componentName="time-input"
          />
          <RegistryExample
            title="Date Time Input"
            description="Combine date and time input."
            componentName="date-time-input"
          />
          <RegistryExample
            title="Date Range Picker"
            description="Select a range of dates with presets."
            componentName="date-range-picker"
          />
          <RegistryExample
            title="Date Time Range Picker"
            description="Select a range of dates and times."
            componentName="date-time-range-picker"
            className="md:col-span-2"
          />
        </div>
      </section>
    </div>
  );
}
