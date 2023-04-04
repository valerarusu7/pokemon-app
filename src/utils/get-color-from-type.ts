import { colors } from "@/data/type-colors";

export const getColorFromType = (type: string): string => {
  const color = colors.get(type);

  if (!color) return "#777";

  return color;
};
