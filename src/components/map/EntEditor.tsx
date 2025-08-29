import { useEffect, useState, type ChangeEvent } from "react";
import Editor from "./Editor";
import { RiCloseCircleFill } from "react-icons/ri";
import { useEntTokensActions, type EntToken } from "../../store/entTokenStore";

interface EntEditorProps {
  entToken: EntToken;
  close: () => void;
}

type EntEditorFormData = {
  label: string;
  showBackground: boolean;
  color: string;
};

const EntEditor: React.FC<EntEditorProps> = ({ entToken, close }) => {
  const { setEntToken } = useEntTokensActions();

  const [formData, setFormData] = useState<EntEditorFormData>({
    label: entToken.label,
    showBackground: entToken.showBackground,
    color: entToken.color,
  });

  useEffect(() => {
    setFormData({
      label: entToken.label,
      showBackground: entToken.showBackground,
      color: entToken.color,
    });
  }, [entToken]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let data = { ...formData, [name]: value };
    if (name == "showBackground") {
      data = { ...data, showBackground: !formData.showBackground };
    }

    setFormData(data);
    setEntToken(entToken.id, data);
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
          <form>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box border p-4">
              <legend className="fieldset-legend">Token options</legend>
              <label className="label">
                <input
                  id="showBackground"
                  name="showBackground"
                  type="checkbox"
                  className="toggle"
                  checked={formData.showBackground}
                  onChange={handleChange}
                />
                Token Background
              </label>
              <legend className="fieldset-legend">Label</legend>
              <input
                type="text"
                className="input"
                placeholder={entToken.label}
                id="label"
                name="label"
                onChange={handleChange}
              />
              <legend className="fieldset-legend">Color</legend>
              <input id="color" name="color" type="color" value={formData.color} onChange={handleChange} />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntEditor;
