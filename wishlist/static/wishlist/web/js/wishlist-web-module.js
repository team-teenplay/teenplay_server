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
        const wishlists = await response.json();
        if (callback) {
            return callback(wishlists);
        }
        return wishlists;
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

    const taggetList = async (wishlistId, callback) => {
        const response = await fetch(`/wishlist/tag/list/?id=${wishlistId}`);

        const tags = await response.json();
        if (callback) {
            return callback(tags);
        }
        return tags;
    }

    return { write: write, getList: getList, replyWrite:replyWrite, replygetList:replygetList, taggetList:taggetList }
})();