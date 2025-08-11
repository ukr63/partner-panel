<?php

namespace App\Repository;

use App\Entity\Country;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Country>
 */
class CountryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Country::class);
    }

//    /**
//     * @return Country[] Returns an array of Country objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

    public function getCountry($value): ?Country
    {
        return $this->createQueryBuilder('c')
            ->andWhere('LOWER(c.country) LIKE LOWER(:val)')
            ->setParameter('val', '%' . strtolower($value) . '%')
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function save(Country $country, bool $flush = true): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($country);

        if ($flush) {
            $entityManager->flush();
        }
    }

    public function add(string $country): void
    {
        $entity = $this->getCountry($country);

        if ($entity) {
            return;
        }

        $country = new Country();
        $country->setCountry($country);
        $this->save($country);
    }
}
