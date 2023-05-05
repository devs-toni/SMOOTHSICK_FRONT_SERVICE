import { useParams } from 'react-router-dom'
import { FILTER_TYPES } from '../Search/filterTypes';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Details = () => {

  const { type, id } = useParams();
  const [data, setData] = useState({});

  const getDetails = () => {
    switch (type.charAt(0).toUpperCase() + type.slice(1)) {
      case FILTER_TYPES.ALBUMS:
        return axios.get(import.meta.env.VITE_BACKEND + "albums/" + id)
          .then(({ data }) => {
            setData(data);
          })

      case FILTER_TYPES.ARTISTS:
      
        break;

      case FILTER_TYPES.PLAYLISTS:
        break;

      case FILTER_TYPES.TRACKS:
        break;
    }
  }

  useEffect(() => {
    getDetails();
  }, [])


  return (
    <div className='flex justify-center'>
      <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden z-10 md:ml-20 lg:ml-52">
        {
          Object.keys(data).length > 0
            ?
            <p>{data.title}</p>
            :
            <p>Cargando</p>
        }
      </div>
    </div>
  )
}