
import React from "react";
import SectionPanel from "./SectionPanel";

const MainSectionsLayout: React.FC = () => (
  <div className="grid grid-cols-3 gap-8 px-8 py-10 w-full max-w-[1800px] mx-auto min-h-[85vh] 
                  md:grid-cols-1 md:gap-6 md:px-2 md:py-6 animate-fade-in">
    <SectionPanel title="Supplements">
      {/* To be designed */}
    </SectionPanel>
    <SectionPanel title="Intake Tracker">
      {/* To be designed */}
    </SectionPanel>
    <SectionPanel title="Insights">
      {/* To be designed */}
    </SectionPanel>
  </div>
);

export default MainSectionsLayout;
