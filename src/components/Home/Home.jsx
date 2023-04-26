import { useAuthContext } from '../../context/AuthContext';
import { useGlobalContext } from '../../context/GlobalContext';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import './Home.css';
import Slider from '../Slider/Slider';
import Cover from '../Cover/Cover';
import { SECTIONS } from '../../context/types';
import Section from '../Section/Section';

const tracks = [
  [
    {
      "id": 10,
      "name": "Healin My Blues",
      "artist": "BJ Wilbanks",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644427496/tracks-thumbnails/thumbnail-1644427496210_qqpy4a.jpg",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644523019/tracks/track-1644523017728_qb6wq4.mp3",
      "genre": "soul",
      "liked": false
    },
    {
      "id": 11,
      "name": "Head Over Heels (Friend Group Remix)",
      "artist": "The Devil Music Co.",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644585554/tracks-dev/The_Devil_Music_Co._-_Head_Over_Heels__Friend_Group_Remix__buotnt.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644585551/tracks-thumbnails-dev/Head_Over_Heels_Friend_Group_Remix_c9uatt.jpg",
      "genre": "poprock",
      "liked": false
    },
    {
      "id": 12,
      "name": "Under Water",
      "artist": "THE.MADPIX.PROJECT",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586422/tracks-dev/The.madpix.project_-_Under_Water_2_gyvrkl.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586423/tracks-thumbnails-dev/Under_Water_yoirsy.jpg",
      "genre": "electronic",
      "liked": false
    },
    {
      "id": 10,
      "name": "Healin My Blues",
      "artist": "BJ Wilbanks",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644427496/tracks-thumbnails/thumbnail-1644427496210_qqpy4a.jpg",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644523019/tracks/track-1644523017728_qb6wq4.mp3",
      "genre": "soul",
      "liked": false
    }
  ],
  [
    {
      "id": 17,
      "name": "Un Ratito Nama (Prod: Duran The Coach)",
      "artist": "Igor Pumphonia",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587219/tracks-dev/Lessky_-_Un_Ratito_Nama__Prod__Duran_The_Coach__npuws5.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644587222/tracks-thumbnails-dev/Un_ratito_m2aeq0.jpg",
      "genre": "reggaeton",
      "liked": false
    },
    {
      "id": 18,
      "name": "Sax Is My Cardio",
      "artist": "KUZINMUZIN",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587961/tracks-dev/Kuzinmuzin_-_Sax_Is_My_Cardio_fqmvwb.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644587960/tracks-thumbnails-dev/Sax_kgjfn8.jpg",
      "genre": "funk",
      "liked": false
    },
    {
      "id": 19,
      "name": "Chill Lofi Hip Hop Type Beat",
      "artist": "PERYCREEP",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644653754/tracks-dev/PeryCreep_-_Chill_Lofi_Hip_Hop_Type_Beat_l2k8zv.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644653692/tracks-thumbnails-dev/Chill_Lofi_Hip_Hop_Type_Beat_ltpm24.jpg",
      "genre": "groovy",
      "liked": false
    },
  ],
  [
    {
      "id": 12,
      "name": "Under Water",
      "artist": "THE.MADPIX.PROJECT",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586422/tracks-dev/The.madpix.project_-_Under_Water_2_gyvrkl.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586423/tracks-thumbnails-dev/Under_Water_yoirsy.jpg",
      "genre": "electronic",
      "liked": false
    },
    {
      "id": 13,
      "name": "Better",
      "artist": "A8",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586627/tracks-dev/A8_MUSIC_PRODUCTIONS_-_Better_umwfkh.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586622/tracks-thumbnails-dev/A8_vxgyaf.jpg",
      "genre": "pop",
      "liked": false
    },
  ]
]


const Home = () => {

  const { text } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTracks, setSelectedTracks] = useState(tracks[0]);
  const [loaded, setLoaded] = useState(false);


  const { authState, resetFirstTime } = useAuthContext();
  const { dataState } = useGlobalContext();

  useEffect(() => {
    if (authState.firstTime) {
      toast.success('Log in successfully!',
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 2000
          }
        }
      )
      resetFirstTime();
    }
  }, [])

  return (
    <div className='pb-20 main-home'>
      <div className="home">
        <div className="first-row">
          <Slider
            name="The best!"
            list={dataState.artists}
            type={SECTIONS.ARTIST}
            isFirstRowSection={true}
          />
        </div>
        <div className="w-full">
          <div className="home__carousel">
            <Cover
              artists={dataState.artists}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              tracks={tracks}
              setSelectedTracks={setSelectedTracks}
              loaded={loaded}
              setLoaded={setLoaded}
            />
          </div>
          <div className='home__sections'>
            <Section
              tracks={selectedTracks}
              loaded={loaded}
            />
            <Section
              tracks={selectedTracks}
              loaded={loaded}
            />
          </div>
        </div>
        <div className="rows">
          <Slider
            name={text.filters.playlists}
            list={dataState.playlists}
            type={SECTIONS.PLAYLIST}
          />
          <Slider
            name={text.filters.tracks}
            list={dataState.tracks}
            type={SECTIONS.TRACK}
          />
          <Slider
            name={text.filters.albums}
            list={dataState.albums}
            type={SECTIONS.ALBUM}
          />
          <Slider
            name={text.filters.artists}
            list={dataState.artists}
            type={SECTIONS.ARTIST}
          />

        </div>
      </div>
      <div className={`transition-img ${loaded ? 'loaded' : ''}`} style={{
        backgroundImage: `url(${dataState.artists[selectedIndex].photoUrl})`
      }}></div>
    </div>
  )
}

export default Home;