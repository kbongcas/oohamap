import { useMemo, useRef, useState } from "react";
import { Layer, Stage, Image } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import Menubar from "../components/Menubar";
import MapToken from "../components/map/MapToken";
import { useEntTokens, type EntToken, useEntTokensActions } from "../store/entTokenStore";
import EntEditor from "../components/map/EntEditor";

const SCALE_BY = 1.2;
const TOKEN_SCALE_MIN = 0.9;
const TOKEN_SCALE_MAX = 2.0;
const ZOOM_MAX = 6.0;
const ZOOM_MIN = 0.6;

function MapPage() {
  const src =
    "https://i0.wp.com/blog.worldanvil.com/wp-content/uploads/2020/02/Kingsreach-Blue.jpg?resize=1024%2C768&ssl=1";

  const [map] = useImage(src, "anonymous");
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [scale, setScale] = useState(1);
  const stageRef = useRef<Konva.Stage>(null);
  const tokens: EntToken[] = useEntTokens();
  const { addEntToken } = useEntTokensActions();
  const [selectedtoken, setSelectedToken] = useState<EntToken | null>(null);

  // Inputs
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (stage === null) return;
    const oldScale = scale;

    const pointer = stage.getPointerPosition();
    if (pointer === null) return;
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    const scaleBy = direction > 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;
    const newScale = Math.max(ZOOM_MIN, Math.min(scaleBy, ZOOM_MAX));

    stage.scale({ x: newScale, y: newScale });
    setScale(newScale);
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  };

  // Dropping tokens from menu bar
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const stage = stageRef?.current;
    stageRef?.current?.setPointersPositions(event);
    const pointer = stageRef?.current?.getPointerPosition();
    if (stage === null) return;
    if (pointer === null || pointer === undefined) return;
    console.log(pointer.x, pointer.y);
    const point = {
      x: (pointer.x - stage.x()) / scale,
      y: (pointer.y - stage.y()) / scale,
    };

    const icon = event.dataTransfer.getData("text/plain");
    addEntToken({
      icon: icon,
      x: point.x,
      y: point.y,
      label: icon,
      showBackground: false,
      scaleX: tokenScale.x,
      scaleY: tokenScale.y,
    });
  };
  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const tokenScale = useMemo(() => {
    if (scale > TOKEN_SCALE_MAX) {
      return { x: 1 / TOKEN_SCALE_MAX, y: 1 / TOKEN_SCALE_MAX };
    } else if (scale < TOKEN_SCALE_MIN) {
      return { x: 1 / TOKEN_SCALE_MIN, y: 1 / TOKEN_SCALE_MIN };
    }
    return { x: 1 / scale, y: 1 / scale };
  }, [scale]);

  return (
    <div onDragOver={enableDropping} onDrop={handleDrop}>
      <Stage width={width} height={height} ref={stageRef} onWheel={handleWheel} draggable>
        <Layer className="border-2">
          <Image image={map} />
        </Layer>
        <Layer className="border-2">
          {tokens.map((m) => {
            return (
              <MapToken
                key={m.id}
                entToken={m}
                isSelected={selectedtoken?.id === m.id}
                onSelected={(entToken) => setSelectedToken(entToken)}
              />
            );
          })}
        </Layer>
      </Stage>
      <div className="absolute top-[12px] right-[12px] flex flex-col items-end gap-4">
        <Menubar />
        {selectedtoken != null && <EntEditor entToken={selectedtoken} close={() => setSelectedToken(null)} />}
      </div>
    </div>
  );
}

export default MapPage;
