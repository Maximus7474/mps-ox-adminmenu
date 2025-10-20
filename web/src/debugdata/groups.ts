import { OxGroup } from "@common/types/ox_types";
import { GroupDataDto } from "../pages/Groups/types/groupDataDto";

const debugGrades: OxGroup['grades'] = [];

for (let i = 6; i <= 15; i++) {
  debugGrades.push({ label: `Grade ${i}`, accountRole: 'owner' });
}

export const debugGroup: OxGroup = {
  name: 'generic_name',
  label: 'Generic thing',
  grades: [
    { label: 'Grade 1' },
    { label: 'Grade 2', accountRole: 'viewer' },
    { label: 'Grade 3', accountRole: 'contributor' },
    { label: 'Grade 4', accountRole: 'manager' },
    { label: 'Grade 5', accountRole: 'owner' },
    ...debugGrades
  ],
  type: 'job',
  hasAccount: true,
  colour: 123
};

export const debugGroupDataDto: GroupDataDto = {
  name: 'generic_name',
  label: 'Generic group',
  grades: [
    { id: 1, label: 'Grade 1', role: null },
    { id: 2, label: 'Grade 2', role: 'contributor' },
    { id: 3, label: 'Grade 3', role: 'owner' },
  ],
}
