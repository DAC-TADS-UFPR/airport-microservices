package br.com.tads.dac.employee_service.connections;

import br.com.tads.dac.employee_service.constants.RabbitMQConstants;
import jakarta.annotation.PostConstruct;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.stereotype.Component;
import org.springframework.amqp.core.AmqpAdmin;

@Component
public class RabbitMQConnection {

    private static final String NOME_EXCHANGE = "amq.direct";
    private AmqpAdmin amqpAdmin;

    // Conecta o rabbitmq e cria as filas
    public RabbitMQConnection(AmqpAdmin amqpAdmin) {
        this.amqpAdmin = amqpAdmin;
    }

    private Queue fila(String nomeFila) {
        return new Queue(nomeFila,true,false,false);
    }

    private DirectExchange trocaDireta() {
        return new DirectExchange(NOME_EXCHANGE);
    }

    private Binding relacionamento(Queue fila, DirectExchange troca) {
        return new Binding(fila.getName(),Binding.DestinationType.QUEUE,troca.getName(),fila.getName(),null);
    }

    // Assim que nossa classe for constuida, ele executa o que está no método
    @PostConstruct
    private void adiciona() {
        Queue filaEmployee = this.fila(RabbitMQConstants.FILA_EMPLOYEE);

        DirectExchange troca = this.trocaDireta();

        Binding ligacaoEmployee = this.relacionamento(filaEmployee, troca);

        // Criando as filas no RabbitMQ
        this.amqpAdmin.declareQueue(filaEmployee);

        // Criando as exchanges no RabbitMQ, nesse caso já existe no RabbitMQ
        this.amqpAdmin.declareExchange(troca);

        this.amqpAdmin.declareBinding(ligacaoEmployee);

    }

}
