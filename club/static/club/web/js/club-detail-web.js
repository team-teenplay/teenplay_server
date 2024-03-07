// 상단 모임 버튼
// 모임 이름 받아와서 넣어야함(아래는 예시)
const clubName = document.querySelector(".club-detail-name").innerText;

// 관리하기 버튼 클릭 시 모임 관리 페이지로 이동
const manageBtnEvent = () => {
    document.getElementById("manage").addEventListener("click", () => {
        window.location.href = ``
    })
}

// 가입신청 버튼 클릭 시 모달창 출력
const applyBtnEvent = () => {
    document.getElementById("apply").addEventListener("click", () => {
        Swal.fire({
            title: "가입신청하시겠습니까?",
            text: `[${clubName}] 모임에 가입을 신청합니다.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "신청",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.value) {
                clubDetailService.update(club, memberId)
                // 가입신청 관련 서버 작업 코드 입력
                Swal.fire("신청 완료", `[${clubName}] 모임에 가입 신청이 완료되었어요!`, "success");
            } else if (result.dismiss === "cancel") {
                return;
            }
        });
    });
}

// 승인대기 버튼 클릭 시 신청취소 모달창 출력
const cancelBtnEvent = () => {
    const cancelBtn = document.getElementById("cancel");
    cancelBtn.addEventListener("click", () => {
        Swal.fire({
            title: "가입신청을 취소하시겠습니까?",
            text: '승인대기 중입니다. 취소하시려면 "신청취소"를 눌러주세요.',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "신청취소",
            cancelButtonText: "닫기",
        }).then((result) => {
            if (result.value) {
                clubDetailService.update(club, memberId)
                // 신청취소 관련 서버 작업 코드 입력
                Swal.fire("취소 완료", "가입 신청을 취소하였습니다.", "success");
            } else if (result.dismiss == "cancel") {
                return;
            }
        });
    });
}


// 탈퇴하기 버튼 클릭 시 탈퇴하기 모달창 출력
const quitBtnEvent = () => {
    const quitBtn = document.getElementById("quit");
    quitBtn.addEventListener("click", () => {
        Swal.fire({
            title: "모임을 탈퇴하시겠습니까?",
            text: `[${clubName}] 모임에서 탈퇴합니다.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "탈퇴",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.value) {
                clubDetailService.update(club, memberId)
                // 모임탈퇴 관련 서버 작업 코드 입력
                Swal.fire("모임 탈퇴", `[${clubName}] 모임에서 탈퇴하였습니다.`, "success");
            } else if (result.dismiss == "cancel") {
                return;
            }
        });
    });
}

// 조회 결과에 따라 모임 상단 버튼을 바꿔주는 함수
const createClubTopBtn =  (clubMembers) => {
    const clubTopButtonBoxes = document.querySelector(".club-top-button-boxes")
    let clubMember = clubMembers[0]
    if (clubMembers.length === 0) {
        if (memberId === club.owner_id) {
            clubTopButtonBoxes.innerHTML = `
                <button id="manage" class="club-top-button manage">
                    <span>관리하기</span>
                </button>
            `;
            manageBtnEvent();
        } else{
            clubTopButtonBoxes.innerHTML = `
                <button id="apply" class="club-top-button apply">
                    <span>가입신청</span>
                </button>
            `;
            applyBtnEvent()
        }
    } else if (clubMember.status === -1) {
        clubTopButtonBoxes.innerHTML = `
            <button id="cancel" class="club-top-button cancel">
                <span>신청취소</span>
            </button>
        `;
        cancelBtnEvent()
    } else if (clubMember.status === 1) {
        clubTopButtonBoxes.innerHTML = `
            <button id="quit" class="club-top-button quit">
                <span>탈퇴하기</span>
            </button>
        `;
        quitBtnEvent()
    } else{
        clubTopButtonBoxes.innerHTML = `
            <button id="apply" class="club-top-button apply">
                <span>가입신청</span>
            </button>
        `;
        applyBtnEvent()
    }
}

// 활동 부분
const clubServiceWrap = document.querySelector("#club-service-wrap");
const activityFilterWrap = document.querySelector(".club-detail-filter-event");
const activityFilterBtn = document.querySelector(".club-detail-filter-event .club-detail-filter-button");
const infoFilterWrap = document.querySelector(".club-detail-filter-info");
const infoFilterBtn = document.querySelector(".club-detail-filter-info .club-detail-filter-button");
const tpFilterWrap = document.querySelector(".club-detail-filter-teenplay");
const tpFilterBtn = document.querySelector(".club-detail-filter-teenplay button");
const activityContent = document.querySelector("div.club-detail-desc-container");
const infoContent = document.querySelector(".club-info");
const tpContent = document.querySelector(".club-teenplay");
const noticeFilterWrap = document.querySelector(".club-detail-filter-notice");
const noticeFilterBtn = document.querySelector(".club-detail-filter-notice .club-detail-filter-button");
const noticeContent = document.querySelector(".club-notice");
const clubDetailActiveWrap = document.querySelector(".club-detail-active-wrap")

clubDetailService.caList(club, createListService.showOngoingList).then((text) => {
    clubServiceWrap.innerHTML = text;
})