'use client';

import Layout from "@/views/layouts/main";
import TrackerStats from "@/views/statistics/comps/TrackerStats";
import {useEffect, useState} from "react";
import StatisticsModel from "@/models/statistics";

const Statistics = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const response: any = await StatisticsModel.getStatistics();
        setItems(response?.data?.items ?? []);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout pageName={'Statistics'}>
            <TrackerStats items={items} isLoading={loading} />
        </Layout>
    )
}

export default Statistics