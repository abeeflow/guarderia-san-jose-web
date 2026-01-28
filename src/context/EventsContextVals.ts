import { createContext } from 'react';
import { type Event } from '../data/events';

export interface EventsContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: number, event: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
}

export const EventsContext = createContext<EventsContextType | undefined>(undefined);
