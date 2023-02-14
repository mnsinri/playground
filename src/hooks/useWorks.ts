import { useContext } from "react";
import { WorksContext } from "@components/works";

export const useWorks = () => {
  return useContext(WorksContext);
};
