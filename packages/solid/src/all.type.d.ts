import * as IconMap from "./map";
import { JSXElement } from "solid-js";
import { IIconProps } from "./runtime";

export type IconType = keyof typeof IconMap;

export const ALL_ICON_KEYS: string[];

export interface IIconAllProps extends IIconProps {
    // FIXME just use string to prevent type error.
    type: IconType | string;
}

export default function Icon(props: IIconAllProps): JSXElement;
export * from "./runtime";
