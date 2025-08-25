// @ts-expect-error for svgr
import PinIconReact from '../assets/icons/pin.svg?react'
import PinIcon from '../assets/icons/pin.svg'
// @ts-expect-error for svgr
import HomeIconReact from '../assets/icons/home.svg?react'
import HomeIcon from '../assets/icons/home.svg'
// @ts-expect-error for svgr
import SwordIconReact from '../assets/icons/sword.svg?react'
import SwordIcon from '../assets/icons/sword.svg'

export type IconName = "pin" | "home" | "sword";

const iconNames: IconName[] = ["pin", "home", "sword"];


interface IconInfo {
  svg : string
  comp: string
}

type IconMap = Record<IconName, IconInfo>

//@TODO: Find a better way to do this
const icons: IconMap = {
  "pin": { svg: PinIcon, comp: PinIconReact  },
  "home": { svg: HomeIcon, comp: HomeIconReact  },
  "sword": { svg: SwordIcon, comp: SwordIconReact  }
}


export const toIconName = (value: string): IconName => {
  return iconNames.includes(value as IconName) ? (value as IconName) : "pin";
}

export default icons
