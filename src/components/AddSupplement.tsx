
import React, { useRef, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowUp } from "lucide-react";

function extractFileName(file: File): string {
  // Use filename and remove extension (e.g., "Mega Multivitamin.jpg" => "Mega Multivitamin")
  const name = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
  return name;
}

type ImageField = "front" | "nutrition";

export default function AddSupplement() {
  const [open, setOpen] = useState(true);
  const [supplementName, setSupplementName] = useState("");
  const [imageFiles, setImageFiles] = useState<{ front?: File; nutrition?: File }>({});
  const [dragged, setDragged] = useState<{ [K in ImageField]?: boolean }>({});

  // Refs for file inputs
  const frontInputRef = useRef<HTMLInputElement>(null);
  const nutritionInputRef = useRef<HTMLInputElement>(null);

  // Handle file drop or selection
  const handleFile = (file: File, field: ImageField) => {
    setImageFiles((prev) => ({ ...prev, [field]: file }));

    // Only auto-populate name from front image, and only if input is empty
    if (field === "front" && !supplementName) {
      setSupplementName(extractFileName(file));
    }
  };

  // Drag events for styling
  const handleDrag = (field: ImageField, over: boolean) => {
    setDragged((prev) => ({ ...prev, [field]: over }));
  };

  // Generic image upload UI
  const renderImageUpload = (label: string, field: ImageField, ref: React.RefObject<HTMLInputElement>) => (
    <div
      className={`flex-1 border-2 border-dashed rounded-lg p-2 min-h-[78px] flex flex-col items-center justify-center transition-colors cursor-pointer bg-muted/60
        ${dragged[field] ? "border-primary bg-primary/10" : "hover:border-primary/60"}
      `}
      onClick={() => ref.current?.click()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file, field);
        handleDrag(field, false);
      }}
      onDragOver={e => {
        e.preventDefault();
        handleDrag(field, true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        handleDrag(field, false);
      }}
      tabIndex={0}
      role="button"
      aria-label={`Upload ${label}`}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file, field);
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
      <span className="flex flex-col items-center gap-1 pointer-events-none">
        <ArrowUp className="w-7 h-7 mb-0.5 opacity-70" />
        <span className="text-xs font-medium text-center">{label}</span>
        <span className="text-xs text-muted-foreground">{imageFiles[field]?.name ? (
          <span className="block font-semibold text-primary">{imageFiles[field]?.name}</span>
        ) : (
          <>or drag &amp; drop</>
        )}</span>
      </span>
    </div>
  );

  // Handle Add Supplement action (no backend for now)
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // Show a toast or alert for demo
    alert(`Supplement "${supplementName}" added!`);
    setSupplementName("");
    setImageFiles({});
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full space-y-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Add Supplement</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={open ? "Collapse" : "Expand"}>
            <ArrowUp className={`transition-transform ${open ? "rotate-0" : "rotate-180"}`} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent asChild>
        <form className="mt-1 flex flex-col gap-4 w-full" onSubmit={handleAdd} autoComplete="off">
          <div className="flex flex-row gap-2 mb-1">
            {renderImageUpload("Front of Container", "front", frontInputRef)}
            {renderImageUpload("Nutrition Label", "nutrition", nutritionInputRef)}
          </div>
          <div>
            <Label htmlFor="supplement-name">Supplement Name</Label>
            <Input
              id="supplement-name"
              placeholder="e.g., multivitamin"
              value={supplementName}
              autoComplete="off"
              onChange={e => setSupplementName(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={!supplementName} className="w-full">
            Add Supplement
          </Button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
