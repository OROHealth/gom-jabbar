CREATE TABLE "caribou" (
    "id" serial NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "img" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    CONSTRAINT "caribou_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "inbox" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "sender_id" integer NOT NULL,
    "seen" BOOLEAN NOT NULL,
    CONSTRAINT "inbox_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "chat" (
    "id" serial NOT NULL,
    "sender_id" integer NOT NULL,
    "reciever_id" integer NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "file" VARCHAR(255),
    "meta" VARCHAR(255),
    CONSTRAINT "chat_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "human" (
    "id" serial NOT NULL,
    "trashing_level" integer NOT NULL,
    "excitment_level" integer NOT NULL,
    "lat" integer NOT NULL,
    "lng" integer NOT NULL,
    CONSTRAINT "human_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

ALTER TABLE "inbox"
ADD CONSTRAINT "inbox_fk0" FOREIGN KEY ("user_id") REFERENCES "caribou"("id");
ALTER TABLE "inbox"
ADD CONSTRAINT "inbox_fk1" FOREIGN KEY ("sender_id") REFERENCES "caribou"("id");
ALTER TABLE "chat"
ADD CONSTRAINT "chat_fk0" FOREIGN KEY ("sender_id") REFERENCES "caribou"("id");
ALTER TABLE "chat"
ADD CONSTRAINT "chat_fk1" FOREIGN KEY ("reciever_id") REFERENCES "caribou"("id");