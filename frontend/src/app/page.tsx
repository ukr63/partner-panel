'use client';

import Image from "next/image";
import styles from "./page.module.css";
import {Button} from "@mui/material";
import {useEffect} from "react";

export default function Home() {
    useEffect(() => {
        window.location.href = '/dashboard';
    }, []);

    return (
        <div>

        </div>
    );
}
