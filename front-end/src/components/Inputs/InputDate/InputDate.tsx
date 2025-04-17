"use client";
import "./InputDate.scss";
import { FC, useState } from "react";
import { format, parse, isValid } from "date-fns";
import InputMask, { Props } from "react-input-mask";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import useClickOutside from "@/hooks/useClickOutside";
import SelectDate from "../SelectDate/SelectDate";

type InputProp = Omit<Props, "mask"> & {
  label?: string;
  erroMsg?: string;
  invalid?: boolean;
  variant?: "default" | "white";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeControl?: boolean;
};

const InputDate: FC<InputProp> = ({ id, label, value, erroMsg = "", invalid, variant, onChange, onBlur, activeControl, disabled, ...rest }) => {
  const [invalidInput, setInvalidInput] = useState(invalid);
  const [inputValue, setInputValue] = useState(value);
  const [active, setActive, ref] = useClickOutside();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value ? parse(value.toString(), "dd/MM/yyyy", new Date()) : new Date());
  const toggleDialog = () => setActive(!active);

  const handleDayPickerSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (!date) return;
    setInvalidInput(false);
    const dateFormatted = format(date, "dd/MM/yyyy");
    setInputValue(dateFormatted);
    onChange({ target: { value: dateFormatted } } as React.ChangeEvent<HTMLInputElement>);
    onBlur && onBlur({ target: { value: dateFormatted } } as React.ChangeEvent<HTMLInputElement>);
    setActive(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());
    if (!isValid(parsedDate)) {
      setInvalidInput(true);
      return setSelectedDate(undefined);
    }
    setInvalidInput(false);
    setSelectedDate(parsedDate);
  };

  const handleOk = () => {
    if (selectedDate) setInputValue(format(selectedDate, "dd/MM/yyyy"));
    toggleDialog();
  };

  return (
    <div className={`inputDate ${invalidInput || invalid ? "inputDate--invalid" : ""} inputDate--${variant}`}>
      {label && (
        <label htmlFor={id} className="inputDate__label inputDate__label--invalid">
          {label}
        </label>
      )}
      <div className="inputDate__element" id="inputDate" aria-disabled={disabled} ref={ref}>
        {/* @ts-ignore */}
        <InputMask
          id={id}
          disabled={disabled}
          type="text"
          value={inputValue || value}
          mask="99/99/9999"
          maskPlaceholder={null}
          autoComplete="one-time-code"
          className="inputDate__input"
          {...rest}
          onBlur={onBlur}
          onChange={(e) => {
            handleInputChange(e);
            onChange(e);
          }}
        />
        <button type="button" className="inputDate__button" onClick={toggleDialog} disabled={disabled}>
          <ImgDefault src="/icons/calendar.svg" alt="Calendário" className="inputDate__icon" />
        </button>
        {active && (
          <SelectDate mode="single" selectedDate={selectedDate} onSelect={handleDayPickerSelect} onCancel={toggleDialog} onOk={handleOk} isOpen={active} />
        )}
      </div>
      {erroMsg && <span className="inputDate__helpText">{invalid && erroMsg}</span>}
    </div>
  );
};

export default InputDate;
