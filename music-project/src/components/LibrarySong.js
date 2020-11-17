import React from 'react';


export const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs}) => {


        //Handlers
        const songSelectorHandler = async() => {
            const selectedSong = songs.find((state) => state.id === id );
            await setCurrentSong(selectedSong);
            
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
            if(isPlaying) audioRef.current.play()
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

