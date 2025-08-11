import axios from 'axios';
import { NextResponse } from 'next/server';
import {lookup} from "dns/promises";

// Symfony backend base URL

const getBackendIp = async () => {
    const ip = await lookup('server-nginx').then(res => res.address);
    return `http://${ip}:80/api`;
}


/**
 * Handle GET requests and proxy them to the Symfony backend.
 */
export async function GET(req: Request, { params }: { params: { params: string[] } }) {
    const targetUrl = `${await getBackendIp()}/${params.params.join('/')}`;
    const headers = req.headers;

    try {
        // Forward the GET request to the Symfony backend
        const response = await axios.get(targetUrl, {
            headers: Object.fromEntries(headers),
        });

        // Return the response data
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        console.error('Error processing GET request:', error.message);

        // Respond with an error
        return NextResponse.json(
            {
                error: 'Proxy error - GET',
                details: error.response?.data || error.message,
            },
            { status: error.response?.status || 500 }
        );
    }
}

/**
 * Handle POST requests and proxy them to the Symfony backend.
 */
export async function POST(req: Request, { params }: { params: { params: string[] } }) {
    // Construct the target URL based on the incoming request
    const targetUrl = `${await getBackendIp()}/${params.params.join('/')}`;
    const headers = Object.fromEntries(req.headers); // Convert headers to a plain object
    const body = await req.json(); // Parse the incoming request body

    try {
        console.log('POST request body:', body);
        console.log('POST targetUrl:', targetUrl);

        // Forward the POST request to the Symfony backend using fetch
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json', // Ensure JSON content type
            },
            body: JSON.stringify(body), // Send the parsed request body
        });

        // Read the response from the backend
        const responseData = await response.json();

        console.log('POST response2:', responseData);

        // Return the response data
        return NextResponse.json(responseData, { status: response.status });
    } catch (error: any) {
        // Log the error
        console.error('Error during POST request:', error);

        // Respond with an error
        return NextResponse.json(
            {
                error: 'Proxy error - POST',
                details: error.message,
            },
            { status: 500 } // Return status 500 for internal errors
        );
    }
}
