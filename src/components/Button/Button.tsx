import clsx from "clsx";

type Settings = {
  name: string;
  type: "submit" | "reset" | "button";
  colorType: "primary" | "danger" | "normal";
  onClick?: () => void;
};

export const Button = (data: Settings) => {
  return (
    <div>
      <button
        type={data.type}
        className={clsx(
          "rounded-sm border border-slate-200 px-3 py-1 font-semibold text-sm",
          data.colorType === "primary" && "bg-green-600 text-white",
          data.colorType === "danger" && "bg-red-600 text-white",
          data.colorType === "normal" && "text-black",
        )}
        onClick={data.onClick}
      >
        {data.name}
      </button>
    </div>
  );
};
