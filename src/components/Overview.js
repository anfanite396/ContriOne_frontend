import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser, fetchEvents } from '../api/api';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Overview = () => {
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);

    useEffect(() => {
        // Fetch user data and event data
        const getUserData = async () => {
            try {
                const userData = await fetchUser(username);
                setUserInfo(userData);

                const eventData = await fetchEvents(username);
                setEvents(eventData["events"]);
            } catch (error) {
                console.error('Error fetching user or event data:', error);
            }
        };

        getUserData();
    }, [username]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    // Flatten the events array and transform it for the heatmap
    const transformEventDataForHeatmap = (events) => {
        const eventMap = {};
        const flattenedEvents = events.flat();

        flattenedEvents.forEach((event) => {
            if (event.created_at) {
                const date = new Date(event.created_at).toISOString().split('T')[0];
                eventMap[date] = (eventMap[date] || 0) + 1;
            } else {
                console.warn('Event missing created_at field:', event);
            }
        });

        return Object.keys(eventMap).map((date) => ({
            date,
            count: eventMap[date],
        }));
    };

    // Handle cell click: filter events for the selected date
    const handleDateClick = (value) => {
        if (value && value.date) {
            const selectedDate = value.date;
            const dateEvents = events
                .flat()
                .filter(event => new Date(event.created_at).toISOString().split('T')[0] === selectedDate);
            
            setSelectedDateEvents(dateEvents);
        }
    };

    return (
        <div>
            <h1>{username}'s Overview</h1>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Username: {userInfo.username}</p>

            {/* Existing Platforms */}
            <div>
                <h3>Linked Platforms</h3>
                <ul>
                    {userInfo.platforms.map((platform) => (
                        <li key={platform.id}>
                            {platform.platform}: {platform.username}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Heatmap */}
            <div>
                <h2>Event Heatmap</h2>
                <CalendarHeatmap
                    startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                    endDate={new Date()}
                    values={transformEventDataForHeatmap(events)}
                    onClick={handleDateClick}
                    classForValue={(value) => {
                        if (!value) return 'color-empty';
                        return `color-scale-${Math.min(value.count, 4)}`;
                    }}
                />
            </div>

            {/* Detailed event list for selected date */}
            <div>
                {selectedDateEvents.length > 0 ? (
                    <div>
                        <h3>Events on {selectedDateEvents[0].created_at.split('T')[0]}</h3>
                        <ul>
                            {selectedDateEvents.map((event, index) => (
                                <li key={index}>
                                    Event Type: {event.type}, URL: {event.html_url}, Platform: {event.platform}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Select a date to view events.</p>
                )}
            </div>
        </div>
    );
};

export default Overview;
