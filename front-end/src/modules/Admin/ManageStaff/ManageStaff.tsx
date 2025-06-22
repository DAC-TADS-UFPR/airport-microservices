import "./ManageStaff.scss";
import { FC, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee, getEmployee } from "@/data/config/employee";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ModalAddStaff from "../ModalAddStaff/ModalAddStaff";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface StaffMember {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  active: boolean;
}

interface ManageStaffProps {
  data?: StaffMember[];
}

const ManageStaff: FC<ManageStaffProps> = () => {
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const [currentCpf, setCurrentCpf] = useState<string | null>(null);

  const handleNewMember = (funcionario?: any) => {
    openModal({
      headerName: "Adicionar novo funcionário",
      children: <ModalAddStaff data={funcionario} />,
    });
  };

  var { data: staffMembers = [], isLoading } = useQuery<StaffMember[]>({
    queryKey: ["staffMembers"],
    queryFn: getEmployee,
    refetchOnWindowFocus: false,
  });

  // Order by name
  const sortedStaffMembers = [...staffMembers].sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  const { mutateAsync: deleteEmployeeMutation } = useMutation({
    mutationKey: ["deleteEmployee"],
    mutationFn: (cpf: string) => deleteEmployee(cpf),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffMembers"] });
      setCurrentCpf(null);
    },
    onError: (error: any) => {
      console.error("Error deleting employee:", error);
    },
  });

  const handleDelete = async (cpf: string) => {
    setCurrentCpf(cpf);
    await deleteEmployeeMutation(cpf);
  };

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
        </div>
      </div>
      <div className="manageStaff__content">
        {isLoading ? (
          <p>Carregando...</p>
        ) : sortedStaffMembers.length > 0 ? (
          <table>
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
              {sortedStaffMembers.map((member) => (
                <tr key={member.cpf}>
                  <td>{member.nome}</td>
                  <td>{member.cpf}</td>
                  <td>{member.email}</td>
                  <td>{member.telefone}</td>
                  <td className="manageStaff__actions">
                    <ButtonDefault
                      children="Editar"
                      style={{ width: "auto" }}
                      onClick={() => handleNewMember(member)}
                    />
                    <ButtonDefault
                      children="Inativar"
                      style={{ width: "auto" }}
                      color="red"
                      onClick={() => handleDelete(member.cpf)}
                    />
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