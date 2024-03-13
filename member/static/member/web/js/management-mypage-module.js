const mypageActivityService = (() => {
    const list = async (sort = '최신 개설순', page = 1) => {
        console.log(sort)
        const response = await fetch(`/member/mypage-activity-list/api/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'sort': sort, 'page': page})
        });
        return await response.json();
    }
    return {list: list}
})()


const clubNoticeService = (() => {
    const del = async (delList) => {
        console.log(delList)
        await fetch(`/member/mypage-notice/api/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'del_list': delList})
        });
    }
    return {del: del}
})()

const mypageMemberService = (() => {
    const list = async (filter = '전체 상태', search='') => {
        const response = await fetch(`/member/mypage-member-filter/api/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'filter': filter, 'search':search})
        });
        return await response.json();
    }
    return {list: list}
})()

const mypageMemberStatusService = (() => {
    const del = async (memberId) => {
        console.log(memberId)
        const response = await fetch(`/member/mypage-member-status/api/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'member_id': memberId})
        });
        return await response.json();
    }
    const patch = async (memberId) => {
        console.log(memberId)
        const response = await fetch(`/member/mypage-member-status/api/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'member_id': memberId})
        });
        return await response.json();
    }
    return {del: del, patch: patch}
})()