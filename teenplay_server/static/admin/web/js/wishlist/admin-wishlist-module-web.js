const adminWishlistService = (() => {
    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/notices/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    return { getPagination: getPagination }
})