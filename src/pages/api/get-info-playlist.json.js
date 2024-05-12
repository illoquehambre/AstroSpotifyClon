import { allPlaylists, songs as allSongs } from "@/lib/data";
export const prerender = false;
export async function GET({ params, request }) {
      try {
        const { url } = request;
        const urlObject = new URL(url);
        const id = urlObject.searchParams.get('id');

        // Validar el parámetro 'id'ª
        if (!id) {
            return new Response(JSON.stringify({ error: "ID missing in request URL" }), {
                status: 400,
                headers: { "content-type": "application/json" }
            });
        }

        const playlist = allPlaylists.find((playlist) => playlist.id === id);

        // Manejar caso donde la playlist no se encuentra
        if (!playlist) {
            return new Response(JSON.stringify({ error: "Playlist not found" }), {
                status: 404,
                headers: { "content-type": "application/json" },               
            });
        }

        const songs = allSongs.filter((song) => song.albumId === playlist.albumId);

        return new Response(JSON.stringify({ playlist, songs }), {
            headers: { "content-type": "application/json" }
        });
    } catch (error) {
        // Manejar errores asincrónicos
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "content-type": "application/json" }
        });
    }
}