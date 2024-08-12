import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadEventDetails = async () => {
            try {
                console.log('Fetching event details for eventId:', eventId);
                const response = await axios.get(`http://localhost:8080/api/postGame/${eventId}`);
                console.log('Event details fetched:', response.data);
                setEvent(response.data);
            } catch (error) {
                console.error('Failed to fetch event details', error);
            }
        };

        loadEventDetails();
    }, [eventId]);

    const handleJoinEvent = useCallback(() => {
        // Implement join event logic here
        console.log('Join event button clicked for eventId:', eventId);
    }, [eventId]);

    const handleChatChange = (event) => {
        setChatMessage(event.target.value);
        console.log('Chat message updated:', event.target.value);
    };

    const handleChatSubmit = () => {
        if (chatMessage.trim() !== '') {
            setChatHistory([...chatHistory, chatMessage]);
            console.log('Chat history updated:', [...chatHistory, chatMessage]);
            setChatMessage('');
        }
    };

    const handleReturnHome = () => {
        console.log('Returning to home page');
        navigate('/home'); // Navigate to the homepage
    };

    if (!event) {
        console.log('Loading event data...');
        return <p>Loading...</p>; // Placeholder while loading event data
    }

    const {
        profilePic,
        username,
        postTime,
        image,
        nameGames,
        dateMeet,
        timeMeet,
        detailPost,
        numPeople,
        maxParticipants,
        participants
    } = event;

    // Format the meeting date and time
    const formattedDateMeet = dateMeet ? new Date(dateMeet).toLocaleDateString() : 'Unknown Date';
    const formattedTimeMeet = timeMeet ? new Date(`1970-01-01T${timeMeet}Z`).toLocaleTimeString() : 'Unknown Time';

    console.log('Rendering event details:', {
        nameGames,
        formattedDateMeet,
        formattedTimeMeet,
        detailPost,
        numPeople,
        maxParticipants,
        participants
    });

    return (
        <div>
            {/* Event Summary */}
            <div>
                <h2>{nameGames || 'Untitled Event'}</h2>
                <p>{`${formattedDateMeet} at ${formattedTimeMeet}`}</p>
                <p>{detailPost || 'No content available'}</p>
                <p>{`Location: ${event.location || 'Unknown Location'}`}</p>
                <p>{`Participants: ${numPeople || 0}/${maxParticipants || 'N/A'}`}</p>
                <button onClick={handleJoinEvent}>Join</button>
                <button onClick={handleReturnHome}>Return to Home</button>
            </div>

            {/* Participants Section */}
            <div>
                <h3>Participants</h3>
                <div>
                    {participants.map((participant) => (
                        <img key={participant.id} alt={participant.name} src={participant.avatar || '/path/to/defaultAvatar.jpg'} />
                    ))}
                </div>
            </div>

            {/* Chat Section */}
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
