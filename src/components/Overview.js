import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEvents } from '../api/api';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import UserInfo from '../components/UserInfo';  // Import the UserInfo component

const Overview = () => {
    const { username } = useParams();
    const [events, setEvents] = useState([]);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);

    useEffect(() => {
        // Fetch event data
        const getEventData = async () => {
            try {
                const eventData = await fetchEvents(username);
                setEvents(eventData["events"]);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        getEventData();
    }, [username]);

    if (!events) {
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
        <div className="overview-container">
          {/* User Info (Left Section) */}
          <UserInfo />
          {/* Right Section */}
          <div className="heatmap-section">
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
            {/* Detailed event list for selected date below the heatmap */}
            <div className="event-list">
              {selectedDateEvents.length > 0 ? (
                <div>
                  <h3>Events on {selectedDateEvents[0].created_at.split('T')[0]}</h3>
                  <ul>
                    {selectedDateEvents.map((event, index) => (
                      <li key={index} className="event-item">
                        <strong>Event Type:</strong> {event.type},
                        <strong> URL:</strong> <a href={event.html_url} target="_blank" rel="noopener noreferrer">{event.html_url}</a>,
                        <strong> Platform:</strong> {event.platform}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Select a date to view events.</p>
              )}
            </div>
          </div>
        </div>
      );
    
    
};

export default Overview;
