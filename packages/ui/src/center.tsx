import React from "react";

// Add a Center component that centralizes (both verticaly and horizontally) the children given to it 

export const Center = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center flex-col h-full">
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  );
};
