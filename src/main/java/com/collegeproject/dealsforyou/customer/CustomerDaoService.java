package com.collegeproject.dealsforyou.customer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres")
public class CustomerDaoService implements CustomerDao {

    private final JdbcTemplate jdbcTemplate;

    public CustomerDaoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertCustomer(UUID id, String firstName, String lastName, String email, String password, Role role_user) {
        String sql = "INSERT INTO customer id, firstName, lastName, email, password, role_user VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, id, firstName, lastName, email, password, role_user);
    }

    @Override
    public int insertCustomer(Customer customer) {
        System.out.println(customer.getRole());
        UUID id = customer.getId() == null ? UUID.randomUUID() : customer.getId();
        return insertCustomer(id, customer.getFirstName(), customer.getLastName(), customer.getEmail(),
                customer.getPassword(), customer.getRole());
    }

    @Override
    public List<Customer> getAllCustomers() {
        String sql = "SELECT * FROM customer";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            UUID id = UUID.fromString(resultSet.getString("id"));
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String password = resultSet.getString("password");
            Role role = Role.valueOf(resultSet.getString("role"));
            return new Customer(id, firstName, lastName, email, password, role);
        });
    }

    @Override
    public UUID getIdFromEmail(String email) {
        final String sql = "SELECT id FROM customer WHERE email = ?";
        return jdbcTemplate
                .queryForObject(sql, new Object[]{email}, (resultSet, i) ->
                        UUID.fromString(resultSet.getString("id")));
    }

    @Override
    public Optional<Customer> getCustomerById(UUID id) {
        final String sql = "SELECT * FROM customer WHERE id = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, new Object[]{id}, (resultSet, i) -> {
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String password = resultSet.getString("password");
            Role role = Role.valueOf(resultSet.getString("role"));
            return new Customer(id, firstName, lastName, email, password, role);
        }));
    }



}
