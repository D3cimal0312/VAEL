import api from "@/lib/api";

export const favServices={
 

    // get all fav items
    async getFavorites(){
        try{ 
    const res=await api.get("/favourites")
    return res.data
        }catch(error){
            console.error('Error fetching favorites:', error);
            throw new Error(
                 
                'Failed to fetch favorites'
            );
        }    
},

    // toggle fav
    async toogleFav(id){
        try{ 
    const res=await api.post(`/favourites/${id}`)
    return res.data
        }catch(error){
            console.error('Error toggling favorite:', error);
            throw new Error(
                 
                'Failed to toggle favorite'
            );
        }    
    },

// check fav
    async isFav(id){
        try{ 
    const res=await api.get(`/favourites/isFav/${id}`)
    return res.data
        }catch(error){
            console.error('Error checking favorite:', error);
            throw new Error(
                 
                'Failed to check favorite'
            );
        }    
    },


    // remove fav items
    async clearFavs(){
        try{ 
    const res=await api.delete(`/favourites/clear`)
    return res.data
        }catch(error){
            console.error('Error clearing favorites:', error);
            throw new Error(
                 
                'Failed to clear favorites'
            );
        }    
    }



}