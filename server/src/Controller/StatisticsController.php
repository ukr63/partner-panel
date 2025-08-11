<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Stream;
use App\Kernel\Tracker;
use App\Repository\StreamRepository;
use App\Repository\TrackerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use \Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'statistics')]
class StatisticsController extends AbstractController
{
    public function __construct(
        private StreamRepository $streamRepository,
        private TrackerRepository $trackerRepository
    ) {
    }

    #[Route('/promo/add', name: 'promo_add', methods: ['POST'])]
    public function addPromo(Request $request)
    {
        try {
            $data = json_decode($request->getContent(), true);

            $stream = new Stream();
            $stream->setStreamId(bin2hex(random_bytes(8)));
            $stream->setName($data['name']);
            $stream->setCreatedAt(new \DateTimeImmutable());
            $stream->setUser($this->getUser());
            $this->streamRepository->save($stream);

            return $this->json([
                'message' => 'Promo successfully added'
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            return $this->json([
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/promo/list', name: 'promo_list', methods: ['GET'])]
    public function getAllPromo(Request $request)
    {
        try {
            $allPromos = $this->streamRepository->getAllPromosByUserId($this->getUser()->getId());

            $formatedPromos = [];

            foreach ($allPromos as $promo) {
                $formatedPromos[] = [
                    'id' => $promo->getId(),
                    'name' => $promo->getName(),
                    'createdAt' => $promo->getCreatedAt()->format('Y-m-d H:i'),
                    'streamId' => $promo->getStreamId(),
                    'url' => getenv('APP_URL') . '/t/' . $promo->getStreamId(),
                    'offerName' => 'Casino RS',
                    'promoType' => 'Register Form'
                ];
            }

            return $this->json([
                'items' => $formatedPromos
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            return $this->json([
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/statistics/user', name: 'statistics_user', methods: ['GET'])]
    public function getUserStatistics(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // SQL query
        $sql = "
        SELECT c.country,
               s.stream_id,
               t.sub1,
               t.sub2,
               t.sub3,
               t.sub4,
               t.sub5,
               s.name AS promo_name,
               strftime('%Y-%m-%d', t.date) AS formatted_date,
               COUNT(*) AS tracker_count
        FROM tracker t
                 INNER JOIN stream s ON s.id = t.stream_id
                 LEFT JOIN country c ON c.id = t.geo_id
        WHERE s.user_id = :user_id
        GROUP BY c.country, formatted_date, t.sub1, t.sub2, t.sub3, t.sub4, t.sub5, t.stream_id
        ORDER BY formatted_date;
    ";

        $parameters = [
            'user_id' => $this->getUser()->getId()
        ];

        $connection = $entityManager->getConnection();
        $stmt = $connection->prepare($sql);
        $resultSet = $stmt->executeQuery($parameters);
        $results = $resultSet->fetchAllAssociative();

        $formattedResults = [];
        $i = 0;
        foreach ($results as $key => $result) {
            $i++;
            $formattedResults[] = [
                'id' => $i,
                'country' => $result['country'],
                'date' => $result['formatted_date'],
                'sub1' => $result['sub1'],
                'sub2' => $result['sub2'],
                'sub3' => $result['sub3'],
                'sub4' => $result['sub4'],
                'sub5' => $result['sub5'],
                'clicks' => $result['tracker_count'],
                'depositSum' => 0,
                'registrations' => 0,
                'firstDeposit' => 0,
                'redeposit' => 0,
                'revShare' => 0,
                'revenue' => 0,
                'stream_id' => $result['stream_id'],
                'promo_name' => $result['promo_name']
            ];
        }

        return $this->json([
            'items' => $formattedResults
        ]);
    }

    #[Route('/statistics/dashboard', name: 'statistics_dashboard', methods: ['GET'])]
    public function countByDayForLast30DaysAndUserId(Request $request)
    {
        $userId = $this->getUser()->getId();

        $clicksStats = $this->trackerRepository->getRecordsByDateLast30Days($userId);

        $clickDates = [];
        $clickTotalByDate = [];
        foreach ($clicksStats as $key => $clicksStat) {
            $clickDates[] = $clicksStat['recordDate'];
            $clickTotalByDate[] = $clicksStat['totalCount'];
        }

        return $this->json([
            'clicks' => [
                'dates' => $clickDates,
                'total' => $clickTotalByDate
            ]
        ]);
    }
}
