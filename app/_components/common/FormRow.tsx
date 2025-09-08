import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

interface formRow extends childrenAndStyles {
  label: string;
  labelPtTwo?: string;
  handleCopyText?: () => void;
}

function FormRow({ children, label, labelPtTwo, handleCopyText }: formRow) {
  return (
    <div>
      <h4>
        {label}{" "}
        {labelPtTwo && (
          <span
            onClick={handleCopyText}
            className="font-paragraph text-xs font-light cursor-pointer duration-200 hover:text-primary-accent"
          >
            {" "}
            {labelPtTwo}
          </span>
        )}
      </h4>
      {children}
    </div>
  );
}

export default FormRow;
