// fetch로 각 탭에 해당하는 정보 가져오는 함수
const clubDetailService = (() => {
    const getClubMemberInfo = async (memberId, club, callback) => {
        let url = `/club/club-members/api/?member_id=${memberId}&club_id=${club.id}`
        const response = await fetch(url);
        const clubMembers = await response.json();

        await callback(clubMembers)
    }

    const getClubActivities = async (club, callback) => {
        const url = `/club/club-activities/api/?club_id=${club.id}`
        const response = await fetch(url)
        const activities = await response.json()

        return callback(activities);
    }

    const getClubNotices = async (club, callback) => {
        const response = await fetch(`/club/club-notices/api/?club_id=${club.id}`)
        const notices = await response.json()

        await callback(notices)
    }

    const updateClubMemberStatus = async (club, memberId) => {
        await fetch(`/club/club-members/api/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({'club_id': club.id, 'member_id': memberId})
        });
        await getClubMemberInfo(memberId, club, createClubTopBtn);
    }

    return { caList: getClubActivities, cnList: getClubNotices, cmInfo: getClubMemberInfo, update: updateClubMemberStatus }
})()