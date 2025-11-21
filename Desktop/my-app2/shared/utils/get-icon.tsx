import { Hotel } from "lucide-react";
import { Building2 } from "lucide-react";
import { Flag } from "lucide-react";

export function getIcon(chooseIcon: "hotel" | "city" | "country") {
  const IconMap = new Map([
    ["hotel", Hotel],
    ["city", Building2],
    ["country", Flag],
  ]);
  return IconMap.get(chooseIcon);
}
