
import React from "react";

type SectionPanelProps = {
  title: string;
  children?: React.ReactNode;
};

const SectionPanel: React.FC<SectionPanelProps> = ({ title, children }) => (
  <section className="bg-card shadow-lg rounded-xl border border-border p-6 flex flex-col min-h-[70vh] animate-fade-in transition-all">
    <h2 className="text-2xl font-bold mb-4 border-b border-border pb-1 group relative">
      <span className="transition-colors group-hover:text-primary group-hover:underline">{title}</span>
      {/* Optional: small underline animation */}
      <span className="block absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </h2>
    <div className="flex-1">
      {children}
    </div>
  </section>
);

export default SectionPanel;

