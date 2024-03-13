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

    // 카테고리 고르기
    const getCategory = async (page, category, callback) => {
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

    // 검색하기
    const search = async (page, category, keyword, callback) => {
        console.log(category)
        const response = await fetch(`/admin/users/${page}/?category=${category}&keyword=${keyword}`)
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }

        return pagination;
    }

    return {getPagination:getPagination, getCategory:getCategory, remove:remove, search:search}
})();
