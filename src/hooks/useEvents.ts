import { useContext } from 'react';
import { EventsContext } from '../context/EventsContextVals';

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
