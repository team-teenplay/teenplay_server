const adminPromoteService = (() => {
    // 페이지 가져오기
    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/promotes/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }


    // 상세보기 가져오기
    const showDetail = async (page, targetId, callback) => {
        console.log(targetId)

        const response = await fetch(`/admin/promotes/${page}?targetId=${targetId}`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }


    // 게시글 삭제
    const remove = async (targetId) => {
        const promote_id = targetId.targetId

        await fetch(`/admin/promotes/delete/${promote_id}/`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'promote_id': promote_id})
        });
    }

    // 검색하기
    const search = async (page, type, keyword, callback) => {
        console.log(type)
        console.log(keyword)
        const response = await fetch(`/admin/promotes/${page}?type=${type}&keyword=${keyword}`)
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }

        return pagination;
    }

    return { getPagination: getPagination, remove: remove, search:search, showDetail:showDetail }
})();