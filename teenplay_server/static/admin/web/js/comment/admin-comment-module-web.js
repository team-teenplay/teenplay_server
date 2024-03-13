const admincommentService = (() => {
    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/comments/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    // 카테고리 검색
    const getCategory = async (page, category, callback) => {
        const response = await fetch(`/admin/comments/${page}?category=${category}`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    // 댓글 삭제
    const remove = async (targetId) => {
        const comment_id = targetId.targetId

        await fetch(`/admin/comments/delete/${comment_id}/`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'comment_id': comment_id})
        });
    }

    // 검색하기
    const search = async (page, category, type, keyword, callback) => {
        const response = await fetch(`/admin/comments/${page}/${page}?category=${category}&type=${type}&keyword=${keyword}`)
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }

        return pagination;
    }

    return {getPagination:getPagination, getCategory:getCategory, remove:remove, search:search}
})();

