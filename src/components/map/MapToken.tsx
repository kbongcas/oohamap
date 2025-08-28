import { Circle, Group, Image } from "react-konva";
import pinSvg from "../../assets/icons/pin.svg";
import useImage from "use-image";
import { Html } from "react-konva-utils";
import { useState } from "react";
import icons, { toIconName } from "../../utils/icons";
import Konva from "konva";
import type { EntToken } from "../../store/entTokenStore";

interface MapTokenProps {
  isSelected: boolean;
  onSelected: (entToken: EntToken) => void;
  entToken: EntToken;
}

const MapToken: React.FC<MapTokenProps> = ({ onSelected, entToken, isSelected }) => {
  const iconName = toIconName(entToken.icon);
  const svg = icons[iconName].svg ?? pinSvg;
  const [pinImage] = useImage(svg, "anonymous");

  const width = pinImage?.width ?? 0;
  const height = pinImage?.height ?? 0;

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    onSelected(entToken);
  };

  const showHover = isSelected || isHovered;

  return (
    <Group
      x={entToken.x}
      y={entToken.y}
      scaleX={isHovered ? entToken.scaleX * 1.2 : entToken.scaleX}
      scaleY={isHovered ? entToken.scaleY * 1.2 : entToken.scaleY}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      draggable
    >
      {showHover && (
        <Html>
          <div className="tooltip tooltip-open bottom-9" data-tip={entToken.label}></div>
        </Html>
      )}
      {entToken.showBackground && <Circle radius={width} scaleX={0.8} scaleY={0.8} fill="white" stroke={"black"} />}
      <Image image={pinImage} offsetX={width / 2} offsetY={height / 2} />
    </Group>
  );
};

export default MapToken;
