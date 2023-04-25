import { useParams } from 'react-router-dom'

const Details = () => {

  const { type, id } = useParams();

  return (
    <div className='h-full'>
      <div className='w-4/6 pt-20 m-auto'>
        Details
        <p>{type}</p>
        <p>{id}</p>
      </div>
    </div>
  )
}

export default Details