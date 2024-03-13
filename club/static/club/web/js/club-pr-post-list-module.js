const clubPostListService = (() => {
    const getList = async (page, category, ordering, keyword, callback) => {
        const response = await fetch('/clubs/pr-post-list/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({
                page: page,
                category: category,
                ordering: ordering,
                keyword: keyword
            })
        })
        const clubPostList = await response.json()

        if(callback) {
            return  callback(clubPostList)
        }
        return clubPostList
    }

    return {getList: getList}
})();