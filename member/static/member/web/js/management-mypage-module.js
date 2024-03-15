const mypageActivityService = (() => {
    const list = async (club_id, sort = '최신 개설순', page = 1) => {
        const response = await fetch(`/member/mypage-activity-list/${club_id}/`, {
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
    const del = async (club_id, delList) => {
        await fetch(`/member/mypage-notice-list/${club_id}/`, {
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
    const list = async (club_id,filter = '전체 상태', search='') => {
        const response = await fetch(`/member/mypage-member-filter/${club_id}/`, {
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
    const del = async (club_id,memberId) => {
        const response = await fetch(`/member/mypage-member-status/${club_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'member_id': memberId})
        });
        return await response.json();
    }
    const patch = async (club_id, memberId) => {
        console.log(memberId)
        const response = await fetch(`/member/mypage-member-status/${club_id}/`, {
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

const mypageSendLetterService = (() => {
    const post = async (letter) => {
        // console.log(letter)
        // const response = await fetch(`/member/mypage-send-letter/api/`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8',
        //         'X-CSRFToken': csrf_token
        //     },
        //     body: JSON.stringify({'letter': letter})
        // });
        // return await response.json();
    }
    return {post: post}
})()

const mypageClubListService = (() => {
    const list = async (sort='') => {
        console.log(sort)
        const response = await fetch(`/member/mypage-my-club/api/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({'sort': sort})
        });
        return await response.json();
    }
    return {list: list}
})()

const mypageClubAlarmStatusService = (() => {
    const alarm = async (clubId) => {
        const response = await fetch(`/member/mypage-my-club-alarm/${clubId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrf_token
            },
        });
        return await response.json();
    }

    return {alarm: alarm}
})()