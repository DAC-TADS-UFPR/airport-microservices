import "./ModalSelectSeat.css";
import React, { useState } from "react";

interface Seat {
  row: number;
  column: string;
  isSelected: boolean;
  isAvailable: boolean;
}

interface ModalSelectSeatProps {
  rows?: number;
  columns?: string[];
  onClose: () => void;
  onConfirm: (selectedSeats: Seat[]) => void;
}

const defaultColumns = ["A", "B", "C", "D", "E", "F"];

export const ModalSelectSeat: React.FC<ModalSelectSeatProps> = ({ rows = 30, columns = defaultColumns, onClose, onConfirm }) => {
  const [seats, setSeats] = useState<Seat[]>(() => {
    const list: Seat[] = [];
    for (let r = 1; r <= rows; r++) {
      for (const c of columns) {
        list.push({
          row: r,
          column: c,
          isSelected: false,
          isAvailable: Math.random() > 0.1, // 10% chance occupied
        });
      }
    }
    return list;
  });

  const toggleSeat = (row: number, column: string) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.row === row && s.column === column && s.isAvailable) {
          return { ...s, isSelected: !s.isSelected };
        }
        return s;
      })
    );
  };

  const handleConfirm = () => {
    const selected = seats.filter((s) => s.isSelected);
    onConfirm(selected);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Selecione seu(s) assento(s)</h2>
        <div className="seats-grid">
          {Array.from({ length: rows }, (_, i) => i + 1).map((r) => (
            <div key={r} className="seat-row">
              <span className="row-label">{r}</span>
              {columns.map((c) => {
                const seat = seats.find((s) => s.row === r && s.column === c)!;
                const classNames = ["seat", !seat.isAvailable && "seat-occupied", seat.isSelected && "seat-selected"].filter(Boolean).join(" ");
                return (
                  <div key={`${r}-${c}`} className={classNames} onClick={() => toggleSeat(r, c)}>
                    {c}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-confirm" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectSeat;
