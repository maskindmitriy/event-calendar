import { Calendar } from 'antd';
import { Dayjs } from 'dayjs';
import React from 'react';
import { IEvent } from '../models/IEvent';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
  events: IEvent[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  function dateCellRender(value: Dayjs) {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvents = events.filter(ev => ev.date === formatedDate)

    return (
      <div>
        {currentDayEvents.map((ev, index) =>
          <div key={index}>{ev.description}</div>
        )}
      </div>
      //<Badge status={item.type} text={item.content}/>
    )
  }

  return (
    <Calendar
      dateCellRender={dateCellRender}
    />
  );
}