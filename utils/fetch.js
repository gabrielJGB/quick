export const fetchAvailableLanguages = async () => {

    try {
        const url = `https://kick.com/stream/languages`
        const res = await fetch(url)
        const data = await res.json()
        return data

    } catch (error) {
        throw error
    }

}

export const fetchStreamerData = async (username) => {

    try {
        const url = `https://kick.com/api/v1/users/${username}`
        const res = await fetch(url,{"cache":"force-cache"})
        const data = await res.json()
        return data

    } catch (error) {
        throw error
    }

}

export const fetchSearchQuery = async (query) => {

    try {
        const url = `https://kick.com/api/search?searched_word=${query}`
        const res = await fetch(url)
        const data = await res.json()
        return data

    } catch (error) {
        throw error
    }

}


export const fetchStreamerLinks = async (username) => {

    try {
        const url = `https://kick.com/api/v1/channels/${username}/links`
        const res = await fetch(url)
        const data = await res.json()
        return data

    } catch (error) {
        throw error
    }

}


export const fetchFeatured = async (lang,subcategory,limit) => {

 
    try {
        // const url = `https://kick.com/stream/featured-livestreams/${lang}?page=${page}?_=${new Date().getTime()}`
        //              
        const url = `https://kick.com/stream/livestreams/${lang}?page=1&limit=${limit}&subcategory=${subcategory}&sort=featured&strict=true`

        // const urll = `https://api.kick.com/private/v1/livestreams?languages=${lang}&sort=featured&order=desc&limit=${limit}&_=${new Date().getTime()}`
        const res = await fetch(url) 

        if (res.status.error)
            throw Error(res.status.message)
        const data = await res.json()


        return data

    } catch (error) {
        throw error
    }

}

export const fetchCategories = async () => {

 
    try {
        // const url = `https://kick.com/stream/featured-livestreams/${lang}?page=${page}?_=${new Date().getTime()}`
        //              
        const url = `https://kick.com/api/v1/subcategories?limit=40`
        const res = await fetch(url) 

        if (res.status.error)
            throw Error(res.status.message)

        const data = await res.json()

        return data.data

    } catch (error) {
        throw error
    }

}

export const fetchLivestream = async (slug) => {

    try {

        const url = `https://kick.com/api/v2/channels/${slug}/livestream?_=${new Date().getTime()}`
        const res = await fetch(url)
        const data = await res.json()
        return data

    } catch (error) {
        console.log(error);
        return {data:null}
    }

}

export const fetchFollowers = async (channelId) => {

    try {

        const url = `https://api.kick.com/channels/${channelId}/followers-count`
        const res = await fetch(url)
        const data = await res.json()
        
        return data?.data?.count

    } catch (error) {
        throw error
    }

}



export const fetchUser = async (slug) => {

    try {

        const url = `https://kick.com/api/v2/channels/${slug}`
        const res = await fetch(url)
        const data = await res.json()
        return data

    } catch (error) {
        throw {data:null}
    }

}


export const fetchUserClips = async (slug) => {

    try {
        const url = `https://kick.com/api/v2/channels/${slug}/clips`
        const res = await fetch(url)
        const data = await res.json()
        return data

    } catch (error) {
        throw error
    }

}

export const fetchViewers = async (channelId) => {
    try {
        const url = `https://kick.com/current-viewers?ids[]=${channelId}`
        const res = await fetch(url)
        const data = await res.json()

        

        if(!"viewers" in data[0])
            return false
        else if(data.length === 0)
            return false

        return data[0]

    } catch (error) {
        return false
    }

}


export const fetchUserVideos = async (slug) => {

    try {
        const url = `https://kick.com/api/v2/channels/${slug}/videos`
        const res = await fetch(url, { "cache": "no-cache" })



        const data = await res.json()

        return data

    } catch (error) {
        throw error
    }

}

export const fetchProfileUri = async (username) => {

    try {
        const url = `https://kick.com/api/v1/users/${username}`
        const res = await fetch(url,{"cache":"force-cache"})
        const data = await res.json()
        return data

    } catch (error) {
        throw error
    }

}

