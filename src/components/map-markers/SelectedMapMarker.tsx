import { useState, type ChangeEvent, type FormEvent } from "react";
import Editor from "./Editor";
import { RiCloseCircleFill } from "react-icons/ri";
import { useMapMarkersActions } from "../../store/mapMarkerStore";

interface SelectedMapMarkerProps {
  label: string;
  id: number;
  hasBackground: boolean;
  close: () => void;
}

type SelectedMapMarkerFormData = {
  label: string;
  hasBackground: boolean;
};

const SelectedMapMarker: React.FC<SelectedMapMarkerProps> = ({ hasBackground, id, label, close }) => {
  const { setMapMarkerData } = useMapMarkersActions();

  const [formData, setFormData] = useState<SelectedMapMarkerFormData>({
    label,
    hasBackground,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMapMarkerData(id, { showBackground: formData.hasBackground });
  };

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
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box border p-4">
              <legend className="fieldset-legend">Token options</legend>
              <label className="label">
                <input
                  id="hasBackground"
                  name="hasBackground"
                  type="checkbox"
                  className="toggle"
                  onChange={handleChange}
                  checked={formData.hasBackground}
                />
                Token Background
              </label>
              <legend className="fieldset-legend">Color</legend>
              <input type="text" className="input" placeholder="Type here" />
            </fieldset>
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectedMapMarker;
