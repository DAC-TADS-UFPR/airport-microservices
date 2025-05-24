package br.com.tads.dac.flightservice.infraestructure.config;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;


@Configuration
public class RabbitMQConfig {

    public static final String FLIGHT_EXCHANGE = "flight.exchange";
    public static final String UPDATE_SEATS_QUEUE = "flight.update.poltronas.queue";
    public static final String FLIGHT_ROUTING_KEY = "flight.update.poltronas";
    
    @Bean
    public TopicExchange flightExchange() {
         return new TopicExchange(FLIGHT_EXCHANGE);
    }

    @Bean
    public Queue updatePoltronasQueue() {
        return QueueBuilder.durable(UPDATE_SEATS_QUEUE).build();
    }

    @Bean
    public Binding updatePoltronasBinding() {
        return BindingBuilder
            .bind(updatePoltronasQueue())
            .to(flightExchange())
            .with(FLIGHT_ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
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
