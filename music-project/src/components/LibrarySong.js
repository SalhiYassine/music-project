import React from 'react';
import {playAudio} from '../util'

export const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs}) => {


        //Handlers
        const songSelectorHandler = () => {
            const selectedSong = songs.find((state) => state.id === id );
            setCurrentSong(selectedSong);
            
            //Add active state
            const newSongs = songs.map((song) => {
                if(song.id === id){
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


            // check if song is playing
            playAudio(isPlaying, audioRef);
        }
            return (
                <div onClick={songSelectorHandler} className={ `library-song ${ song.active ? 'selected' : "" }` }>
                        <img src={song.cover}/>
                        <div className="song-description">    
                                <h3>{song.name}</h3>
                                <h4>{song.artist}</h4>
                        </div>
                </div>
        )
    }      

