import React, {useState, useRef} from 'react'

//Import Styles
import "./styles/app.scss";

//Import Components
import Player from './components/Player'
import Song from './components/Song'
import data from './data'
import Nav from './components/Nav'

import { Library } from './components/Library';


function App() {

   //Ref
   const audioRef = useRef(null);

  //state
  const[songs, setSongs] = useState(data())
  const[currentSong, setCurrentSong] = useState(songs[0])
  const[isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
});

  const[libraryStatus, setLibraryStatus] = useState(false);

  //Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //CAL percentage
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const roundedPercentage = Math.round(((roundedCurrent/roundedDuration)*100))
    setSongInfo({
      ...songInfo,
       currentTime: current,
        duration,
        animationPercentage: roundedPercentage,
      })
}


  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id )
      await setCurrentSong(songs[(currentIndex+1) % songs.length])
      libraryHandler(songs[(currentIndex+1) % songs.length])
      if(isPlaying) audioRef.current.play();
  }

  const libraryHandler = (nextPrev) =>{

    const newSongs = songs.map((song) => {
        if(song.id === nextPrev.id){
            return{
                ...song,
                active: true,
            }

        }else{
            return{
                ...song,
                active:false,
            }
        }
    })
    setSongs(newSongs);

  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav
      libraryStatus={libraryStatus}
      setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong} />
      <Player 
      libraryHandler={libraryHandler}
      songEndedHandler={songEndedHandler}
      setCurrentSong={setCurrentSong}
      songs={songs}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      timeUpdateHandler={timeUpdateHandler}
      audioRef={audioRef}
      setIsPlaying={setIsPlaying}
      isPlaying={isPlaying}
      currentSong={currentSong} 
      setSongs={setSongs}
      />
     
     <Library 
     libraryStatus={libraryStatus}
     setLibraryStatus={setLibraryStatus}
     audioRef={audioRef}
     songs={songs} 
     setCurrentSong={setCurrentSong}
     isPlaying={isPlaying}
     setSongs={setSongs}
     />

      <audio 
      onLoadedMetadata={timeUpdateHandler} 
      onTimeUpdate={timeUpdateHandler} 
      ref={audioRef} 
      src={currentSong.audio}
      onEnded={songEndedHandler}
      ></audio>

    </div>
  );
}

export default App;
