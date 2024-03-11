const adminWishlistService = (() => {
    // 페이지 가져오기
    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/wishlists/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    // 공지사항 삭제
    const remove = async (targetId) => {
        const wishlist_id = targetId.targetId
        console.log(wishlist_id)

        await fetch(`/admin/notice/delete/${wishlist_id}/`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'wishlist_id': wishlist_id})
        });

    }

    return { getPagination: getPagination, remove: remove }
})()