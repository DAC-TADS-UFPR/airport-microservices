// ModalEditInfo.tsx
import "./ModalEditInfo.scss";
import { FC, useState, useEffect, FormEvent } from "react";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface ModalEditInfoProps {
  show: boolean;
  data?: UserInfo;
  onClose: () => void;
  onSave: (updated: UserInfo) => void;
}

const ModalEditInfo: FC<ModalEditInfoProps> = ({ show, data, onClose, onSave }) => {
  const [form, setForm] = useState<UserInfo>({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <h3>Editar informação do usuário</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </header>
        <form className="modal-body" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Phone
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
          </label>
          <footer className="modal-footer">
            <button type="button" className="btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default ModalEditInfo;
