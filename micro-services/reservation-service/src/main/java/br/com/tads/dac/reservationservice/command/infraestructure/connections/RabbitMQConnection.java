package br.com.tads.dac.reservationservice.command.infraestructure.connections;

import jakarta.annotation.PostConstruct;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.stereotype.Component;

import br.com.tads.dac.reservationservice.command.infraestructure.constants.RabbitMQConstants;

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
        Queue fila = this.fila(RabbitMQConstants.FILA_RESERVATION);

        DirectExchange troca = this.trocaDireta();

        Binding ligacao = this.relacionamento(fila, troca);

        // Criando as filas no RabbitMQ
        this.amqpAdmin.declareQueue(fila);

        // Criando as exchanges no RabbitMQ, nesse caso já existe no RabbitMQ
        this.amqpAdmin.declareExchange(troca);

        this.amqpAdmin.declareBinding(ligacao);

    }

}
