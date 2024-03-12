const wishlistService = (() => {
    const write = async (wishlist) => {
        const response = await fetch("/wishlist/write/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify(wishlist)
        });
    }

    const getList = async (page, category, callback) => {
        const response = await fetch(`/wishlist/list/${page}/?category=${category}`);
        const data = await response.json();
        if (callback) {
            return callback(data);
        }
        return data;
    }

    const replyWrite = async (reply) => {
        const response = await fetch("/wishlist/reply/write/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify(reply)
        });
    }

    const replygetList = async (wishlistId, callback) => {
        const response = await fetch(`/wishlist/reply/list/?id=${wishlistId}`);

        const replies = await response.json();
        if (callback) {
            return callback(replies);
        }
        return replies;
    }

    const wishlistRemove = async (wishlistId) => {
        await fetch(`/wishlist/${wishlistId}/`, {
            method: 'post',
            headers: {'X-CSRFToken': csrf_token}
        });
    }

    const wishlistUpdate = async (wishlist) => {
        await fetch(`/wishlist/${wishlist.wishlistId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'wishlist_content': wishlist.wishlistContent})
        });
    }

    const replyRemove = async (replyId) => {
        await fetch(`/wishlist/reply/${replyId}/`, {
            method: 'post',
            headers: {'X-CSRFToken': csrf_token}
        });
    }

    const replyUpdate = async (reply) => {
        await fetch(`/wishlist/reply/${reply.replyId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'reply_content': reply.replyContent})
        });
    }


    return { write: write, getList: getList, replyWrite:replyWrite, replygetList:replygetList, wishlistRemove:wishlistRemove, wishlistUpdate:wishlistUpdate, replyRemove:replyRemove, replyUpdate:replyUpdate }
})();