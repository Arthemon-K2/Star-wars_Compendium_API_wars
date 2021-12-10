create table "planet-votes"
(
	id serial
		constraint "planet-votes_user_id_fk"
			references "user",
	planet_id int not null,
	planet_name varchar,
	user_id int,
	submission_time time
);

create unique index "planet-votes_id_uindex"
	on "planet-votes" (id);

alter table "planet-votes"
	add constraint "planet-votes_pk"
		primary key (id);

