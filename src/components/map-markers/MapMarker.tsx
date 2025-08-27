import { Circle, Group, Image } from "react-konva";
import pinSvg from '../../assets/icons/pin.svg'
import useImage from 'use-image';
import { Html } from 'react-konva-utils';
import { useState } from "react";
import icons, { toIconName } from "../../utils/icons";
import Konva from 'konva';


interface MapMarkerProps {
  id: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  icon: string;
  onSelected: (id: number) => void
  label: string;
  showBackground: boolean;
}

const MapMarker: React.FC<MapMarkerProps> = ({ id, x, y, scaleX, scaleY, icon, onSelected, label, showBackground}) => {

  const iconName = toIconName(icon)
  const svg = icons[iconName].svg ?? pinSvg
  const [pinImage] = useImage(svg, 'anonymous');

  const width = (pinImage?.width ?? 0)
  const height = (pinImage?.height ?? 0)

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault()
    onSelected(id)
  }

  return (
    <Group
      x={x}
      y={y}
      scaleX={isHovered ? scaleX * 1.2 : scaleX}
      scaleY={isHovered ? scaleY * 1.2 : scaleY}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      draggable
    >
      {isHovered && <Html>
        <div className="tooltip tooltip-open bottom-9" data-tip={label}>
        </div>
      </Html>
      }
      {
        showBackground && <Circle
          radius={width}
          scaleX={.80}
          scaleY={.80}
          fill="white"
          stroke={'black'}
        />
      }
      <Image
        image={pinImage}
        offsetX={width / 2}
        offsetY={height / 2}
      />
    </Group>
  )
}

export default MapMarker
