CREATE TABLE "caribou" (
    "id" serial NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "img" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "antler_exchange_status" BOOLEAN DEFAULT false,
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
INSERT INTO caribou ("email", "password", "name")
VALUES (
        'georgecari@gmail.com',
        'verysecurepassword',
        'George'
    ),
    (
        'caribou-orgcarib@ihch.com',
        'verysecurepassword',
        'Oliver'
    ),
    (
        'humanavoider1234-carib@yahoo.com',
        'verysecurepassword',
        'Benjamin'
    ),
    (
        'humanhunter-carib@cahaap.ca',
        'verysecurepassword',
        'Hunter'
    ),
    (
        'tester@gmail.com',
        'verysecurepassword',
        'Tester'
    );
INSERT INTO human (
        "trashing_level",
        "excitment_level",
        "lat",
        "lng"
    )
VALUES (1, 1, 45.49857063606833, -73.59814206567297),
    (1, 1, 45.498100032138424, -73.59776274401594),
    (4, 4, 45.4985227782212, -73.59676512805792),
    (3, 5, 45.498982743624154, -73.59687892455503),
    (2, 6, 45.49967434412355, -73.58481542575836),
    (1, 1, 45.508042652399844, -73.58778503299945);
