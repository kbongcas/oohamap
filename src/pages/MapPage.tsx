import { useMemo, useRef, useState } from 'react';
import { Layer, Stage, Image, Group, Circle } from 'react-konva'
import Konva from 'konva';
import useImage from 'use-image';
import Menubar from '../components/Menubar';
import pinSvg from '../assets/icons/pin.svg'

const SCALE_BY = 1.2
const MARKER_SCALE_MIN = .5
const MARKER_SCALE_MAX = 2.0
const ZOOM_MAX = 6.0
const ZOOM_MIN = .6

function MapPage() {

  const src = "https://i0.wp.com/blog.worldanvil.com/wp-content/uploads/2020/02/Kingsreach-Blue.jpg?resize=1024%2C768&ssl=1"

  const [map] = useImage(src, 'anonymous');
  const [pinImage] = useImage(pinSvg, 'anonymous');

  const width = window.innerWidth;
  const height = window.innerHeight;

  const [scale, setScale] = useState(1)

  const stageRef = useRef<Konva.Stage>(null);

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (stage === null) return
    const oldScale = scale

    const pointer = stage.getPointerPosition();
    if (pointer === null) return
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
    setScale(newScale)
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  };

  const markerScale = useMemo(() => {
    if (scale > MARKER_SCALE_MAX) {
      return { x: 1 / MARKER_SCALE_MAX, y: 1 / MARKER_SCALE_MAX }
    }
    else if (scale < MARKER_SCALE_MIN) {
      return { x: 1 / MARKER_SCALE_MIN, y: 1 / MARKER_SCALE_MIN }
    }
    return { x: 1 / scale, y: 1 / scale }
  }, [scale])

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('dropped')
    const stage = stageRef?.current
    stageRef?.current?.setPointersPositions(event);
    const pointer = stageRef?.current?.getPointerPosition()
    if (stage === null) return
    if (pointer === null || pointer === undefined) return
    console.log(pointer.x, pointer.y)
    const point = {
      x: (pointer.x - stage.x()) / scale,
      y: (pointer.y - stage.y()) / scale,
    };

    const icon = event.dataTransfer.getData("text/plain");
    setMarkers([...markers, { icon: icon, x: point.x, y: point.y }])
  }
  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const [markers, setMarkers] = useState<{ icon: string, x: number, y: number }[]>([])

  return (
    <div
      onDragOver={enableDropping}
      onDrop={handleDrop}
    >
      <Stage
        width={width}
        height={height}
        ref={stageRef}
        onWheel={handleWheel}
        draggable
      >
        <Layer
          className="border-2"
        >
          <Image image={map} />
        </Layer>
        <Layer
          className="border-2"
        >
          {
            markers.map((m, i) => {
              const markerWidth = 24
              const markerheight = 24
              return (
                <Group
                  key={i}
                  x={m.x}
                  y={m.y}
                  scaleX={markerScale.x}
                  scaleY={markerScale.y}
                  draggable
                >
                  <Circle
                    x={markerWidth/2}
                    y={markerheight/2}
                    radius={16}
                    fill="white"
                    stroke={'black'}
                  />
                  <Image
                    key={i}
                    image={pinImage}
                    width={markerWidth}
                    height={markerheight}
                    drawBorder={true}
                  />
                </Group>
              )
            }
            )

          }
        </Layer>
      </Stage>
      <div className="absolute top-[12px] right-[12px]" >
        <Menubar />
      </div>
      <div className="absolute top-[24px] right-[12px]" >
        {markerScale.x}
      </div>
    </div>
  )
}

export default MapPage
