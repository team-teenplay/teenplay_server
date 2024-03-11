const teenplayClubService = (() => {
    const getList = async (clubId, page, callback) => {
        const response = await fetch(`/teenplay/club/select/api/${clubId}/${page}/`);
        const teenplayList = await response.json();
        if (callback){
            return callback(teenplayList)
        }
        return teenplayList
    }
    return {getList: getList}
})()