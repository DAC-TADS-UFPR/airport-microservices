// ModalSelectSeat.tsx
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./ModalSelectSeat.module.css";

type Column = string;

export interface Seat {
  row: number;
  column: Column;
  isSelected: boolean;
  isAvailable: boolean;
}

interface Props {
  rows?: number;
  columns?: Column[];
  onClose: VoidFunction;
  onConfirm: (seats: Seat[]) => void;
}

const DEFAULT_COLUMNS = ["A", "B", "C", "D", "E", "F"];

// small component for each seat cell
const SeatButton: FC<{
  seat: Seat;
  onToggle: (seat: Seat) => void;
}> = ({ seat, onToggle }) => {
  const cls = [styles.seat, !seat.isAvailable && styles.occupied, seat.isSelected && styles.selected].filter(Boolean).join(" ");
  return (
    <div className={cls} onClick={() => seat.isAvailable && onToggle(seat)}>
      {seat.column}
    </div>
  );
};

export const ModalSelectSeat: FC<Props> = ({ rows = 30, columns = DEFAULT_COLUMNS, onClose, onConfirm }) => {
  // generate initial seat list only once
  const initialSeats = useMemo(() => {
    const list: Seat[] = [];
    for (let r = 1; r <= rows; r++) {
      for (const c of columns) {
        list.push({
          row: r,
          column: c,
          isSelected: false,
          isAvailable: Math.random() > 0.1,
        });
      }
    }
    return list;
  }, [rows, columns]);

  const [seats, setSeats] = useState<Seat[]>(initialSeats);

  // toggle a seat's selected state
  const handleToggle = useCallback((target: Seat) => {
    setSeats((prev) => prev.map((s) => (s.row === target.row && s.column === target.column ? { ...s, isSelected: !s.isSelected } : s)));
  }, []);

  // gather selected seats once on confirm
  const handleConfirm = useCallback(() => {
    onConfirm(seats.filter((s) => s.isSelected));
  }, [onConfirm, seats]);

  // optional: reset when modal re-opens
  useEffect(() => {
    setSeats(initialSeats);
  }, [initialSeats]);

  // render rows
  const grid = useMemo(() => {
    return Array.from({ length: rows }, (_, i) => i + 1).map((rowNum) => {
      const rowSeats = seats.filter((s) => s.row === rowNum);
      return (
        <div key={rowNum} className={styles.row}>
          <div className={styles.rowLabel}>{rowNum}</div>
          {rowSeats.map((seat) => (
            <SeatButton key={`${seat.row}-${seat.column}`} seat={seat} onToggle={handleToggle} />
          ))}
        </div>
      );
    });
  }, [rows, seats, handleToggle]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Selecione seu(s) assento(s)</h2>
        <div className={styles.grid}>{grid}</div>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancel}>
            Cancelar
          </button>
          <button onClick={handleConfirm} className={styles.confirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectSeat;
