package br.com.tads.dac.clienteservice.infraestructure.config;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String CLIENT_EXCHANGE = "client.exchange";
    public static final String UPDATE_RESERVATION_MILES_QUEUE = "client.update.miles.queue";
    public static final String CLIENT_ROUTING_KEY = "client.update.miles";
    
    @Bean
    public TopicExchange clientExchange() {
         return new TopicExchange(CLIENT_EXCHANGE);
    }

    @Bean
    public Queue updateMilesQueue() {
        return QueueBuilder.durable(UPDATE_RESERVATION_MILES_QUEUE).build();
    }

    @Bean
    public Binding updateMilesBinding() {
        return BindingBuilder
            .bind(updateMilesQueue())
            .to(clientExchange())
            .with(CLIENT_ROUTING_KEY);
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
