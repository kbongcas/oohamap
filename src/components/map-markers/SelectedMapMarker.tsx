import Editor from "./Editor";
import { RiCloseCircleFill } from "react-icons/ri";


interface SelectedMapMarkerProps {
  label: string;
  id: number;
  close: () => void;
}

const SelectedMapMarker: React.FC<SelectedMapMarkerProps> = ({ id, label, close }) => {
  return (
    <div className="card bg-base-100 w-90 shadow-sm max-h-[80vh]">
      <div className="card-actions justify-end">
        <button className="btn btn-square btn-sm" onClick={() => close()}>
          <RiCloseCircleFill size={24} />
        </button>
      </div>
      <div className="tabs tabs-lift">

        <label className="tab">
          <input type="radio" name="my_tabs_4" defaultChecked />
          Data
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="card-body overflow-y-scroll">
            <Editor />
          </div>
        </div>

        <label className="tab">
          <input type="radio" name="my_tabs_4" />
          Marker
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
        </div>

      </div>

    </div>
  )
}

export default SelectedMapMarker
