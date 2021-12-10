create table users
(
	id serial,
	user_name varchar(255) not null,
	password varchar(255) not null
);

create unique index users_id_uindex
	on users (id);

create unique index users_user_name_uindex
	on users (user_name);

alter table users
	add constraint users_pk
		primary key (id);