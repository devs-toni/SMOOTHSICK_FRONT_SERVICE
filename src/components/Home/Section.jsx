import Chart from "./Chart";

const Section = () => {

  const tracks = [
    {
      "id": 1,
      "name": "Better of alone",
      "artist": "RXBYN",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/better_off_alone_gfmcby.jpg",
      "genre": "piano",
      "liked": false
    },
    {
      "id": 2,
      "name": "Alone",
      "artist": "Color Out",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/alone_rfib7a.jpg",
      "genre": "poprock",
      "liked": true
    },
    {
      "id": 3,
      "name": "Mahidevran - Maze of sorrow",
      "artist": "MAHIDEVRAN ROCK BAND",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/Maze_of_sorrow_r1crlr.jpg",
      "genre": "chillout",
      "liked": false
    },
  ]

  return (
    <div className='grow mt-6 md:mt-0'>
      <h3 className='text-2xl font-bold tracking-wide text-center md:text-left'>Top charts</h3>
      <div>
        {
          tracks.map(({id, name, artist, thumbnail, liked }) => {
            return (
              <Chart
                key={id}
                img={thumbnail}
                title={name}
                artist={artist}
                isLike={liked} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Section;