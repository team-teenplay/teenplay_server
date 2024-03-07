const activityReplyService = (() => {
    const write = async (activityReply) => {
        await fetch();
    };

    const getList = async (page, activityId, callback) => {
        const response = await fetch(`/activity/replies/api/?page=${page}&activity-id=${activityId}/`);
        const replies = await response.json();
        if (callback) {
            callback(replies);
        }
    }

    const update = async () => {
        await fetch();
    }

    const remove = async () => {
        await fetch();
    }

    return {write: write, getList: getList, update: update, remove: remove}
})()