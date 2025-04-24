import "./ManageStaff.scss";
import { FC, useState } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ModalNewEmployee from "../ModalNewEmployee/ModalNewEmployee";

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
  {
    name: "Maria Bonita",
    cpf: "124.034.782-00",
    email: "maria.bonita@example.com",
    telefone: "(11) 99889-5676",
    active: true,
  },
  {
    name: "Gerivaldo Junior",
    cpf: "946.104.334-00",
    email: "gerivaldo.junior@example.com",
    telefone: "(41) 99878-2467",
    active: false,
  },
  {
    name: "Carlão da massa",
    cpf: "786.735.123-00",
    email: "carlao.massa@example.com",
    telefone: "(31) 98885-4467",
    active: false,
  },
];

const ManageStaff: FC<ManageStaffProps> = ({}) => {
  const { openModal } = useModal();
  const [showActive, setShowActive] = useState(true);

  const handleNewMember = () => {
    openModal({
      headerName: "Adicionar novo funcionário",
      children: <ModalNewEmployee/>,
    });
  };

  const filteredData = mockedData.filter(
    (member) => member.active === showActive
  );

  return (
    <div className="manageStaff">
      <div className="manageStaff__header">
        <div className="manageStaff__title">Gerenciar equipe</div>
        <div className="manageStaff__headerActions">
          <ButtonDefault
            children="Adicionar funcionário"
            style={{ width: "auto" }}
            onClick={handleNewMember}
          />
          <ButtonDefault
            children={showActive ? "Ver inativos" : "Ver ativos"}
            style={{
              width: "auto",
              backgroundColor: "#E0E0E0",
              color: "#000",
            }}
            onClick={() => setShowActive((prev) => !prev)}
          />
        </div>
      </div>
      <div className="manageStaff__content">
        {filteredData && filteredData.length > 0 ? (
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
              {filteredData.map((member, index) => (
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
          <p>
            Nenhum funcionário {showActive ? "ativo" : "inativo"} encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageStaff;
