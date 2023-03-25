
import Soundbox from './Soundbox'
import { v4 as uuidv4 } from 'uuid'

const Category = ({ list, name }) => {

  return (
    <div className='row'>
      {
        list.length > 0 && (
          <>
            <h1 className="text-2xl mb-5">{name}</h1>
            <div className='row__list' /* ref={listRef} */ >
              {
                list.map(({ id, name, imageUrl, artist }) => {
                  return (
                    <Soundbox
                      key={uuidv4()}
                      id={id}
                      name={name}
                      image={imageUrl}
                      artist={artist}
                    />
                  )
                })
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Category