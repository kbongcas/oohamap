// @ts-expect-error for svgr
import PinIconReact from '../assets/icons/pin.svg?react'
import PinIcon from '../assets/icons/pin.svg'
// @ts-expect-error for svgr
import HomeIconReact from '../assets/icons/home.svg?react'
import HomeIcon from '../assets/icons/home.svg'
// @ts-expect-error for svgr
import SwordIconReact from '../assets/icons/sword.svg?react'
import SwordIcon from '../assets/icons/sword.svg'

// @ts-expect-error for svgr
import CloseIconReact from '../assets/icons/close.svg?react'
import CloseIcon from '../assets/icons/close.svg'

export type IconName = "pin" | "home" | "sword" | "close";

const iconNames: IconName[] = ["pin", "home", "sword", "close"];


interface IconInfo {
  svg : string
  comp: string
}

type IconMap = Record<IconName, IconInfo>

//@TODO: Find a better way to do this
const icons: IconMap = {
  "pin": { svg: PinIcon, comp: PinIconReact  },
  "home": { svg: HomeIcon, comp: HomeIconReact  },
  "sword": { svg: SwordIcon, comp: SwordIconReact  },
  "close": { svg: CloseIcon, comp: CloseIconReact  }
}


export const toIconName = (value: string): IconName => {
  return iconNames.includes(value as IconName) ? (value as IconName) : "pin";
}

export default icons
