import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = () => {
    const today = new Date();

    // Example data for events (replace with actual API data)
    const events = [
        { date: '2023-09-15', count: 3 },
        { date: '2023-09-14', count: 1 },
        // other days...
    ];

    return (
        <div>
            <h2>Event Heatmap</h2>
            <CalendarHeatmap
                startDate={new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())}
                endDate={today}
                values={events}
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-scale-${value.count}`;
                }}
            />
        </div>
    );
}

export default Heatmap;
