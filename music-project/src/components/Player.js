import React,{ useEffect} from 'react'

import * as fa from 'react-icons/fa';



const Player = ({songInfo ,setSongInfo,audioRef,
                 currentSong, isPlaying, setIsPlaying, songs,setSongs,
                  setCurrentSong, libraryHandler }) => {

        
    //Event Handlers
        const playSongHandler = () => {
            console.log('play button was pressed')
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
        
        };

       

        const getTime = (time) =>{
            return(
                Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)

            );
        };


        const dragHandler = (e) => {
            audioRef.current.currentTime = e.target.value;
            setSongInfo({...songInfo, currentTime: e.target.value})
        }

        const skipTrackHandler =  async(direction) => {

            let currentIndex = songs.findIndex((song) => song.id === currentSong.id )
            if(direction === 'skip-forward'){
               await setCurrentSong(songs[(currentIndex+1) % songs.length])
               libraryHandler(songs[(currentIndex+1) % songs.length])
            }
            if(direction === 'skip-back'){
                if((currentIndex -1 ) % songs.length === -1){
                  await setCurrentSong(songs[songs.length - 1])
                  libraryHandler(songs[songs.length - 1])
                    if(isPlaying) audioRef.current.play()
                    return;

                }
               await setCurrentSong(songs[(currentIndex-1) % songs.length])
               libraryHandler(songs[(currentIndex-1) % songs.length])
            }
            if(isPlaying) audioRef.current.play()

        }

      
        


        //Styles
        const trackAnimation = {
            transform: `translateX(${songInfo.animationPercentage}%)`
        }
    

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                
              <div 
              style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}
              className="track">
                 <input  
                 onChange={dragHandler}
                 min={0}
                 max={songInfo.duration || 0}
                 value={songInfo.currentTime}
                 type="range"
                 
                 />
                <div 
                style={trackAnimation}
                className="animate-track"
                ></div>                 
              </div>   

                 <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00" }</p>
            </div>
            <div className="play-control">
                 <fa.FaAngleLeft 
                 className="skip-back"
                 onClick={()=> skipTrackHandler("skip-back")}
                 />
                 

                 {isPlaying ? <fa.FaPause onClick={playSongHandler} className="pause"/> 
                 : <fa.FaPlay 
                 onClick={playSongHandler}
                 className="play"/> }

                 <fa.FaAngleRight 
                 className="skip-forward"
                 onClick={()=> skipTrackHandler("skip-forward")}

                 />

            </div>
           
        </div>
    )
}

export default Player;
