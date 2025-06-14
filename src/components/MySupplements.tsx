
import React, { useMemo } from "react";
import { useSupplements } from "@/contexts/SupplementsContext";
import SupplementCard from "./SupplementCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MySupplements() {
  const { supplements, search, setSearch } = useSupplements();
  const [open, setOpen] = React.useState(true);

  // Filter: by supplement name OR nutrition fact name
  const filteredSupplements = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return supplements;
    return supplements.filter(supp =>
      supp.name.toLowerCase().includes(q) ||
      supp.nutritionFacts.some(fact => fact.name.toLowerCase().includes(q))
    );
  }, [supplements, search]);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full space-y-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">My Supplements</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={open ? "Collapse" : "Expand"}>
            <span className={`text-xl font-bold text-muted-foreground transition-transform ${open ? "rotate-0" : "rotate-180"}`}>˄</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent asChild>
        <div className="mt-2 flex flex-col gap-3">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              className="pl-8"
              placeholder="Search by supplement or nutrition fact…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search supplements"
            />
          </div>
          <div className="grid gap-4">
            {filteredSupplements.length === 0 ? (
              <div className="text-sm text-muted-foreground px-2">No supplements found.</div>
            ) : (
              filteredSupplements.map(supplement =>
                <SupplementCard key={supplement.id} supplement={supplement} />
              )
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
