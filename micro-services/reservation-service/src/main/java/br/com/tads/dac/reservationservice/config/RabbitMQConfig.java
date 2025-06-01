package br.com.tads.dac.reservationservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "reservation.exchange";
    public static final String FLIGHT_EXCHANGE = "flight.exchange";
    public static final String CLIENT_EXCHANGE = "client.exchange";

    public static final String COMMAND_QUEUE = "reservation.command.queue";
    
    public static final String QUERY_QUEUE = "reservation.query.queue";
    public static final String ROUTING_KEY = "reservation.created";
    
    public static final String FLIGHT_ROUTING_KEY = "flight.update.poltronas";
    public static final String CLIENT_ROUTING_KEY = "client.update.miles";
    
    public static final String RESERVATION_STATE_ROUTING_KEY = "reservation.update.state";
    public static final String RESERVATION_STATE_QUEUE = "reservation.update.state.queue";


        
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
    public Queue updateReservationStateQueue() {
        return QueueBuilder.durable(RESERVATION_STATE_QUEUE).build();
    }

    @Bean
    public Binding updateReservationStateBinding() {
        return BindingBuilder
            .bind(updateReservationStateQueue())
            .to(reservationExchange())
            .with(RESERVATION_STATE_ROUTING_KEY);
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
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
                                         Jackson2JsonMessageConverter converter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(converter);
        return template;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory,
            Jackson2JsonMessageConverter converter) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(converter);
        return factory;
    }
}
