import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

interface formRow extends childrenAndStyles {
  label: string;
  labelPtTwo?: string;
}

function FormRow({ children, label, labelPtTwo }: formRow) {
  return (
    <div>
      <h4>
        {label}{" "}
        <span className="font-paragraph text-xs font-light"> {labelPtTwo}</span>
      </h4>
      {children}
    </div>
  );
}

export default FormRow;
