'use client';

import { useCallback } from 'react';
import { Select } from '@radix-ui/themes';
import { Badge } from '@radix-ui/themes';
import { GrPowerReset } from 'react-icons/gr';
import { eventTypeToColor } from '@/@types/data/catalyst-calendar/event-badge-colors';
import type CalendarEvent from '@/@types/data/catalyst-calendar/calendar-event';

interface FilterEventsProps {
  events: CalendarEvent[];
  activeFilters: Set<string>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Set<string>>>;
  onSortChange: (direction: string) => void;
}

export default function FilterEvents({
  events,
  activeFilters,
  setActiveFilters,
  onSortChange // Add this prop
}: FilterEventsProps) {
  const handleFilterToggle = useCallback(
    (eventType: string) => {
      setActiveFilters((prev) => {
        const newFilters = new Set(prev);
        if (newFilters.has(eventType)) {
          newFilters.delete(eventType);
        } else {
          newFilters.add(eventType);
        }
        return newFilters;
      });
    },
    [setActiveFilters]
  );

  const resetFilters = useCallback(() => {
    setActiveFilters(new Set());
  }, [setActiveFilters]);

  const uniqueEventTypes = Array.from(
    new Set(events.map((event) => event.eventType))
  );

  return (
    <div className='flex h-fit flex-col gap-4 rounded-lg border-[1px] border-gray-200 bg-gray-100 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800'>
      <div className='flex items-center justify-between dark:text-neutral-400'>
        <h2 className='text-2xl'>Filter</h2>
        <div
          onClick={resetFilters}
          className='hover:border-neutral- flex cursor-pointer items-center gap-1 rounded-md p-1 text-sm text-indigo-500 hover:bg-gray-200 dark:hover:border-neutral-500 dark:hover:bg-neutral-700'
        >
          <GrPowerReset />
          <p>Reset Filters</p>
        </div>
      </div>
      <div className='flex flex-col items-start gap-2'>
        <Select.Root defaultValue='asc' onValueChange={onSortChange}>
          <Select.Trigger className='dark:bg-neutral-900'>
            Sort By Date
          </Select.Trigger>
          <Select.Content>
            <Select.Item className='hover:bg-indigo-500' value='asc'>
              Date (Asc)
            </Select.Item>
            <Select.Item className='hover:bg-indigo-500' value='desc'>
              Date (Desc)
            </Select.Item>
          </Select.Content>
        </Select.Root>
        <h3>Event Type</h3>
        <div className='flex max-w-80 flex-wrap gap-2'>
          {uniqueEventTypes.map((eventType) => (
            <Badge
              key={eventType}
              className={`cursor-pointer rounded-md px-1 ${
                activeFilters.has(eventType) ? 'border-2 border-indigo-500' : ''
              }`}
              color={
                eventTypeToColor[eventType as keyof typeof eventTypeToColor]
              }
              onClick={() => handleFilterToggle(eventType)}
            >
              {eventType}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}