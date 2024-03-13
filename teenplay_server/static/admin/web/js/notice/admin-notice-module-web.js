// 공지사항 관리자 서비스 생성
const adminNoticeService = (() => {
    // const write = async (notice) => {
    //     const response= await fetch("/admin/notice/", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8',
    //             'X-CSRFToken': csrf_token
    //         },
    //         body: JSON.stringify(notice)
    //     });
    // }

    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/notices/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    const getCategory = async (page, category, callback) => {
        const response = await fetch(`/admin/notices/${page}?category=${category}`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }


    // 공지사항 삭제
    const remove = async (targetId) => {
        const notice_id = targetId.targetId

        await fetch(`/admin/notices/delete/${notice_id}/`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'notice_id': notice_id})
        });
    }

    // 검색하기
    const search = async (page, category, keyword, callback) => {

        const response = await fetch(`/admin/notices/${page}/?category=${category}&keyword=${keyword}`)
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }

        return pagination;
    }

    return {getPagination:getPagination, getCategory: getCategory, remove: remove, search:search}
})();
