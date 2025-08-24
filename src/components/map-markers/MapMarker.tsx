import { Circle, Group, Image } from "react-konva";
import pinSvg from '../../assets/icons/pin.svg'
import useImage from 'use-image';


interface MapMarkerProps {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  width: number;
  height: number;
}

const MapMarker: React.FC<MapMarkerProps> = ({ x, y, scaleX, scaleY, width, height }) => {

  const [pinImage] = useImage(pinSvg, 'anonymous');

  return (
    <Group
      x={x}
      y={y}
      scaleX={scaleX}
      scaleY={scaleY}
      draggable
    >
      <Circle
        x={width / 2}
        y={height / 2}
        radius={16}
        fill="white"
        stroke={'black'}
      />
      <Image
        image={pinImage}
        width={width}
        height={height}
        drawBorder={true}
      />
    </Group>
  )
}

export default MapMarker
