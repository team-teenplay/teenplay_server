// 공개여부 및 전체를 선택하는 버튼 클릭 시 모달 열기
const sortingBtn = document.querySelector(".sorting-btn");
const sortingListUl = document.querySelector(".sorting-list-ul");

document.addEventListener("click", (e) => {
    if (!e.target.closest(".sorting-box")) {
        sortingListUl.classList.remove("block");
    } else if (e.target.closest(".sorting-btn") || e.target.closest(".sorting-list-ul")) {
        sortingListUl.classList.toggle("block");
    }
});

// tap을 클릭 시 tabListBtn의 text에 tap을 안의 text로 바꿔준다
const sortingTargets = document.querySelectorAll(".sorting-target");

const clubActivitiesContents = document.querySelector('.club-activities-contents')
const createList = (sortList) => {
    let activityHTML = ``
    if (!sortList) return
    sortList.forEach((activity) => {
        activityHTML += `
            <div>
                <div class="top-line"></div>
                <div class="club-activity-content">
                    <!-- 활동 id -->
                    <div class="club-activity-number">${activity.id}</div>
                    <!-- 활동 조회수 -->
                    <div class="club-activity-hits">4</div>
                    <div class="club-activity-title">
                        <!-- 활동 관리 페이지 주소, 제목 필요 -->
                        <a class="club-activity-link" href="">${activity.activity_title}</a>
                    </div>
                    <div class="club-activity-date">${activity.activity_start}</div>
                    <div class="club-activity-open-date">${activity.created_date}</div>
                </div>
            </div>
        `
    })
    clubActivitiesContents.innerHTML = activityHTML
}

const activityListHandler = async (sort = '최신 개설순') => {
    const sortList = await mypageActivityService.list(club_id, sort)
    createList(sortList)
}
activityListHandler()

sortingTargets.forEach((sortingTarget) => {
    sortingTarget.addEventListener("click", () => {
        sortingBtn.firstElementChild.innerText = sortingTarget.innerText;
        activityListHandler(sortingBtn.firstElementChild.innerText)
    });
});


