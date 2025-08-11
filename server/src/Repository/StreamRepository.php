<?php

namespace App\Repository;

use App\Entity\Stream;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Stream>
 */
class StreamRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Stream::class);
    }

    //    /**
    //     * @return Stream[] Returns an array of Stream objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('s.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Stream
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }


    public function save(Stream $country, bool $flush = true): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($country);

        if ($flush) {
            $entityManager->flush();
        }
    }

    public function getAllPromosByUserId(int $userId)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.user = :userId')
            ->setParameter('userId', $userId)
            ->orderBy('s.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function getByStreamId(string $streamId): ?Stream
    {
        return $this->createQueryBuilder('s')
                ->andWhere('s.stream_id = :val')
                ->setParameter('val', $streamId)
                ->getQuery()
                ->getOneOrNullResult()
            ;
    }
}
