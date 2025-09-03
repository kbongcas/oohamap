import icons from "../utils/icons";

const PinIcon = icons["pin"].reactComponent;
const HomeIcon = icons["home"].reactComponent;
const SwordIcon = icons["sword"].reactComponent;

const Menubar = () => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
    // @TODO: set draw image
    //event.dataTransfer.setDragImage();
  };

  return (
    <div className="flex gap-1">
      <div draggable id="pin" onDragStart={handleDragStart} className="btn btn-circle btn-sm">
        <PinIcon />
      </div>
      <div draggable id="home" onDragStart={handleDragStart} className="btn btn-circle btn-sm">
        <HomeIcon />
      </div>
      <div draggable id="sword" onDragStart={handleDragStart} className="btn btn-circle btn-sm">
        <SwordIcon />
      </div>
    </div>
  );
};

export default Menubar;
