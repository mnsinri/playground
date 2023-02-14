import React from "react";

import FirstSample from "./firstSample";
import ComingSoon from "./comingSoon";

export type WorkType = {
  id: string;
  title?: string;
  date?: string;
  type?: string;
  preview: React.FC;
  scene: React.FC;
};

const works: WorkType[] = [FirstSample, ComingSoon];
export const WorksContext = React.createContext<WorkType[]>(works);

type WorkProviderProps = {
  children: React.ReactNode;
};
export const WorksProvider = React.memo(({ children }: WorkProviderProps) => {
  return (
    <WorksContext.Provider value={works}>{children}</WorksContext.Provider>
  );
});
