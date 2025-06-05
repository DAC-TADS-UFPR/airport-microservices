package br.com.tads.dac.reservationservice.config;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;

import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import jakarta.persistence.EntityManagerFactory;

@Configuration
@EnableTransactionManagement
public class DataSourceConfig {

  @Bean
  @ConfigurationProperties("spring.datasource.command")
  public DataSource commandDataSource() { 
    return DataSourceBuilder.create().build();
  }

  @Bean
  @ConfigurationProperties("spring.datasource.query")
  public DataSource queryDataSource() { 
       return DataSourceBuilder.create().build();
 }

  @Bean
  public LocalContainerEntityManagerFactoryBean
      commandEntityManagerFactory(EntityManagerFactoryBuilder b) {
    return b
      .dataSource(commandDataSource())
      .packages("br.com.tads.dac.reservationservice.command.domain")
      .persistenceUnit("commandPU")
      .build();
  }

  @Bean
  public LocalContainerEntityManagerFactoryBean
      queryEntityManagerFactory(EntityManagerFactoryBuilder b) {
    return b
      .dataSource(queryDataSource())
      .packages("br.com.tads.dac.reservationservice.query.domain")
      .persistenceUnit("queryPU")
      .build();
  }

  @Bean
  public PlatformTransactionManager
      commandTransactionManager(EntityManagerFactory emf) {
    return new JpaTransactionManager(emf);
  }

  @Bean
  public PlatformTransactionManager
      queryTransactionManager(EntityManagerFactory emf) {
    return new JpaTransactionManager(emf);
  }
}