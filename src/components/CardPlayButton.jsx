import { Pause, Play } from "./Player"
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButton({ id, size = 'small' }) {
    const {
        currentMusic,
        isPlaying,
        setIsPlaying,
        setCurrentMusic
    } = usePlayerStore(state => state)


    const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id

    const handleClick = async () => {
        if (isPlayingPlaylist) {
            setIsPlaying(false)
            return
        }
        /*
        const params = new URLSearchParams();
        params.append('id', {id});

*/
        await fetch(`/api/get-info-playlist.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data
                console.log(data);
                setIsPlaying(true)
                setCurrentMusic({ songs, playlist, song: songs[0] })
            })
            .catch(error => console.error('Error:', error));
    }

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'


    return (
        <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400">
            {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
        </button>
    )
}