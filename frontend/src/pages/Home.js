import React, {useEffect, useState} from 'react';
import "./Home.css"
import axios from 'axios';
import moment from 'moment';

const initialError = {
    status: false,
    description: ''
}

const Home = () => {
    const [timeData, setTimeData] = useState({
        time: 0,
        formattedTime: '',
    })
    const [metricData, setMetricData] = useState({
        metrics: ''
    })
    const [clientTimeDiff, setClientTimeDiff] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        status: false,
        description: ''
    })
    useEffect(() => {
        const makeRequest = (type, url, header) => {
            const config = {
                method: 'get',
                baseURL: url,
                timeout: 1000,
                headers: {'Authorization': header}
            }
            setLoading(true);
            setError(initialError);
            axios(config)
                .then((response) => {
                    setLoading(false)
                    console.log(response.data)
                    if (type === 'metrics') {
                        setMetricData((prev) => ({
                            ...prev,
                            metrics: response.data
                        }))
                    }
                    setTimeData((prev) => ({
                        ...prev,
                        time: response.data.epoch?.timeEpoch,
                        formattedTime: moment(response.data.epoch?.timeEpoch).format('HH:mm:ss'),
                    }))
                })
                .catch((error) => {
                    setLoading(false)
                    setError({
                        status: true,
                        description: error
                    })
                })
        }
        makeRequest('metrics', 'http://localhost:4000/metrics', 'mysecrettoken')
        makeRequest('time', 'http://localhost:4000/time', 'mysecrettoken')
        const requestTimer = setInterval(() => {
            makeRequest('metrics', 'http://localhost:4000/metrics', 'mysecrettoken')
            makeRequest('time', 'http://localhost:4000/time', 'mysecrettoken')
        }, 30000);
        return () => clearInterval(requestTimer);
    }, []);

    useEffect(() => {
        const differenceTimer = setInterval(() => {
            setClientTimeDiff(moment().diff(timeData.formattedTime, 'hours').toString())
        }, 1000);
        return () => clearInterval(differenceTimer);
    }, []);


    if (error.status) {
        return (
            <div>
                <p>{error.description.toString()}</p>
            </div>
        )
    }
    return (
        <div>
            <div id='container'>
                <div id='time'>
                    <p>
                        {timeData.time}
                    </p>
                    <p>
                        {timeData.formattedTime}
                    </p>
                    <p>
                        {clientTimeDiff}
                    </p>
                </div>
                <div id='metrics'>
                <pre>
                    {metricData.metrics}
                </pre>
                </div>
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Home;
