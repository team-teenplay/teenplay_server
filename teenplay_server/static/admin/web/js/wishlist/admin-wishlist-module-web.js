const adminWishlistService = (() => {
    const getPagination = async (page, callback) => {
        console.log("들어옴")
        const response = await fetch(`/admin/wishlists/${page}/`);
        const pagination = await response.json();
        console.log("들어옴")

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    return { getPagination: getPagination }
})()