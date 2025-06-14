
import React from "react";
import { useSupplements } from "@/contexts/SupplementsContext";
import { FDA_NUTRIENTS, FDANutrient } from "@/data/FDA_DV";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

function aggregateIntakePerNutrient(supplements, nutrients: FDANutrient[]) {
  // Returns {[nutrientName]: intakeNumber}
  const intakeMap: Record<string, number> = {};
  for (const nutrient of nutrients) {
    intakeMap[nutrient.name] = 0;
  }
  for (const supp of supplements) {
    for (const fact of supp.nutritionFacts) {
      // Try match by FDA_DV key or fallback to name
      const nMatch = nutrients.find(n => fact.name.toLowerCase() === n.key.toLowerCase() || fact.name.toLowerCase() === n.name.toLowerCase());
      if (nMatch) {
        let value = parseFloat(fact.value);
        if (Number.isNaN(value)) continue;
        // handle unit conversion (e.g. mg vs mcg) in future; for now, require user to use matching units
        intakeMap[nMatch.name] += value;
      }
    }
  }
  return intakeMap;
}

function NutrientTable({ items, intakeMap }: { items: FDANutrient[], intakeMap: Record<string, number> }) {
  return (
    <table className="w-full text-sm border-collapse rounded overflow-hidden mb-4">
      <thead>
        <tr className="font-semibold border-b">
          <th className="py-1 px-2 text-left">Name</th>
          <th className="py-1 px-2 text-left flex items-center gap-1">
            Daily Value (DV)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <span>
                    The recommended daily value per FDA for adults.<br />
                    Learn more: <a href="https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels" target="_blank" className="underline">FDA.gov</a>
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </th>
          <th className="py-1 px-2 text-left">Your Intake</th>
        </tr>
      </thead>
      <tbody>
        {items.map(nutrient => {
          const intake = intakeMap[nutrient.name] ?? 0;
          const meets = intake >= nutrient.dailyValue;
          return (
            <tr key={nutrient.key} className="border-b last:border-b-0">
              <td className="py-1 px-2">{nutrient.name}</td>
              <td className="py-1 px-2">{nutrient.dailyValue} {nutrient.unit}</td>
              <td className="py-1 px-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className={meets ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {intake} {nutrient.unit}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>
                        {meets
                          ? "You meet or exceed the daily value for this nutrient."
                          : "Below recommended daily value for this nutrient."
                        }
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function ActiveVitaminsMineralsPanel() {
  const { supplements, activeSuppIds } = useSupplements();
  const activeSupps = supplements.filter(s => activeSuppIds.includes(s.id));

  // Collect vitamins/minerals that are present in active supps
  const intakeMap = aggregateIntakePerNutrient(activeSupps, FDA_NUTRIENTS);

  const activeNutrients = FDA_NUTRIENTS.filter(n => (intakeMap[n.name] ?? 0) > 0);
  const activeVitamins = activeNutrients.filter(n => n.type === "vitamin");
  const activeMinerals = activeNutrients.filter(n => n.type === "mineral");

  const totalCount = activeNutrients.length;

  return (
    <Collapsible defaultOpen className="w-full space-y-2 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">
          Active Vitamins &amp; Minerals <span className="ml-1 text-xs bg-accent px-2 py-0.5 rounded">{totalCount}</span>
        </h3>
        <CollapsibleTrigger asChild>
          <button className="px-1 py-0.5 text-muted-foreground" aria-label="Collapse panel">
            ˄
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent asChild>
        <div className="grid md:block grid-cols-2 gap-8 bg-muted/30 rounded px-4 py-3">
          <div>
            <div className="text-md font-bold mb-1">Vitamins</div>
            <NutrientTable items={activeVitamins} intakeMap={intakeMap} />
          </div>
          <div>
            <div className="text-md font-bold mb-1">Minerals</div>
            <NutrientTable items={activeMinerals} intakeMap={intakeMap} />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
