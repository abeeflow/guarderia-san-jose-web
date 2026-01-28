import { useState, type ReactNode, useEffect } from 'react';
import { type Event, initialEvents } from '../data/events';
import { EventsContext } from './EventsContextVals';

export function EventsProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or fallback to initialEvents
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      const saved = localStorage.getItem('events_data');
      return saved ? JSON.parse(saved) : initialEvents;
    } catch (error) {
      console.error('Error parsing events from localStorage:', error);
      return initialEvents;
    }
  });

  useEffect(() => {
    localStorage.setItem('events_data', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent: Omit<Event, 'id'>) => {
    const id = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { ...newEvent, id }]);
  };

  const updateEvent = (id: number, updatedEvent: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

