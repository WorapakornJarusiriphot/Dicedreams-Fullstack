import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { userId, accessToken, role } = location.state || {};

    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (!userId || !accessToken || !role) {
            alert('Please log in to access this page.');
            navigate('/login');
            return;
        }

        if (role !== 'user') {
            alert('You do not have permission to access this page.');
            navigate('/');
            return;
        }

        const loadEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/postGame/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'users_id': userId,
                    },
                });
                setEvent(response.data);
            } catch (error) {
                console.error('Failed to fetch event details', error);
                alert('Failed to fetch event details. Please try again later.');
                navigate('/');
            }
        };

        loadEventDetails();
    }, [id, userId, accessToken, role, navigate]);

    if (!event) {
        return <p>Loading...</p>;
    }

    const {
        name_games,
        detail_post,
        num_people,
        date_meet,
        time_meet,
    } = event;

    return (
        <div>
            <h2>{name_games || 'Untitled Event'}</h2>
            <p>{`${new Date(date_meet).toLocaleDateString()} at ${new Date(`1970-01-01T${time_meet}Z`).toLocaleTimeString()}`}</p>
            <p>{detail_post || 'No content available'}</p>
            <p>{`Participants: ${num_people || 0}`}</p>
            <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
    );
};

export default DetailsPage;
