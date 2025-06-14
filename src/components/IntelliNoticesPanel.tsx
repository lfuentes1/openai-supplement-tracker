
import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock notices for demonstration; in a real app, fetch from state or API
const NOTICES = [
  {
    date: "6/14/2025",
    message: "You made IntelliAdd default. When you add new supplements, IntelliAdd will add the supplement facts for you."
  },
  {
    date: "6/14/2025",
    message: "You turned on reminder texts daily at 5:00 p.m. when you haven't taken your daily supplements."
  },
  {
    date: "6/14/2025",
    message: (
      <>
        Based on your active supplements, <span className="font-semibold">X brand</span> was recalled by the FDA.{" "}
        <a href="#" className="underline text-blue-500 hover:text-blue-700">Read more here.</a>
      </>
    )
  },
  {
    date: "6/15/2025",
    message: "Reminder: You haven't taken your daily supplements."
  },
  {
    date: "6/16/2025",
    message: "Vitamin D is best absorbed when paired with Vitamin K."
  },
];

export default function IntelliNoticesPanel() {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 text-lg font-semibold group focus:outline-none px-2 py-1 mb-2 w-full border-b border-border transition-colors",
              open ? "text-primary" : "text-muted-foreground"
            )}
            aria-expanded={open}
            aria-controls="intellinotices-content"
          >
            <span className="flex items-center gap-1">
              IntelliNotices
              <Sparkles size={20} className="ml-1 text-purple-500" />
            </span>
            <span className="ml-auto transition-transform duration-200" style={{ transform: open ? "rotate(0)" : "rotate(-90deg)" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" className="inline"><path fill="currentColor" d="M7 10l5 5 5-5z" /></svg>
            </span>
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent id="intellinotices-content" className="pt-0 animate-fade-in">
        <div className="flex flex-col gap-3 px-2 py-2 max-h-56 overflow-auto">
          {NOTICES.map((n, i) => (
            <div key={i} className="text-sm border-b last:border-b-0 pb-2 last:pb-0">
              <div className="text-xs text-muted-foreground mb-1">{n.date}:</div>
              <div className="leading-snug">
                {n.message}
              </div>
            </div>
          ))}
          {NOTICES.length === 0 && (
            <div className="text-muted-foreground text-center py-4">No notices at this time.</div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
