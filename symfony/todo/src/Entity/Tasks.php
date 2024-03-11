<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TasksRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TasksRepository::class)]
#[ApiResource]
class Tasks
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $taskid = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $day = null;

    #[ORM\Column]
    private ?bool $active = null;

    #[ORM\Column]
    private ?bool $ongoing = null;

    #[ORM\Column(length: 255)]
    private ?string $createdat = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTaskid(): ?int
    {
        return $this->taskid;
    }

    public function setTaskid(int $taskid): static
    {
        $this->taskid = $taskid;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(string $day): static
    {
        $this->day = $day;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }

    public function isOngoing(): ?bool
    {
        return $this->ongoing;
    }

    public function setOngoing(bool $ongoing): static
    {
        $this->ongoing = $ongoing;

        return $this;
    }

    public function getCreatedat(): ?string
    {
        return $this->createdat;
    }

    public function setCreatedat(string $createdat): static
    {
        $this->createdat = $createdat;

        return $this;
    }
}
