// 유저 정보 가져오기
const adminUserService = (() => {
    // 페이지 가져오기
    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/users/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    // 카테고리 검색
    const getCategory = async (page, categories, callback) => {
        const category = parseInt(categories)

        const response = await fetch(`/admin/users/${page}?category=${category}`);
        const pagination = await response.json();


        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    const remove = async (targetId) => {
        const member_id = targetId.targetId

        await fetch(`/admin/user/update/${member_id}/`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'member_id': member_id})
        });

    }

    return {getPagination:getPagination, getCategory:getCategory, remove:remove}
})();
