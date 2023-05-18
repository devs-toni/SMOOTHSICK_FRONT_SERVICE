import axios from "axios";
import { useUser } from "../../../context/UserContext";
import { toast } from "react-hot-toast";
import { useLanguage } from "../../../context/LanguageContext";

export const AddToPlaylist = () => {
    const { getMyPlaylists } = useUser()
    const { text } = useLanguage()

    // ADD TRACK TO PLAYLIST 

    const handleAddToPlaylist = (listId, listTitle, trackId) => {
        axios.post(import.meta.env.VITE_BACKEND + "playlists/addTrack", { listId, trackId })
            .then(({ status }) => {
                if (status === 201) {
                    getMyPlaylists()
                    toast.success(text.playlists.add, + listTitle, {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                        error: {
                            duration: 5000,
                        },
                    });
                } else {
                    toast.error(text.toast.toast5, {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                        error: {
                            duration: 5000,
                        },
                    })
                }
            })

    }

    return {
        handleAddToPlaylist
    }


}
