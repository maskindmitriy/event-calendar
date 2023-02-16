import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFormProps {
  guests: IUser[],
  submit: (event: IEvent) => void
}

export function EventForm(props: EventFormProps) {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: ''
  } as IEvent)

  const { user } = useTypedSelector(state => state.auth)

  const selectDate = (date: Dayjs | null) => {
    if (date) {
      setEvent({...event, date: formatDate(date.toDate())})
    }
  }

  const submitHandler = () => {
    props.submit({...event, author: user.username})
  }

  return (
    <Form onFinish={submitHandler}>
      <Form.Item
        label='Описание события'
        name='description'
        rules={[rules.required()]}
      >
        <Input
          onChange={e => setEvent({...event, description: e.target.value})}
          value={event.description}
          
        />
      </Form.Item>
      <Form.Item
        label='Дата события'
        name='date'
        rules={[rules.required(), rules.isDateAfter("Нельзя создать событие в прошлом")]}
      >
        <DatePicker 
          onChange={(date) => selectDate(date)}   
        />
      </Form.Item>

      <Form.Item label={'Список гостей'} name='guest '>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map(guest =>
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          )}
        </Select>
      </Form.Item>

      <Row justify='end'>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}