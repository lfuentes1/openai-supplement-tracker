
import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EXAMPLE_BUTTONS = [
  {
    label: "Recalls for My Supplements?",
    fill: "Are there any recalls for the supplements that I am taking?",
  },
  {
    label: "Give me absorption tips.",
    fill: "Anytime my supplement intake changes, provide me with absorption tips.",
  },
  {
    label: "Recommend Brands, please.",
    fill: "Can you recommend supplements that have been evaluated by independent 3rd party companies?",
  },
  {
    label: "Always use IntelliAdd.",
    fill: "Always use IntelliAdd when I add a new supplement.",
  },
];

export default function IntelliPromptsPanel() {
  const [open, setOpen] = useState(true);
  const [prompt, setPrompt] = useState("");

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
            aria-controls="intelliprompts-content"
          >
            <span className="flex items-center gap-1">
              IntelliPrompts
              <Sparkles size={20} className="ml-1 text-purple-500" />
            </span>
            <span className="ml-auto transition-transform duration-200" style={{ transform: open ? "rotate(0)" : "rotate(-90deg)" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" className="inline"><path fill="currentColor" d="M7 10l5 5 5-5z" /></svg>
            </span>
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent id="intelliprompts-content" className="pt-0 animate-fade-in">
        <div className="flex flex-col gap-3 py-2">
          <Textarea
            className="bg-muted rounded-md placeholder:text-muted-foreground h-24 resize-none focus-visible:ring-ring"
            placeholder="Questions or Commands"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3 mb-1">
            {EXAMPLE_BUTTONS.map(({ label, fill }) => (
              <Button
                key={label}
                type="button"
                variant="outline"
                className="text-xs font-medium rounded whitespace-normal h-auto py-2"
                onClick={() => setPrompt(fill)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
