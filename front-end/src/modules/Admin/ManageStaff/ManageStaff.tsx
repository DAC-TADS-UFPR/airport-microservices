import "./ManageStaff.scss";
import { FC, useState } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ModalAddStaff from "../ModalAddStaff/ModalAddStaff";

interface StaffMember {
  name: string;
  cpf: string;
  email: string;
  telefone: string;
  active: boolean;
}

interface ManageStaffProps {
  data?: StaffMember[];
}

const mockedData: StaffMember[] = [
  {
    name: "João Silva",
    cpf: "123.456.789-00",
    email: "joao.silva@example.com",
    telefone: "(11) 91234-5678",
    active: true,
  },
  {
    name: "Maria Souza",
    cpf: "987.654.321-00",
    email: "maria.souza@example.com",
    telefone: "(21) 99876-5432",
    active: false,
  },
  {
    name: "Pedro Oliveira",
    cpf: "456.789.123-00",
    email: "pedro.oliveira@example.com",
    telefone: "(31) 98765-4221",
    active: true,
  },
];

const ManageStaff: FC<ManageStaffProps> = ({ data }) => {
  const { openModal } = useModal();

  // Initialize state with incoming prop or fallback to mockedData
  const [staff, setStaff] = useState<StaffMember[]>(data ?? mockedData);

  const handleNewMember = () => {
    openModal({
      headerName: "Adicionar novo funcionário",
      children: <ModalAddStaff />,
    });
  };

  // Toggle a member’s active flag by CPF
  const handleToggleActive = (cpf: string) => {
    setStaff((prev) => prev.map((m) => (m.cpf === cpf ? { ...m, active: !m.active } : m)));
  };

  // Filter into two arrays
  const activeMembers = staff.filter((m) => m.active);
  const inactiveMembers = staff.filter((m) => !m.active);

  return (
    <div className="manageStaff">
      {/* ACTIVE */}
      <div className="manageStaff__header">
        <div className="manageStaff__title">Gerenciar equipe</div>
        <ButtonDefault children="Adicionar funcionário" style={{ width: "auto" }} onClick={handleNewMember} />
      </div>
      <div className="manageStaff__content">
        {activeMembers.length > 0 ? (
          <table className="manageStaff__table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {activeMembers.map((member) => (
                <tr key={member.cpf}>
                  <td>{member.name}</td>
                  <td>{member.cpf}</td>
                  <td>{member.email}</td>
                  <td>{member.telefone}</td>
                  <td className="manageStaff__actions">
                    <ButtonDefault children="Editar" style={{ width: "auto" }} onClick={handleNewMember} />
                    <ButtonDefault children="Inativar" style={{ width: "auto" }} color="red" onClick={() => handleToggleActive(member.cpf)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum histórico disponível.</p>
        )}
      </div>

      {/* INACTIVE */}
      <div className="manageStaff__header">
        <div className="manageStaff__title">Equipe inativa</div>
      </div>
      <div className="manageStaff__content">
        {inactiveMembers.length > 0 ? (
          <table className="manageStaff__table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {inactiveMembers.map((member) => (
                <tr key={member.cpf}>
                  <td>{member.name}</td>
                  <td>{member.cpf}</td>
                  <td>{member.email}</td>
                  <td>{member.telefone}</td>
                  <td className="manageStaff__actions">
                    <ButtonDefault children="Ativar" style={{ width: "auto" }} onClick={() => handleToggleActive(member.cpf)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum histórico disponível.</p>
        )}
      </div>
    </div>
  );
};

export default ManageStaff;
