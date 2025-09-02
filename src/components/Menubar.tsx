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
    <ul className="menu menu-horizontal bg-base-200 rounded-box">
      <li>
        <div draggable id="pin" onDragStart={handleDragStart} className="bg-opacity-0">
          <a className="tooltip" data-tip="pin">
            <PinIcon />
          </a>
        </div>
      </li>
      <li>
        <div draggable id="sword" onDragStart={handleDragStart} className="bg-opacity-0">
          <a className="tooltip" data-tip="sword">
            <SwordIcon />
          </a>
        </div>
      </li>
      <li>
        <div draggable id="home" onDragStart={handleDragStart} className="bg-opacity-0">
          <a className="tooltip" data-tip="home">
            <HomeIcon />
          </a>
        </div>
      </li>
    </ul>
  );
};

export default Menubar;
