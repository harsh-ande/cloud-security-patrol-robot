const axios = require('axios');

async function fetchStreamingData() {
    try {
        const response = await axios.get(
            'http://localhost:5000/control/fetchVehicleInfo',
            {
                headers: {
                    Accept: 'text/event-stream', // Request streaming data
                },
                responseType: 'stream', // Important for handling streams
            },
        );

        console.log('Connected to stream. Logging data...');
        let body = '';
        const boundary = '--frame\r\n';

        response.data.on('data', (chunk) => {
            try {
                body += chunk.toString(); // Accumulate the chunk data
                console.log({ body });

                // Check if the chunk includes the custom header (X-Image-Type)
                // const headerMatch = body.match(/X-Image-Type:\s*(\w+)/);
                // console.log(
                //     'Received stream with header X-Image-Type:',
                //     headerMatch[1],
                // );
                // if (headerMatch[1] == 'front') print('FRONT !!');
                // if (headerMatch[1] == 'top') print('TOP !!');

                const chunkString = chunk.toString();
                console.log({ chunkString });

                // const jsonStr = chunkString.match(/data:\s*(.*)/)?.[1]?.trim();
                // console.log(JSON.parse(jsonStr))
            } catch (err) {
                console.error('Error parsing data chunk:', err.message);
            }
        });

        response.data.on('end', () => {
            console.log('Stream ended.');
        });
    } catch (error) {
        console.error('Error fetching streaming data:', error.message);
    }
}

fetchStreamingData();
