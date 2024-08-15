export const getM3U8Content = async (url) => {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching M3U8 file:', error);
        return null;
    }
}


export const parseM3U8Content = (m3u8Content) => {
    const lines = m3u8Content.split('\n');
    const resolutions = [];
    let currentResolution = null;

    lines.forEach((line) => {
        if (line.startsWith('#EXT-X-STREAM-INF')) {
            const resolutionMatch = line.match(/RESOLUTION=(\d+x\d+)/);
            if (resolutionMatch) {
                currentResolution = {
                    resolution: resolutionMatch[1].split("x")[1],
                };
            }
        } else if (line && currentResolution) {
            currentResolution.url = line.trim();
            resolutions.push(currentResolution);
            currentResolution = null;
        }
    });

    return resolutions;
}


export const transformURL = (url) => {

    if (!url)
        return false

    const regex = /https:\/\/kick-files-prod\.s3\.us-west-2\.amazonaws\.com\/images\/user\/(\d+)\/profile_image\/conversion\/([\w-]+)-fullsize\.(\w+)/;
    const newUrl = url.replace(regex, 'https://files.kick.com/images/user/$1/profile_image/conversion/$2-fullsize.$3');
    return newUrl;
}



export const  formatFollowersCount = (count)  => {
    if (count < 1000) {
        return count.toString();
    } else if (count >= 1000 && count < 1000000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
        return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
}