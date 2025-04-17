import "./SelectDate.scss";
import React, { CSSProperties, FC, Ref } from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface SelectDateProps {
  selectedDate: any;
  isOpen: boolean;
  onSelect: (date: any) => void;
  onCancel?: () => void;
  onOk?: () => void;
  mode?: "single" | "range" | "multiple";
  defaultMonth?: Date;
  forwardRef?: Ref<HTMLDivElement>;
  styles?: CSSProperties;
}

const SelectDate: FC<SelectDateProps> = ({ selectedDate, onSelect, isOpen, mode = "single", defaultMonth = selectedDate, forwardRef, styles }) => {
  return (
    <div className={`selectDate ${isOpen ? "selectDate--active" : ""}`} style={styles} ref={forwardRef}>
      <DayPicker
        mode={mode as any}
        onSelect={onSelect}
        selected={selectedDate}
        weekStartsOn={1}
        required
        defaultMonth={mode !== "multiple" && defaultMonth}
        locale={ptBR}
        autoFocus
        showOutsideDays
      />
    </div>
  );
};

export default SelectDate;
