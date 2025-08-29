// Summary: Attempt to keep consitency between using icons used for Konva's path data and React icons
import type { IconType } from "react-icons/lib";
import { RiCloseCircleFill, RiHome2Fill, RiMapPin2Fill, RiSwordFill } from "react-icons/ri";

export type IconName = "pin" | "home" | "sword" | "close";

const iconNames: IconName[] = ["pin", "home", "sword", "close"];

const PinIcon =
  "M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z";
const HomeIcon =
  "M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20Z";
const SwordIcon =
  "M7.04813 13.4061L10.5831 16.9421L9.1703 18.3558L10.5849 19.7711L9.17064 21.1853L6.69614 18.71L3.86734 21.5388L2.45312 20.1246L5.28192 17.2958L2.80668 14.8213L4.22089 13.4071L5.63477 14.8202L7.04813 13.4061ZM2.99907 3L6.54506 3.00335L18.3624 14.8207L19.7772 13.4071L21.1915 14.8213L18.7166 17.2962L21.545 20.1246L20.1308 21.5388L17.3024 18.7104L14.8275 21.1853L13.4133 19.7711L14.8269 18.3562L3.00181 6.53118L2.99907 3ZM17.4563 3.0001L20.9991 3.00335L21.001 6.52648L16.9481 10.5781L13.4121 7.0431L17.4563 3.0001Z";

export const DEFAULT_PATH_DATA = PinIcon;

interface IconInfo {
  pathData: string | null;
  reactComponent: IconType;
}

type IconMap = Record<IconName, IconInfo>;

const icons: IconMap = {
  pin: { pathData: PinIcon, reactComponent: RiMapPin2Fill },
  home: { pathData: HomeIcon, reactComponent: RiHome2Fill },
  sword: { pathData: SwordIcon, reactComponent: RiSwordFill },
  close: { pathData: null, reactComponent: RiCloseCircleFill },
};

export const toIconName = (value: string): IconName => {
  return iconNames.includes(value as IconName) ? (value as IconName) : "pin";
};

export default icons;
