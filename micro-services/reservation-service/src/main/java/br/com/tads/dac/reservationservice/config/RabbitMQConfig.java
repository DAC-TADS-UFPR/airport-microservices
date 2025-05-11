package br.com.tads.dac.reservationservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "reservation.exchange";
    public static final String COMMAND_QUEUE = "reservation.command.queue";
    public static final String QUERY_QUEUE = "reservation.query.queue";
    public static final String ROUTING_KEY = "reservation.created";

    @Bean
    public TopicExchange reservationExchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue commandQueue() {
        return QueueBuilder.durable(COMMAND_QUEUE).build();
    }

    @Bean
    public Queue queryQueue() {
        return QueueBuilder.durable(QUERY_QUEUE).build();
    }

    @Bean
    public Binding commandBinding(Queue commandQueue, TopicExchange reservationExchange) {
        return BindingBuilder.bind(commandQueue)
                .to(reservationExchange)
                .with(ROUTING_KEY);
    }

    @Bean
    public Binding queryBinding(Queue queryQueue, TopicExchange reservationExchange) {
        return BindingBuilder.bind(queryQueue)
                .to(reservationExchange)
                .with(ROUTING_KEY);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        return new RabbitTemplate(connectionFactory);
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        return factory;
    }
}