create database dm112_db;

drop table deliveries;

drop table orders;

create table if not exists orders(
    id serial primary key not null,
    cpf char(11) not null,
    value smallint not null check(value >= 0),
    status smallint default 0 check(
        status >= 0
        and status <= 2
    ),
    orderDate timestamp default current_timestamp,
    issueDate timestamp default null,
    paymentDate timestamp default null
);

create table if not exists deliveries(
    id serial primary key not null unique,
    order_id int unique,
    receiver_cpf char(11) default null,
    status smallint default 0 check(
        status >= 0
        and status <= 2
    ),
    startDate timestamp default null,
    endDate timestamp default null,
    foreign key(order_id) references orders (id)
);

/* Para simular a criação de pedidos */
insert into
    orders (
        cpf,
        value,
        status,
        orderDate,
        issueDate,
        paymentDate
    )
values
    (
        '11111111111',
        5000,
        2,
        current_timestamp,
        current_timestamp,
        current_timestamp
    );

/* Para simular a criação de entregas */
insert into
    deliveries (order_id)
values
    (5);