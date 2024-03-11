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

    // // 공지사항 목록 가져오기
    // const getList = async (page, callback) => {
    //     const response = await fetch(`/admin/notice/${page}/`);
    //     const notices = await response.json();
    //     console.log(notices)
    //     if (callback){
    //         return callback(notices);
    //     }
    //     return notices;
    // }

    // const getPagination = async (callback) => {
    //     const pagination = {};
    //     callback(pagination)
    // }

    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/notices/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    const getCategory = async (page, categories, callback) => {
        const category = parseInt(categories)

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

        await fetch(`/admin/notice/delete/${notice_id}`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'notice_id': notice_id})
        });

    }

    return {getPagination:getPagination, getCategory: getCategory, remove: remove}
})();
