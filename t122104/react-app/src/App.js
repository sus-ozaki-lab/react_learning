import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Python バックエンドのエンドポイントにリクエスト
        axios.get('http://localhost:5000/api/endpoint')
            .then((response) => {
                // レスポンスの "message" フィールドを取得
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default App;
