import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

const DetailsPage = () => {
    const { post_games_id } = useParams();
    const { accessToken } = useContext(AuthContext);
    const [eventDetails, setEventDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('Access Token:', accessToken);

        if (!accessToken) {
            navigate('/login');
            return;
        }

        if (!post_games_id) {
            setError('No event ID provided');
            return;
        }

        const fetchEventDetails = async () => {
            try {
                console.log(`Fetching details for event ID: ${post_games_id}`);

                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/postGames/${post_games_id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Failed to fetch event details:', errorText);
                    throw new Error(`Failed to fetch event details: ${errorText}`);
                }

                const data = await response.json();
                console.log('Fetched Event Details:', data);
                setEventDetails(data);
            } catch (err) {
                console.error('Error:', err.message);
                setError(err.message);
            }
        };

        fetchEventDetails();
    }, [post_games_id, accessToken, navigate]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const action = queryParams.get('action');
        console.log('Query Params Action:', action);

        if (action === 'join') {
            console.log('Join action triggered');
            // Handle join action
        } else if (action === 'chat') {
            console.log('Chat action triggered');
            // Handle chat action
        }
    }, [location.search]);

    if (!accessToken) {
        return <p>Redirecting to login...</p>;
    }

    if (error) {
        console.log('Error State:', error);
        return <p>Error: {error}</p>;
    }

    if (!eventDetails) {
        console.log('Loading event details...');
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Event Details</h1>
            <p><strong>Game Name:</strong> {eventDetails.nameGames}</p>
            <p><strong>Date:</strong> {eventDetails.dateMeet}</p>
            <p><strong>Time:</strong> {eventDetails.timeMeet}</p>
            <p><strong>Details:</strong> {eventDetails.detailPost}</p>
            <p><strong>Participants:</strong> {eventDetails.numPeople}/{eventDetails.maxParticipants}</p>
        </div>
    );
};

export default DetailsPage;
