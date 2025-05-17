import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import "./AvailableFlightsModal.scss";
import { FC, useState } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import AvailableFlights from "../AvailableFlights/AvailableFlights"; // i
import { useRouter } from "next/navigation";


type Flight = {
  id: string;
  origem: string;
  destino: string;
  data: string;
  horaSaida: string;
  preco: number;
};

interface AvailableFlightsModalProps {
  data: Flight;
  onClose: () => void;
}

const gerarCodigoReserva = () => {
  const letras = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join("");
  const numeros = Math.floor(100 + Math.random() * 900);
  return `${letras}${numeros}`;
};

const AvailableFlightsModal: FC<AvailableFlightsModalProps> = ({ data, onClose }) => {
  const [quantidade, setQuantidade] = useState(1);
  const [milhasSaldo, setMilhasSaldo] = useState(1000);
  const [milhasUsadas, setMilhasUsadas] = useState(0);
  const milhasPorAssento = data.preco * 0.2;
  const totalMilhas = milhasPorAssento * quantidade;
  const valorTotal = data.preco * quantidade;
  const valorComMilhas = Math.max(0, valorTotal - (milhasUsadas / 0.2));

  const confirmarCompra = () => {
    const novaReserva = {
      codigo: gerarCodigoReserva(),
      vooId: data.id,
      quantidade,
      milhasUsadas,
      valorPago: valorComMilhas,
      status: "CRIADA"
    };
    console.log("Reserva criada:", novaReserva);
    setMilhasSaldo((prev) => prev - milhasUsadas);
    alert(`Reserva criada com código ${novaReserva.codigo}`);
    onClose();
  };

  return (
    <div className="availableFlightsModal">
      <h3>Detalhes do Voo</h3>
      <p><strong>Origem:</strong> {data.origem}</p>
      <p><strong>Destino:</strong> {data.destino}</p>
      <p><strong>Data:</strong> {data.data}</p>
      <p><strong>Hora Saída:</strong> {data.horaSaida}</p>
      <p><strong>Preço Unitário:</strong> R$ {data.preco.toFixed(2)}</p>
      <p><strong>Saldo de Milhas:</strong> {milhasSaldo}</p>

      <label>
        Quantidade de passagens:
        <input
          type="number"
          value={quantidade}
          min={1}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </label>

      <p><strong>Milhas necessárias:</strong> {totalMilhas}</p>

      <label>
        Milhas a usar:
        <input
          type="number"
          value={milhasUsadas}
          min={0}
          max={milhasSaldo}
          onChange={(e) => setMilhasUsadas(Number(e.target.value))}
        />
      </label>

      <p><strong>Valor a pagar:</strong> R$ {valorComMilhas.toFixed(2)}</p>

      <ButtonDefault onClick={confirmarCompra}>Confirmar Compra</ButtonDefault>
      <ButtonDefault color="red" onClick={onClose}>Cancelar</ButtonDefault>
    </div>
  );
};

export default AvailableFlightsModal;

