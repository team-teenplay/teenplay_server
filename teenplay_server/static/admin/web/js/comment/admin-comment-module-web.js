const admincommentService = (() => {
    const getPagination = async (page, callback) => {
        const response = await fetch(`/admin/comments/${page}/`);
        const pagination = await response.json();

        if (callback){
            return callback(pagination);
        }
        return pagination;
    }

    return {}
})();