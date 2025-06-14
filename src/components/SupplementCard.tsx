import React, { useState } from "react";
import { NutritionFact, Supplement, useSupplements } from "@/contexts/SupplementsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Sparkles, X, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PLACEHOLDER_FACTS: NutritionFact[] = [
  { id: "nf1", name: "Vitamin C", value: "90", unit: "mg" },
  { id: "nf2", name: "Vitamin D3", value: "50", unit: "mcg" },
  { id: "nf3", name: "Vitamin B12", value: "2.4", unit: "mcg" },
  { id: "nf4", name: "Iron", value: "18", unit: "mg" },
  { id: "nf5", name: "Calcium", value: "1000", unit: "mg" },
];

export default function SupplementCard({ supplement }: { supplement: Supplement }) {
  const { updateSupplement, removeSupplement, activeSuppIds, toggleActiveSupplement } = useSupplements();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Local editable state for fields (uncommitted changes)
  const [servingSize, setServingSize] = useState(supplement.servingSize || "");
  const [servingUnit, setServingUnit] = useState(supplement.servingUnit || "");
  const [facts, setFacts] = useState<NutritionFact[]>(supplement.nutritionFacts || []);

  // Editable Nutrition Fact fields
  function handleFactChange(idx: number, key: keyof NutritionFact, value: string) {
    setFacts(facts => facts.map((f, i) => (i === idx ? { ...f, [key]: value } : f)));
  }
  function handleAddFact() {
    setFacts(facts => [
      ...facts,
      { id: Math.random().toString(36).slice(2, 8), name: "", value: "", unit: "" },
    ]);
  }
  function handleRemoveFact(idx: number) {
    setFacts(facts => facts.filter((_, i) => i !== idx));
  }
  function handleSave() {
    updateSupplement({
      ...supplement,
      servingSize,
      servingUnit,
      nutritionFacts: facts,
    });
    toast({ title: "Supplement updated", description: supplement.name + " details saved." });
  }
  function handleIntelliAdd() {
    setFacts(() => PLACEHOLDER_FACTS.map(f => ({ ...f, id: Math.random().toString(36).slice(2, 8) })));
    setServingSize("2");
    setServingUnit("tablets");
    toast({ title: "Fields auto-populated by IntelliAdd (editable)" });
  }

  const isActive = activeSuppIds.includes(supplement.id);

  return (
    <TooltipProvider>
      <Card className="mb-4 shadow-sm border bg-muted/40 animate-fade-in">
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Checkbox
                    checked={isActive}
                    onCheckedChange={() => toggleActiveSupplement(supplement.id)}
                    id={`active-supp-checkbox-${supplement.id}`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <span>
                    Include in Intake Tracker.<br />
                    Checked: vitamins & minerals count toward your daily intake.
                  </span>
                </TooltipContent>
              </Tooltip>
              <label
                htmlFor={`active-supp-checkbox-${supplement.id}`}
                className="text-lg font-bold truncate max-w-[60%] cursor-pointer"
              >
                {supplement.name}
              </label>
            </div>
            <div className="flex gap-1 items-center">
              <Button size="icon" variant="ghost" aria-label="IntelliAdd" onClick={handleIntelliAdd}>
                <Sparkles className="text-purple-500" />
              </Button>
              <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost" aria-label="Delete Supplement">
                    <X className="text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete "{supplement.name}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove the supplement and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => {
                        removeSupplement(supplement.id);
                        setDialogOpen(false);
                        toast({ title: "Supplement deleted", description: supplement.name + " was removed." });
                      }}
                    >Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <CollapsibleTrigger asChild>
                <Button size="icon" variant="outline" aria-label={open ? "Collapse" : "Expand"}>
                  <span className={`transition-transform text-muted-foreground text-xl font-bold ${open ? "rotate-0" : "rotate-180"}`}>˄</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <CollapsibleContent asChild>
            <form
              className="flex flex-col gap-2 px-1 pb-2"
              onSubmit={e => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Serving size:</label>
                <Input
                  value={servingSize}
                  onChange={e => setServingSize(e.target.value)}
                  placeholder="e.g. 2"
                  className="w-16"
                  type="text"
                />
                <Input
                  value={servingUnit}
                  onChange={e => setServingUnit(e.target.value)}
                  placeholder="tablet"
                  className="w-20"
                  type="text"
                />
              </div>
              <div className="mt-2">
                <label className="text-xs text-muted-foreground">Nutrition Facts:</label>
                <div className="space-y-2 mt-1">
                  {facts.map((fact, idx) => (
                    <div className="flex items-center gap-2" key={fact.id}>
                      <Input
                        className="w-32"
                        placeholder="Fact name"
                        value={fact.name}
                        onChange={e => handleFactChange(idx, "name", e.target.value)}
                      />
                      <Input
                        className="w-16"
                        placeholder="Value"
                        value={fact.value}
                        onChange={e => handleFactChange(idx, "value", e.target.value)}
                      />
                      <Input
                        className="w-16"
                        placeholder="Unit"
                        value={fact.unit}
                        onChange={e => handleFactChange(idx, "unit", e.target.value)}
                      />
                      <Button size="icon" variant="ghost" aria-label="Remove fact" type="button" onClick={() => handleRemoveFact(idx)}>
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    type="button"
                    size="sm"
                    className="gap-2 mt-1"
                    onClick={handleAddFact}
                  >
                    <Plus className="w-4 h-4" /> Add Fact
                  </Button>
                </div>
              </div>
              <Button type="submit" className="self-end min-w-[80px] mt-2">Save</Button>
            </form>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </TooltipProvider>
  );
}

// Card is imported lazily here to prevent circular import (it only needs styling)
// If you want to refactor, move Card/Panel component to a new file!
function Card(props: React.ComponentProps<"div">) {
  return <div {...props} />;
}
