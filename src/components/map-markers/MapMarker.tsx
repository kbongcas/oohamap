import { Circle, Group, Image } from "react-konva";
import pinSvg from '../../assets/icons/pin.svg'
import useImage from 'use-image';
import { Html } from 'react-konva-utils';
import { useState, useRef } from "react";
import Konva from 'konva';
import icons, { toIconName } from "../../utils/icons";


interface MapMarkerProps {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  icon:  string;
}

const MapMarker: React.FC<MapMarkerProps> = ({x, y, scaleX, scaleY, icon}) => {

  const iconName = toIconName(icon)
  const svg = icons[iconName].svg ?? pinSvg
  console.log(icon)
  const [pinImage] = useImage(svg, 'anonymous');

  const width = (pinImage?.width ?? 0)
  const height = (pinImage?.height ?? 0)
  
  const [isHovered, setIsHovered] = useState(false);

  const groupRef = useRef<Konva.Group>(null);

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      scaleX={isHovered ? scaleX * 1.2 : scaleX}
      scaleY={isHovered ? scaleY * 1.2 :  scaleY}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
    >
      { isHovered && <Html>
        <div className="tooltip tooltip-open bottom-9" data-tip="hello">
        </div>
      </Html>
      }
      <Circle
        radius={width}
        scaleX={.80}
        scaleY={.80}
        fill="white"
        stroke={'black'}
      />
      <Image
        image={pinImage}
        offsetX={width / 2}
        offsetY={height / 2}
      />
    </Group>
  )
}

export default MapMarker
