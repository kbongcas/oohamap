// @ts-expect-error for svgr
import PinIcon from '../assets/icons/pin.svg?react'


const Menubar = () => {


  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id);
    console.log("drag started")
  }

  return (
    <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
      <li>
        <a className="tooltip" data-tip="Pin">
          <div draggable id="pin" onDragStart={handleDragStart} className="bg-opacity-0">
            <PinIcon width={24} height={24}/>
          </div>
        </a>
      </li>
      <li>
        <a className="tooltip" data-tip="Details">
          <div draggable id="2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </a>
      </li>
      <li>
        <a className="tooltip" data-tip="Stats">
          <div draggable id="1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </a>
      </li>
    </ul>
  )
}

export default Menubar
