export const COMPANY = {
  name: "Boss Containers",
  tagline: "Container rental made simple",
  phone: "+32 472 23 03 55",
  email: "info@bosscontainers.be",
  address: "Westvaartdijk 95, 1850 Grimbergen",
  vat: "BE654770586",
  hours: {
    weekdays: "07:30 - 16:30",
    saturday: "07:30 - 16:30",
    sunday: "Closed",
  },
  social: {
    facebook: "https://facebook.com/Bosscontainer/",
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNavLinks(locale: string, dict: any) {
  return [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/book`, label: dict.nav.book },
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
}

export type WasteType =
  | "mixed"
  | "rubble"
  | "wood"
  | "cardboard"
  | "green"
  | "soil";

export interface ContainerPrice {
  size: number;
  price: number;
}

export interface WasteCategory {
  id: WasteType;
  icon: string;
  sizes: ContainerPrice[];
}

export const WASTE_CATEGORIES: WasteCategory[] = [
  {
    id: "mixed",
    icon: "\uD83C\uDFD7\uFE0F",
    sizes: [
      { size: 8, price: 550 },
      { size: 10, price: 580 },
      { size: 12, price: 630 },
      { size: 15, price: 690 },
      { size: 20, price: 790 },
      { size: 25, price: 920 },
      { size: 30, price: 1200 },
    ],
  },
  {
    id: "rubble",
    icon: "\uD83E\uDDF1",
    sizes: [
      { size: 8, price: 440 },
      { size: 10, price: 470 },
      { size: 12, price: 500 },
    ],
  },
  {
    id: "wood",
    icon: "\uD83E\uDEB5",
    sizes: [
      { size: 8, price: 450 },
      { size: 10, price: 500 },
      { size: 12, price: 550 },
      { size: 15, price: 610 },
      { size: 20, price: 710 },
      { size: 25, price: 840 },
      { size: 30, price: 1140 },
    ],
  },
  {
    id: "cardboard",
    icon: "\uD83D\uDCE6",
    sizes: [
      { size: 8, price: 370 },
      { size: 10, price: 410 },
      { size: 12, price: 450 },
      { size: 15, price: 510 },
      { size: 20, price: 670 },
      { size: 25, price: 830 },
      { size: 30, price: 960 },
    ],
  },
  {
    id: "green",
    icon: "\uD83C\uDF3F",
    sizes: [
      { size: 8, price: 370 },
      { size: 10, price: 400 },
      { size: 12, price: 440 },
      { size: 15, price: 510 },
      { size: 20, price: 670 },
      { size: 25, price: 830 },
      { size: 30, price: 980 },
    ],
  },
  {
    id: "soil",
    icon: "\u26F0\uFE0F",
    sizes: [{ size: 8, price: 520 }],
  },
];

export type ProjectType =
  | "renovation"
  | "construction"
  | "garden"
  | "declutter"
  | "demolition"
  | "moving";

export interface ProjectOption {
  id: ProjectType;
  icon: string;
  typicalWaste: WasteType[];
  suggestedSizes: { small: number; medium: number; large: number };
}

export const PROJECT_OPTIONS: ProjectOption[] = [
  {
    id: "renovation",
    icon: "\uD83D\uDD28",
    typicalWaste: ["mixed", "rubble", "wood"],
    suggestedSizes: { small: 8, medium: 12, large: 20 },
  },
  {
    id: "construction",
    icon: "\uD83C\uDFD7\uFE0F",
    typicalWaste: ["mixed", "rubble", "wood"],
    suggestedSizes: { small: 12, medium: 20, large: 30 },
  },
  {
    id: "garden",
    icon: "\uD83C\uDF33",
    typicalWaste: ["green", "soil"],
    suggestedSizes: { small: 8, medium: 10, large: 15 },
  },
  {
    id: "declutter",
    icon: "\uD83C\uDFE0",
    typicalWaste: ["mixed", "cardboard", "wood"],
    suggestedSizes: { small: 8, medium: 12, large: 20 },
  },
  {
    id: "demolition",
    icon: "\uD83D\uDCA5",
    typicalWaste: ["mixed", "rubble"],
    suggestedSizes: { small: 12, medium: 20, large: 30 },
  },
  {
    id: "moving",
    icon: "\uD83D\uDE9A",
    typicalWaste: ["mixed", "cardboard"],
    suggestedSizes: { small: 8, medium: 10, large: 15 },
  },
];

