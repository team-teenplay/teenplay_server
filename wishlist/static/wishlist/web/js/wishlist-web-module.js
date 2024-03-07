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

    const getList = async (page, callback) => {
        const response = await fetch(`/wishlist/list/${page}`);
        const wishlists = await response.json();
        if (callback) {
            return callback(wishlists);
        }
        return wishlists;
    }

    return {write: write, getList: getList}
})();