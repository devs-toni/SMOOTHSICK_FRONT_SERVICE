import { useEffect, useState } from "react";
import Chart from "./Chart";

const Section = ({ tracks, loaded }) => {

  return (
    <div className={`grow mt-6 xl:mt-0 top-charts ${loaded ? 'loaded' : ''}`}>
      <h3 className='text-2xl mt-10 font-bold tracking-wide text-center xl:text-left xl:text-3xl lg:mt-10 xl:mt-2 lg:mb-10'>Top charts</h3>
      <div>
        {
          tracks.map(({ id, name, artist, thumbnail, liked }) => {
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