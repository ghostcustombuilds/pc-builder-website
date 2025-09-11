import React from "react";

type BuildComponent = {
  name: string;
  price: number;
  link: string;
};

type Props = {
  components: {
    cpu: BuildComponent;
    gpu: BuildComponent;
    motherboard: BuildComponent;
    ram: BuildComponent;
    storage: BuildComponent;
    psu: BuildComponent;
    case: BuildComponent;
  };
};

const CopyBuildList: React.FC<Props> = ({ components }) => {
  const handleCopy = () => {
    const text = Object.values(components)
      .map(({ name, price, link }) => `${name} - $${price}\n${link}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Copy Build List</h3>
      <p className="text-sm text-gray-600">Copy your selected components to share or save for later.</p>
      <ul className="list-disc pl-5">
        {Object.entries(components).map(([key, { name, price, link }]) => (
          <li key={key}>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {name}
            </a>{" "}
            - ${price}
          </li>
        ))}
      </ul>
      <button
        onClick={handleCopy}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Copy Build to Clipboard
      </button>
    </div>
  );
};

export default CopyBuildList;
