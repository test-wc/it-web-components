export const SECTION_VARIANTS = ['muted', 'emphasis', 'primary'] as const;
export type SectionVariant = (typeof SECTION_VARIANTS)[number];
export type SectionProps = {
  variant?: SectionVariant;
  image?: string;
  inverse?: boolean;
};
