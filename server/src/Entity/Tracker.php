<?php

namespace App\Entity;

use App\Repository\TrackerRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TrackerRepository::class)]
class Tracker
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $sub1 = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $sub2 = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $sub3 = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $sub4 = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $sub5 = null;

    #[ORM\ManyToOne(targetEntity: Country::class)]
    private ?Country $geo = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $ip = null;

    #[ORM\Column(length: 700, nullable: true)]
    private ?string $user_agent = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $http_referer = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $date = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $url = null;

    #[ORM\ManyToOne(targetEntity: Stream::class)]
    private ?Stream $stream = null;

    public function setStream(?Stream $stream): static
    {
        $this->stream = $stream;

        return $this;
    }

    public function getStream(): ?Stream
    {
        return $this->stream;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSub1(): ?string
    {
        return $this->sub1;
    }

    public function setSub1(?string $sub1): static
    {
        $this->sub1 = $sub1;

        return $this;
    }

    public function getSub2(): ?string
    {
        return $this->sub2;
    }

    public function setSub2(?string $sub2): static
    {
        $this->sub2 = $sub2;

        return $this;
    }

    public function getSub3(): ?string
    {
        return $this->sub3;
    }

    public function setSub3(?string $sub3): static
    {
        $this->sub3 = $sub3;

        return $this;
    }


    public function getSub4(): ?string
    {
        return $this->sub4;
    }

    public function setSub4(?string $sub4): static
    {
        $this->sub4 = $sub4;

        return $this;
    }


    public function getSub5(): ?string
    {
        return $this->sub5;
    }

    public function setSub5(?string $sub5): static
    {
        $this->sub5 = $sub5;

        return $this;
    }

    public function getGeo(): ?Country
    {
        return $this->geo;
    }

    public function setGeo(?Country $geo): static
    {
        $this->geo = $geo;

        return $this;
    }

    public function getIp(): ?string
    {
        return $this->ip;
    }

    public function setIp(?string $ip): static
    {
        $this->ip = $ip;

        return $this;
    }

    public function getUserAgent(): ?string
    {
        return $this->user_agent;
    }

    public function setUserAgent(?string $user_agent): static
    {
        $this->user_agent = $user_agent;

        return $this;
    }

    public function getHttpReferer(): ?string
    {
        return $this->http_referer;
    }

    public function setHttpReferer(?string $http_referer): static
    {
        $this->http_referer = $http_referer;

        return $this;
    }

    public function getDate(): ?\DateTime
    {
        return $this->date;
    }

    public function setDate(?\DateTime $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): static
    {
        $this->url = $url;

        return $this;
    }
}
