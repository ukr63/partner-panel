<?php

namespace App\Repository;

use App\Entity\Tracker;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Connection;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Tracker>
 */
class TrackerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, private Connection $connection)
    {
        parent::__construct($registry, Tracker::class);
    }

    //    /**
    //     * @return Tracker[] Returns an array of Tracker objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('t.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Tracker
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

    public function save(Tracker $country, bool $flush = true): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($country);

        if ($flush) {
            $entityManager->flush();
        }
    }

    public function countByUserId(int $userId): int
    {
        return $this->createQueryBuilder('t')
            ->select('COUNT(t.id) as totalCount') // Calculate the count
            ->innerJoin('t.stream', 's') // Perform the INNER JOIN with the stream table
            ->where('s.user = :userId') // Add the where clause for user ID
            ->setParameter('userId', $userId) // Bind the user ID parameter
            ->getQuery()
            ->getSingleScalarResult(); // Get the result as a single scalar value
    }

    public function getRecordsByDateLast30Days(int $userId): array
    {
        $sql = "
            SELECT DATE(t.date) AS recordDate, COUNT(t.id) AS totalCount
            FROM tracker t
            INNER JOIN stream s ON s.id = t.stream_id
            WHERE s.user_id = :user_id
              AND t.date >= DATETIME('now', '-30 days')
              AND t.date <= DATETIME('now')
            GROUP BY DATE(t.date)
            ORDER BY recordDate ASC
        ";

        // Execute the query with the parameters
        return $this->connection->fetchAllAssociative($sql, [
            'user_id' => $userId,
        ]);
    }

}
