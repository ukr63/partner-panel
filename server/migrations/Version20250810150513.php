<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250810150513 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE country (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, country VARCHAR(255) NOT NULL, code VARCHAR(8) DEFAULT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5373C9665373C966 ON country (country)');
        $this->addSql('CREATE TABLE partner (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, image_url VARCHAR(500) DEFAULT NULL, is_active BOOLEAN DEFAULT NULL, description CLOB DEFAULT NULL, referal_link CLOB DEFAULT NULL, available_geos CLOB DEFAULT NULL)');
        $this->addSql('CREATE TABLE stream (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, stream_id VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL --(DC2Type:datetime_immutable)
        , name VARCHAR(255) DEFAULT NULL, CONSTRAINT FK_F0E9BE1CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_F0E9BE1CA76ED395 ON stream (user_id)');
        $this->addSql('CREATE TABLE tracker (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, geo_id INTEGER DEFAULT NULL, stream_id INTEGER DEFAULT NULL, sub1 CLOB DEFAULT NULL, sub2 CLOB DEFAULT NULL, sub3 CLOB DEFAULT NULL, sub4 CLOB DEFAULT NULL, sub5 CLOB DEFAULT NULL, ip VARCHAR(255) DEFAULT NULL, user_agent VARCHAR(700) DEFAULT NULL, http_referer CLOB DEFAULT NULL, date DATETIME DEFAULT NULL, url CLOB DEFAULT NULL, CONSTRAINT FK_AC632AAFFA49D0B FOREIGN KEY (geo_id) REFERENCES country (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_AC632AAFD0ED463E FOREIGN KEY (stream_id) REFERENCES stream (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_AC632AAFFA49D0B ON tracker (geo_id)');
        $this->addSql('CREATE INDEX IDX_AC632AAFD0ED463E ON tracker (stream_id)');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL, token VARCHAR(255) DEFAULT NULL, full_name VARCHAR(255) DEFAULT NULL, is_active BOOLEAN DEFAULT 1 NOT NULL, is_admin BOOLEAN DEFAULT 0 NOT NULL, password VARCHAR(255) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        )');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON user (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE country');
        $this->addSql('DROP TABLE partner');
        $this->addSql('DROP TABLE stream');
        $this->addSql('DROP TABLE tracker');
        $this->addSql('DROP TABLE user');
    }
}
