create table "user"
(
	id serial,
	user_name varchar(255) not null,
	password varchar(255) not null
);

create unique index users_id_uindex
	on "user" (id);

create unique index users_user_name_uindex
	on "user" (user_name);

alter table "user"
	add constraint users_pk
		primary key (id);