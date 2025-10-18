import { OxAccountRole } from "@common/types/ox_types";

export type Grade = {
  id: number;
  label: string;
  role: OxAccountRole | null;
};

export type GroupDataDto = {
  name: string;
  label: string;
  type?: string;
  hasAccount?: boolean;
  grades: Grade[];
};
