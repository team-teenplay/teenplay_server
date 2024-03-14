const adminCommentService = (() => {
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
    const remove = async (replyId, memberId, createdDate) => {
        const reply_id = replyId
        const reply_member_id = memberId
        const created_date = createdDate

        await fetch(`/admin/comments/delete/?reply_id=${reply_id}&reply_member_id=${reply_member_id}&created_date=${created_date}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'reply_id': reply_id, 'reply_member_id': reply_member_id, 'created_date': created_date})
        });
    }

    // 검색하기
    const search = async (page, category, type, keyword, callback) => {
        const response = await fetch(`/admin/comments/${page}?category=${category}&type=${type}&keyword=${keyword}`)
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }

        return pagination;
    }

    return {getPagination:getPagination, getCategory:getCategory, remove:remove, search:search}
})();

