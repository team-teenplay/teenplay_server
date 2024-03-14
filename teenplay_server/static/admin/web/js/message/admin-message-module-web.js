const adminMessageService = (() => {
    // 페이지 데이터 불러오기
    const getPagination = async (page, callback) => {
        console.log(10000)
        const response = await fetch(`/admin/messages/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }


    // 상세보기 데이터 가져오기
    const showDetail = async (page, targetId, callback) => {
        const response = await fetch(`/admin/messages/${page}?targetId=${targetId}`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }


    // 쪽지 삭제
    const remove = async (page, targetId) => {
        const message_id = targetId.targetId

        await fetch(`/admin/messages/${page}?message_id=${message_id}`, {
            method: 'fetch',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'message_id': message_id})
        });
    }

    // 검색하기
    const search = async (page, category, type, keyword, callback) => {
        const response = await fetch(`/admin/messages/${page}?category=${category}&type=${type}&keyword=${keyword}`)
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }

        return pagination;
    }

    return { getPagination: getPagination, remove: remove, search:search, showDetail:showDetail }
})();
