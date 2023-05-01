export enum WellFormStep {
  SelectDraft,
  SelectWell,
  EnterGeneralInformation,
  EnterDrillingSettings,
  EnterAdditionalData,
}

export const STEPS: { title: string; description: string }[] = [
  {
    title: 'Data',
    description: 'Select data',
  },
  {
    title: 'Well concept',
    description: 'Select well',
  },
  {
    title: 'General',
    description: 'General information',
  },
  {
    title: 'Data',
    description: 'Drilling settings',
  },
  {
    title: 'Additional data',
    description: 'Completion data',
  },
];
