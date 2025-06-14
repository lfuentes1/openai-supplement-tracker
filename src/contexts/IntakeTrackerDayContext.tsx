
import React, { createContext, useContext, useState, ReactNode } from "react";
import { startOfDay } from "date-fns";

type IntakeTrackerDayContextType = {
  date: Date;
  setDate: (date: Date) => void;
  isTracking: boolean;
  setIsTracking: (b: boolean) => void;
};

const IntakeTrackerDayContext = createContext<IntakeTrackerDayContextType | undefined>(undefined);

export function IntakeTrackerDayProvider({ children }: { children: ReactNode }) {
  const today = startOfDay(new Date());
  const [date, setDate] = useState<Date>(today);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  return (
    <IntakeTrackerDayContext.Provider value={{ date, setDate, isTracking, setIsTracking }}>
      {children}
    </IntakeTrackerDayContext.Provider>
  );
}

export function useIntakeTrackerDay() {
  const ctx = useContext(IntakeTrackerDayContext);
  if (!ctx) throw new Error("useIntakeTrackerDay must be used within IntakeTrackerDayProvider");
  return ctx;
}
