package br.com.tads.dac.clienteservice.connections;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.AmqpAdmin;
import br.com.tads.dac.clienteservice.constants.RabbitMQConstants;

@Component
public class RabbitMQConnection {

    private static final String NOME_EXCHANGE = "amq.direct";

    private final AmqpAdmin amqpAdmin;

    public RabbitMQConnection(AmqpAdmin amqpAdmin) {
        this.amqpAdmin = amqpAdmin;
    }

    private Queue fila(String nomeFila) {
        return new Queue(nomeFila, true, false, false);
    }

    private DirectExchange trocaDireta() {
        return new DirectExchange(NOME_EXCHANGE);
    }

    private Binding relacionamento(Queue fila, DirectExchange troca) {
        return new Binding(fila.getName(), Binding.DestinationType.QUEUE, troca.getName(), fila.getName(), null);
    }

    @PostConstruct
    private void configurarFilas() {
        Queue filaClient = this.fila(RabbitMQConstants.FILA_CLIENT);
        DirectExchange troca = this.trocaDireta();
        Binding ligacaoClient = this.relacionamento(filaClient, troca);

        this.amqpAdmin.declareQueue(filaClient);
        this.amqpAdmin.declareExchange(troca);
        this.amqpAdmin.declareBinding(ligacaoClient);
    }
}
