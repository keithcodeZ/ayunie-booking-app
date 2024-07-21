import { propertyTypes } from "../config/property-options-config";

type Props = {
  selectedPropertyTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PropertyTypesFilter = ({ selectedPropertyTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Type</h4>
      {propertyTypes.map((propertyType) => (
        <label className="flex items-center text-sm space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={propertyType}
            checked={selectedPropertyTypes.includes(propertyType)}
            onChange={onChange}
          />
          <span>{propertyType}</span>
        </label>
      ))}
    </div>
  );
};

export default PropertyTypesFilter;