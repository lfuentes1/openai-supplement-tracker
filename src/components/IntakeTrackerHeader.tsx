
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useIntakeTrackerDay } from "@/contexts/IntakeTrackerDayContext";

export default function IntakeTrackerHeader() {
  const { date, setDate, isTracking, setIsTracking } = useIntakeTrackerDay();
  const isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
  // Only allow editing today; other days are "history view"
  return (
    <div className="w-full flex flex-col gap-3 mb-5">
      <div className="flex items-center gap-3">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[190px] justify-start pl-3 font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d > new Date()}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {/* On/Off Toggle */}
        <div className="flex items-center gap-2 ml-3">
          <Switch
            checked={isTracking}
            onCheckedChange={setIsTracking}
            disabled={!isToday}
            id="intake-tracker-day-toggle"
          />
          <label htmlFor="intake-tracker-day-toggle" className="text-sm text-muted-foreground">
            Tracking {isTracking ? "On" : "Off"}
          </label>
        </div>
      </div>
      {!isToday && (
        <div className="text-xs text-muted-foreground ml-[38px]">
          Past dates are view only. Only today's intake can be edited.
        </div>
      )}
    </div>
  );
}
