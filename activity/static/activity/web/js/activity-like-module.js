const activityLikeCountService = (() => {
    const getCount = async (activityId, callback) => {
        const response = await fetch(`/activity/likes/api?id=${activityId}`);
        const likeCount = await response.json();
        if (callback) {
            callback(likeCount);
        }
    }

    return {getCount: getCount}
})()