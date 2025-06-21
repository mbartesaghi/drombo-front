import { ReactNode } from "react";
import { SvgIconComponent } from "@mui/icons-material";

export default interface CardProps {
  title: string;
  icon?: SvgIconComponent;
  children: ReactNode;
  iconColor?: string;
}
