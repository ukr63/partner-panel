<?php

declare(strict_types=1);

namespace App\Kernel;

use GeoIp2\Database\Reader;

class GeoData
{
    public function __construct(
        public ?string $ip,
        public ?string $city,
        public ?string $country,
        public ?float $latitude,
        public ?float $longitude
    ) {

    }
}

class Tracker
{
    public function __construct() {}

    public static function getInfo(string $ipAddress): GeoData
    {
        $databasePath = '/var/www/html/geoip2/db/GeoLite2-City.mmdb';

        $reader = new Reader($databasePath);

        try {
            $record = $reader->city($ipAddress);

            $geoData = new GeoData(
                $ipAddress,
                $record?->city?->name,
                $record?->country?->name,
                $record?->location?->latitude,
                $record?->location?->longitude
            );

            return $geoData;
        } catch (\Exception|\Throwable $e) {
            return new GeoData(
                $ipAddress,
                null,
                null,
                null,
                null
            );
        }
    }
}
