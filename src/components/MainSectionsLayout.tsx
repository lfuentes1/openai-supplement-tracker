
import React from "react";
import SectionPanel from "./SectionPanel";
import AddSupplement from "./AddSupplement";
import MySupplements from "./MySupplements";
import { SupplementsProvider } from "@/contexts/SupplementsContext";
import ActiveVitaminsMineralsPanel from "./ActiveVitaminsMineralsPanel";
import MissingVitaminsMineralsPanel from "./MissingVitaminsMineralsPanel";

const MainSectionsLayout: React.FC = () => (
  <SupplementsProvider>
    <div className="grid grid-cols-3 gap-8 px-8 py-10 w-full max-w-[1800px] mx-auto min-h-[85vh] 
                  md:grid-cols-1 md:gap-6 md:px-2 md:py-6 animate-fade-in">
      <SectionPanel title="Supplements">
        <div className="space-y-8">
          <AddSupplement />
          <MySupplements />
        </div>
      </SectionPanel>
      <SectionPanel title="Intake Tracker">
        <div className="space-y-6">
          <ActiveVitaminsMineralsPanel />
          <MissingVitaminsMineralsPanel />
        </div>
      </SectionPanel>
      <SectionPanel title="Insights">
        {/* To be designed */}
      </SectionPanel>
    </div>
  </SupplementsProvider>
);

export default MainSectionsLayout;
