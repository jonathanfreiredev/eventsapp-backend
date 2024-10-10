import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDatabase1728553634357 implements MigrationInterface {
  name = 'InitialDatabase1728553634357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "street" character varying(250) NOT NULL DEFAULT '', "city" character varying(30) NOT NULL DEFAULT '', "zip" character varying(100) NOT NULL DEFAULT '', "country" character varying(100) NOT NULL DEFAULT '', CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "events_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "event_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_f6ad737a972a2a53c357d968689" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "replies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "content" character varying NOT NULL, "comment_id" uuid, "replied_by" uuid, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "content" character varying NOT NULL, "commented_by" uuid, "event_id" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_category_enum" AS ENUM('Music', 'Sports', 'Workshop', 'Art', 'Food & Drink', 'Business', 'Languages', 'Festival', 'Travel', 'Outdoors', 'Social')`,
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "capacity" integer NOT NULL, "category" "public"."events_category_enum" NOT NULL, "address_id" uuid, "organiser_id" uuid, CONSTRAINT "REL_ccc95d911d2b1e4ea171923893" UNIQUE ("address_id"), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_favourite_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "event_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_e7799b05922e7e6854b4d3fca74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_participants" ADD CONSTRAINT "FK_829db3436991bb6fbb52f71fea0" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_participants" ADD CONSTRAINT "FK_91d10b59b894d31640fe70cee14" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "replies" ADD CONSTRAINT "FK_6a0cb640778c01be0d360c8f00d" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "replies" ADD CONSTRAINT "FK_01a31c59aaa15cacfdd0a0774fa" FOREIGN KEY ("replied_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_774ba1d88b70935793ca5ebb6e5" FOREIGN KEY ("commented_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_acb7ccd75fdad8ca158e1360a13" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_ccc95d911d2b1e4ea171923893d" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_cb951fb6dfdc6eba1b67d8f06cb" FOREIGN KEY ("organiser_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favourite_events" ADD CONSTRAINT "FK_759947e02b5bb107031670574da" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favourite_events" ADD CONSTRAINT "FK_384a3770322c4d6a159457a81ab" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_favourite_events" DROP CONSTRAINT "FK_384a3770322c4d6a159457a81ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favourite_events" DROP CONSTRAINT "FK_759947e02b5bb107031670574da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_cb951fb6dfdc6eba1b67d8f06cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_ccc95d911d2b1e4ea171923893d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_acb7ccd75fdad8ca158e1360a13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_774ba1d88b70935793ca5ebb6e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "replies" DROP CONSTRAINT "FK_01a31c59aaa15cacfdd0a0774fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "replies" DROP CONSTRAINT "FK_6a0cb640778c01be0d360c8f00d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_participants" DROP CONSTRAINT "FK_91d10b59b894d31640fe70cee14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_participants" DROP CONSTRAINT "FK_829db3436991bb6fbb52f71fea0"`,
    );
    await queryRunner.query(`DROP TABLE "users_favourite_events"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TYPE "public"."events_category_enum"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "replies"`);
    await queryRunner.query(`DROP TABLE "events_participants"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
  }
}
