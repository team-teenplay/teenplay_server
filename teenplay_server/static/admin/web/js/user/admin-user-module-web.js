// 유저 정보 가져오기
const adminUserService = (() => {
    // 비동기
    const users = async (user) => {
        const response = await fetch("/admin/user/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify(user)
        });
    };

    // 유저 목록 가져오기
    const getList = async (callback) => {
        const response = await fetch(`/admin/user/`);
        const users = await respon.json();
        if (callback){
            return callback(users);
        }
        return users;
    }

    // 유저 정보 수정하기
    const update = async (id, status) => {
        const user_id = id.user_id;
        const user_status = status.status;
        await fetch(`/admin/user/update/${user_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'status': user_status})
        });

        location.reload()
    }

    return {users: users, getList: getList, update: update}
})();
