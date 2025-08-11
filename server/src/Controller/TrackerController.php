<?php

declare(strict_types=1);

namespace App\Controller;

use App\Kernel\Tracker;
use App\Repository\CountryRepository;
use App\Repository\TrackerRepository;
use \Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Tracker as TrackerEntity;
use App\Repository\StreamRepository;

#[Route('/', name: 'tracker')]
class TrackerController extends AbstractController
{
    public function __construct(
        private StreamRepository  $streamRepository,
        private TrackerRepository $trackerRepository,
        private CountryRepository $countryRepository
    )
    {
    }

    #[Route('/t/{trackerId}', name: 'track', methods: ['GET'])]
    public function tracker(Request $request, string $trackerId)
    {
        $geoData = Tracker::getInfo($this->getIpUser());
        $stream = $this->streamRepository->getByStreamId($trackerId);

        $country = null;
        if (!empty($geoData->country)) {
            $country = $this->countryRepository->getCountry($geoData->country);
        }

        $tracker = new TrackerEntity();
        $tracker->setIp($request->getClientIp());
        $tracker->setDate(new \DateTime());
        $tracker->getSub1($request->query->get('sub1'));
        $tracker->getSub2($request->query->get('sub2'));
        $tracker->getSub3($request->query->get('sub3'));
        $tracker->getSub4($request->query->get('sub4'));
        $tracker->getSub5($request->query->get('sub5'));
        $tracker->setHttpReferer($request->headers->get('referer'));
        $tracker->setUserAgent($request->headers->get('User-Agent'));
        if ($stream) {
            $tracker->setStream($stream);
        }
        if ($country) {
            $tracker->setGeo($country);
        }
        $tracker->setUrl($request->getUri());
        $this->trackerRepository->save($tracker);

        $offerUrl = $this->findSuitableOfferByCountry($country ? $country->getCode() : '');

        return $this->redirect($offerUrl);
    }

    private function findSuitableOfferByCountry(?string $countryCode)
    {
        $defaultOffer = 'https://youtube.com';
        if (!$countryCode) {
            return $defaultOffer;
        }

        return sprintf("https://%s.com", strtolower($countryCode));

        if (in_array($countryCode, ['UA', 'MX', 'EU'])) {
            return 'https://google.com';
        }

        return $defaultOffer;
    }

    private function getIpUser()
    {
        $ip = null;

        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
            $ip = $_SERVER['HTTP_X_REAL_IP'];
        }

        return $ip;
    }
}
