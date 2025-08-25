import icons from "../utils/icons";

const Menubar = () => {


  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id);
    console.log("drag started id", event.currentTarget.id)
  }

  const PinIcon = icons["pin"].comp
  const HomeIcon = icons["home"].comp
  const SwordIcon = icons["sword"].comp

  return (
    <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
      <li>
        <a className="tooltip" data-tip="pin">
          <div draggable id="pin" onDragStart={handleDragStart} className="bg-opacity-0">
            <PinIcon />
          </div>
        </a>
      </li>
      <li>
        <a className="tooltip" data-tip="sword">
          <div draggable id="sword" onDragStart={handleDragStart} className="bg-opacity-0">
            <SwordIcon />
          </div>
        </a>
      </li>
      <li>
        <a className="tooltip" data-tip="home">
          <div draggable id="home" onDragStart={handleDragStart} className="bg-opacity-0">
            <HomeIcon />
          </div>
        </a>
      </li>
    </ul>
  )
}

export default Menubar
