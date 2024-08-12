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
        console.log('Post Games ID:', post_games_id);

        if (!accessToken) {
            console.log('No access token found, redirecting to login...');
            navigate('/login');
            return;
        }

        if (!post_games_id) {
            console.error('No post_games_id found');
            setError('No event ID provided');
            return;
        }

        const fetchEventDetails = async () => {
            console.log('Fetching event details...');
            try {
                const response = await fetch(`http://localhost:8080/api/postGames/${post_games_id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                console.log('Response Status:', response.status);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch event details: ${errorText}`);
                }

                const data = await response.json();
                console.log('Event Details Data:', data);
                setEventDetails(data);
            } catch (err) {
                console.error('Error fetching event details:', err);
                setError(err.message);
            }
        };

        fetchEventDetails();
    }, [post_games_id, accessToken, navigate]);

    // Extract query parameters
    const queryParams = new URLSearchParams(location.search);
    const action = queryParams.get('action');

    useEffect(() => {
        if (action === 'join') {
            console.log('Join button clicked');
            // Handle join action
        } else if (action === 'chat') {
            console.log('Chat button clicked');
            // Handle chat action
        }
    }, [action]);

    if (!accessToken) {
        return <p>Redirecting to login...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!eventDetails) {
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
