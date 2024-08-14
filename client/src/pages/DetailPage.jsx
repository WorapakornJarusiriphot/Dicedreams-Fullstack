import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';

const DetailsPage = () => {
    const { id } = useParams(); // The event ID from the URL
    const [event, setEvent] = useState(null);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const navigate = useNavigate();

    const { userId } = useContext(AuthContext);

    useEffect(() => {
        console.log('DetailsPage mounted');
        console.log('Event ID:', id);
        console.log('User ID:', userId);

        if (!id || !userId) {
            console.error('Event ID or User ID is missing.');
            return;
        }

        const loadEventDetails = async () => {
            try {
                console.log('Fetching event details...');

                // Assume the token is stored in AuthContext or localStorage
                const token = localStorage.getItem('authToken') || '';

                const response = await axios.get(`http://localhost:8080/api/postGame/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Add your token here
                        'users_id': userId,
                    },
                });
                console.log('Event details received:', response.data);
                setEvent(response.data);
            } catch (error) {
                console.error('Failed to fetch event details', error);
            }
        };

        loadEventDetails();
    }, [id, userId]);


    const handleJoinEvent = useCallback(() => {
        console.log('Join event button clicked for eventId:', id);
        // Implement join event logic here
    }, [id]);

    const handleChatChange = (event) => {
        console.log('Chat message changed:', event.target.value);
        setChatMessage(event.target.value);
    };

    const handleChatSubmit = () => {
        console.log('Chat message submitted:', chatMessage);
        if (chatMessage.trim() !== '') {
            setChatHistory([...chatHistory, chatMessage]);
            setChatMessage('');
        }
    };

    const handleReturnHome = () => {
        console.log('Returning to Home');
        navigate('/home');
    };

    if (!event) {
        console.log('Event data not yet loaded');
        return <p>Loading...</p>;
    }

    const {
        name_games,
        detail_post,
        num_people,
        date_meet,
        time_meet,
        games_image,
        creation_date,
        status_post,
        users_id,
    } = event;

    const formattedDateMeet = date_meet ? new Date(date_meet).toLocaleDateString() : 'Unknown Date';
    const formattedTimeMeet = time_meet ? new Date(`1970-01-01T${time_meet}Z`).toLocaleTimeString() : 'Unknown Time';

    console.log('Rendered event details:', {
        name_games,
        detail_post,
        num_people,
        date_meet,
        time_meet,
        games_image,
        creation_date,
        status_post,
        users_id,
    });

    return (
        <div>
            <div>
                <h2>{name_games || 'Untitled Event'}</h2>
                <p>{`${formattedDateMeet} at ${formattedTimeMeet}`}</p>
                <p>{detail_post || 'No content available'}</p>
                <p>{`Participants: ${num_people || 0}/${event.maxParticipants || 'N/A'}`}</p>
                <button onClick={handleJoinEvent}>Join</button>
                <button onClick={handleReturnHome}>Return to Home</button>
            </div>

            <div>
                <h3>Chat</h3>
                <ul>
                    {chatHistory.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
                <div>
                    <input
                        type="text"
                        placeholder="Add a chat..."
                        value={chatMessage}
                        onChange={handleChatChange}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleChatSubmit();
                            }
                        }}
                    />
                    <button onClick={handleChatSubmit}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
