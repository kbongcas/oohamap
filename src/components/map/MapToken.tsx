import { Circle, Group, Path } from "react-konva";
import { Html } from "react-konva-utils";
import { useState } from "react";
import icons, { DEFAULT_PATH_DATA, toIconName } from "../../utils/icons";
import Konva from "konva";
import type { EntToken } from "../../store/entTokenStore";

const HOVER_SCALE = 1.2;

interface MapTokenProps {
  scaleOffset: number;
  isSelected: boolean;
  onSelected: (entToken: EntToken) => void;
  entToken: EntToken;
}

const MapToken: React.FC<MapTokenProps> = ({ onSelected, entToken, isSelected, scaleOffset }) => {
  const iconName = toIconName(entToken.icon);
  const pathData = icons[iconName].pathData ?? DEFAULT_PATH_DATA;

  const width = 24;
  const height = 24;

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    onSelected(entToken);
  };

  const showHover = isSelected || isHovered;

  const getScale = () => {
    const base = isHovered ? entToken.scale * HOVER_SCALE : entToken.scale;
    const withOffset = base * scaleOffset;

    return {
      x: withOffset,
      y: withOffset,
    };
  };

  return (
    <Group
      x={entToken.x}
      y={entToken.y}
      scale={getScale()}
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
      {entToken.showBackground && <Circle radius={width * 0.8} fill="white" stroke={"black"} />}
      <Path
        offsetX={width / 2}
        offsetY={height / 2}
        data={pathData}
        fill={entToken.color}
        scale={{
          x: 1,
          y: 1,
        }}
      />
    </Group>
  );
};

export default MapToken;
