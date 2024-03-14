const adminActivityService = (() => {
    // 페이지 가져오기
    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/activities/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }


    // 상세보기 가져오기
    const showDetail = async (page, targetId, callback) => {
        console.log(targetId)

        const response = await fetch(`/admin/activities/${page}?targetId=${targetId}`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }


    // 위시리스트 삭제
    const remove = async (targetId) => {
        const activity_id = targetId.targetId

        await fetch(`/admin/activities/delete/${activity_id}/`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'activity_id': activity_id})
        });
    }

    // 검색하기
    const search = async (page, category, type, keyword, callback) => {
        const response = await fetch(`/admin/activities/${page}?category=${category}&type=${type}&keyword=${keyword}`)
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }

        return pagination;
    }

    return { getPagination: getPagination, remove: remove, search:search, showDetail:showDetail }
})();