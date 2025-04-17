import "./ManageStaff.scss";
import { FC } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface ManageStaffProps {
  data?: any;
}

const mockedData = [
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

const ManageStaff: FC<ManageStaffProps> = ({}) => {
  const { openModal } = useModal();

  const handleNewMember = () => {
    openModal({
      headerName: "Adicionar novo funcionário",
      children: <></>,
    });
  };

  return (
    <div className="manageStaff">
      <div className="manageStaff__header">
        <div className="manageStaff__title">Gerenciar equipe</div>
        <ButtonDefault children="Adicionar funcionário" style={{ width: "auto" }} onClick={handleNewMember} />
      </div>
      <div className="manageStaff__content">
        {mockedData && mockedData.length > 0 ? (
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
              {[...mockedData].map((member, index) => (
                <tr key={index}>
                  <td>{member?.name}</td>
                  <td>{member?.cpf}</td>
                  <td>{member?.email}</td>
                  <td>{member?.telefone}</td>
                  <td></td>
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
