import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import Spinner from '@/components/Spinner';
import BigCalendar from '@/components/BigCalendar';
import PendingOps from '@/components/PendingOps';
import { mongooseConnect } from '@/lib/mongoose';
import Operation from '@/models/Operation';


export default function Calendar({operations}) {

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());

  const [allEvents, setAllEvents] = useState([]);


  // Filtro de las los que tiene pendiente hoy
  const eventsToday = allEvents?.filter(
    event =>
      moment(event.start).isSame(new Date(), 'day') ||
      moment(event.end).isSame(new Date(), 'day') ||
      (moment(event.start).isBefore(new Date()) &&
        moment(event.end).isAfter(new Date()))
  );

  async function handleAddEvent() {
    try {
      const newEvent = { title, start, end: start }
      const response = await axios.post('/api/events', newEvent);
      setTitle('');
      setStart('');
      getEventsMade()

    } catch (error) {
      console.log(error)
    }
    setAllEvents([...allEvents]);
  };

  const getEventsMade = async () => {
    setIsLoading(true);
    axios.get('/api/events').then(res => {
      setAllEvents(res.data.calendar);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getEventsMade();
  }, []);


  

  return (
    <Layout>
      <div>
        {isLoading && (
          <>
            <div className='flex justify-center m-auto'>
              <Spinner />
            </div>
          </>
        )}
        {allEvents.length === 0 && (

          <h1 className='text-center'>You have no events in your agenda</h1>

        )}
        {allEvents.length > 0 && (
          <h1 className='text-center'>You have <b style={{ color: 'green', fontSize: '25px' }} >{allEvents.length}</b> events to be managed and <b style={{ color: 'red', fontSize: '25px' }} >{eventsToday.length}</b> are from today</h1>
        )}
        <div className='m-3'>
          <div className='flex flex-col gap-2'>
            <input type="text" placeholder="Add Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <DatePicker
              showIcon
              popperClassName="z-10"
              placeholderText="Due Date"
              dateFormat="dd/MM/yyyy"
              selected={start}
              onChange={(date) => setStart(date)} />
            <button className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400" onClick={handleAddEvent}>
              Add reminder
            </button>
          </div>
        </div>
        <BigCalendar allEvents={allEvents} getEventsMade={getEventsMade}/>
       <PendingOps operations={operations}/>
      </div>
    </Layout>
  )
}

// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
  await mongooseConnect();
  const operations = await Operation.find({}, null, { sort: { '_id': -1 } })
    .populate('proyecto', {
      projectID: 1,
      name: 1,
      standar: 1,
      vintage: 1,
    });

  return {
    props: {
      operations: JSON.parse(JSON.stringify(operations)),

    }
  };
}