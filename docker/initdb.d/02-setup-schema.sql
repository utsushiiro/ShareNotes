create table users (
    id integer not null auto_increment,
    name varchar(255) not null,
    password varchar(255) not null,
    role varchar(2) not null,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id)
);

create table notes (
    id integer not null auto_increment,
    title text not null,
    content text not null,
    user_id integer not null,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    foreign key (user_id) references users (id)
);
