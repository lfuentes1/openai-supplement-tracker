
import React from "react";
import { useSupplements } from "@/contexts/SupplementsContext";
import { FDA_NUTRIENTS, FDANutrient } from "@/data/FDA_DV";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

function NutrientTable({ items }: { items: FDANutrient[] }) {
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
        {items.map(nutrient => (
          <tr key={nutrient.key} className="border-b last:border-b-0">
            <td className="py-1 px-2">{nutrient.name}</td>
            <td className="py-1 px-2">{nutrient.dailyValue} {nutrient.unit}</td>
            <td className="py-1 px-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-red-600 font-semibold">0 {nutrient.unit}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>
                      Missing! This nutrient has not been included from your supplements yet.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function MissingVitaminsMineralsPanel() {
  const { supplements, activeSuppIds } = useSupplements();
  const activeSupps = supplements.filter(s => activeSuppIds.includes(s.id));

  // Collect active present nutrients
  const presentMap: Record<string, boolean> = {};
  for (const supp of activeSupps) {
    for (const fact of supp.nutritionFacts) {
      // Use same matching logic as in Active panel
      const nutrient = FDA_NUTRIENTS.find(n =>
        fact.name.toLowerCase() === n.key.toLowerCase() || fact.name.toLowerCase() === n.name.toLowerCase()
      );
      if (nutrient) presentMap[nutrient.name] = true;
    }
  }

  const missingNutrients = FDA_NUTRIENTS.filter(n => !presentMap[n.name]);
  const missingVitamins = missingNutrients.filter(n => n.type === "vitamin");
  const missingMinerals = missingNutrients.filter(n => n.type === "mineral");
  const totalCount = missingNutrients.length;

  return (
    <Collapsible defaultOpen className="w-full space-y-2 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">
          Missing Vitamins &amp; Minerals <span className="ml-1 text-xs bg-accent px-2 py-0.5 rounded">{totalCount}</span>
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
            <NutrientTable items={missingVitamins} />
          </div>
          <div>
            <div className="text-md font-bold mb-1">Minerals</div>
            <NutrientTable items={missingMinerals} />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
