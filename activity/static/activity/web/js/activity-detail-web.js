// // 관심 활동 클릭 시 이미지 변경 및 모달창 띄우기
let heartCheck = document.querySelector(".like-act-button");
// 관심 행사 클릭 시 모달창 띄우고 삭제하기 위해 확인
let likeModal = document.querySelector(".k-club-modal-wrap");

let likeTextIcon = document.querySelector(".k-club-modal-like-title-text");
let likeTextIconDelete = document.querySelector(".k-club-modal-like-title-text-delete");


// 관심 활동 추가/삭제 모듈
const addActivityLike = async (activityId, isCreate) => {
    await fetch(`/activity/like?id=${activityId}&is-create=${isCreate}`);
}


// 하트 이미지 색상 변경 함수
const heartColor = document.querySelector(".like-act-button-image");

// 관심 활동 모달창 출력/숨김
const addLikeModal = () => {
    likeModal.style.display = "block";
    likeTextIcon.style.display = "flex";
    likeTextIconDelete.style.display = "none";
}
const cancelLikeModal = () => {
    likeModal.style.display = "block";
    likeTextIcon.style.display = "none";
    likeTextIconDelete.style.display = "flex";
}
const changeHeartColor = () => {
    let color = window.getComputedStyle(heartColor);
    // 하트가 비어있다면
    if (heartColor && color.getPropertyValue("fill") === "none") {
        heartColor.style.fill = "#CE201B";
        return true;
    }
    heartColor.style.fill = "none";
    return false;
}

// 이미 관심활동이라면 하트 채워놓기
const isLike = document.querySelector("input[name=is-like]").value;
if (isLike === 'True') {
    changeHeartColor();
}

heartCheck.addEventListener("click", async (e) => {
    let check = changeHeartColor();
    let activityId = document.querySelector("input[name=activity-id]").value;
    if (check) {
        await addActivityLike(activityId, true);
        addLikeModal();
    }
    else {
        await addActivityLike(activityId, false);
        cancelLikeModal();
    }
});


// 관심 활동 선택 후 닫기 버튼을 클릭했을 때 모달창 닫기
let closeLikeModal = document.querySelector(".k-club-modal-like-button");
closeLikeModal.addEventListener("click", (e) => {
    likeModal.style.display = "none";
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// // 특정 버튼 클릭 시 해당 위치로 이동
document.querySelector(".act-intro").addEventListener("click", () => {
    // 이동하려는 대상 div 선택
    const targetDiv = document.querySelector(".summary-box-one");

    window.scrollTo({
        top: targetDiv.offsetTop,
        behavior: "smooth",
    });
});

document.querySelector(".act-location").addEventListener("click", () => {
    const targetDiv = document.querySelector(".filp-more");

    window.scrollTo({
        top: targetDiv.offsetTop,
        behavior: "smooth",
    });
});

document.querySelector(".act-info").addEventListener("click", () => {
    const targetDiv = document.querySelector(".map-text-content-box");

    window.scrollTo({
        top: targetDiv.offsetTop,
        behavior: "smooth",
    });
});

document.querySelector(".act-noti").addEventListener("click", () => {
    const targetDiv = document.querySelector(".feed-main-title-box");

    window.scrollTo({
        top: targetDiv.offsetTop,
        behavior: "smooth",
    });
});

// document.querySelector(".act-inquiry").addEventListener("click", () => {
//     const targetDiv = document.querySelector(".feed-item");
//
//     window.scrollTo({
//         top: targetDiv.offsetTop,
//         behavior: "smooth",
//     });
// });

document.querySelector(".act-suggestion").addEventListener("click", () => {
    const targetDiv = document.querySelector(".activity-list-more-title");

    window.scrollTo({
        top: targetDiv.offsetTop - 30,
        behavior: "smooth",
    });
});

// document.querySelector(".act-cancel").addEventListener("click", () => {
//     const targetDiv = document.querySelector(".policy-title");
//
//     window.scrollTo({
//         top: targetDiv.offsetTop,
//         behavior: "smooth",
//     });
// });
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// // 특정 위치로 이동되었을 때 act 아래쪽에 줄이 생기는 액션
// 버튼 선택 시 스타일 변경을 위한 설정  (버튼의 클래스에 따라 변경)
let introLine = document.querySelector(".act-intro");
let locationLine = document.querySelector(".act-location");
let infoLine = document.querySelector(".act-info");
let notiLine = document.querySelector(".act-noti");
// let inquiryLine = document.querySelector(".act-inquiry");
let suggetsionLine = document.querySelector(".act-suggestion");

// 특정 div의 위치를 설정
let targetEndContainerDiv = document.querySelector(".flex-items-end-container");
let targetMapDiv = document.querySelector(".map-text-title");
let targetFeedDiv = document.querySelector(".feed-main-title-box");
let targetCommentDiv = document.querySelector(".comment-title");
let targetActivityMore = document.querySelector(".activity-list-more-title");

window.addEventListener("scroll", function () {
    let targetEndContainerPosition = targetEndContainerDiv.offsetTop;
    let targetMapPosition = targetMapDiv.offsetTop;
    let targetFeedPosition = targetFeedDiv.offsetTop;
    let targetCommentPosition = targetCommentDiv.offsetTop;
    let targetActivityMorePosition = targetActivityMore.offsetTop;

    if (document.documentElement.scrollTop < targetEndContainerPosition) {
        // 스크롤 위치에 따라 적절히 조정
        introLine.style.borderBottomWidth = "2px";
        introLine.style.color = "#ce201b";
        locationLine.style.color = "";
        locationLine.style.borderColor = "";
        infoLine.style.color = "";
        infoLine.style.borderColor = "";
        notiLine.style.color = "";
        notiLine.style.borderColor = "";
        // inquiryLine.style.color = "";
        // inquiryLine.style.borderColor = "";
        suggetsionLine.style.color = "";
        suggetsionLine.style.borderColor = "";
    }
    // 행사장소
    if (document.documentElement.scrollTop >= targetEndContainerPosition && document.documentElement.scrollTop < targetMapPosition) {
        locationLine.style.color = "#ce201b";
        locationLine.style.borderColor = "#ce201b";
        introLine.style.borderBottomWidth = "0";
        introLine.style.color = "rgb(135 141 145 / var(--tw-text-opacity))";
        introLine.style.transition = "color 0.2s, border-bottom-color 0.2s";
        infoLine.style.color = "";
        infoLine.style.borderColor = "";
        notiLine.style.color = "";
        notiLine.style.borderColor = "";
        // inquiryLine.style.color = "";
        // inquiryLine.style.borderColor = "";
        suggetsionLine.style.color = "";
        suggetsionLine.style.borderColor = "";
    }
    // 행사 정보
    if (document.documentElement.scrollTop >= targetMapPosition && document.documentElement.scrollTop < targetFeedPosition) {
        locationLine.style.color = "";
        locationLine.style.borderColor = "";
        notiLine.style.color = "";
        notiLine.style.borderColor = "";
        // inquiryLine.style.color = "";
        // inquiryLine.style.borderColor = "";
        suggetsionLine.style.color = "";
        suggetsionLine.style.borderColor = "";
        infoLine.style.color = "#ce201b";
        infoLine.style.borderColor = "#ce201b";
        introLine.style.transition = "color 0.3s, border-bottom-color 0.3s";
    }
    // 행사 공지
    if (document.documentElement.scrollTop >= targetFeedPosition && document.documentElement.scrollTop < targetCommentPosition) {
        locationLine.style.color = "";
        locationLine.style.borderColor = "";
        infoLine.style.color = "";
        infoLine.style.borderColor = "";
        // inquiryLine.style.color = "";
        // inquiryLine.style.borderColor = "";
        suggetsionLine.style.color = "";
        suggetsionLine.style.borderColor = "";
        notiLine.style.color = "#ce201b";
        notiLine.style.borderColor = "#ce201b";
        notiLine.style.transition = "color 0.3s, border-bottom-color 0.3s";
    }
    // 행사 문의 (댓글)
    if (document.documentElement.scrollTop >= targetCommentPosition && document.documentElement.scrollTop < targetActivityMorePosition) {
        locationLine.style.color = "";
        locationLine.style.borderColor = "";
        infoLine.style.color = "";
        infoLine.style.borderColor = "";
        notiLine.style.color = "";
        notiLine.style.borderColor = "";
        suggetsionLine.style.color = "";
        suggetsionLine.style.borderColor = "";
        // inquiryLine.style.color = "#ce201b";
        // inquiryLine.style.borderColor = "#ce201b";
        notiLine.style.transition = "color 0.3s, border-bottom-color 0.3s";
    }
    // 추천
    if (document.documentElement.scrollTop > targetActivityMorePosition) {
        locationLine.style.color = "";
        locationLine.style.borderColor = "";
        infoLine.style.color = "";
        infoLine.style.borderColor = "";
        notiLine.style.color = "";
        notiLine.style.borderColor = "";
        // inquiryLine.style.color = "";
        // inquiryLine.style.borderColor = "";
        suggetsionLine.style.color = "#ce201b";
        suggetsionLine.style.borderColor = "#ce201b";
        suggetsionLine.style.transition = "color 0.1s, border-bottom-color 0.1s";
    }
});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// // 접기 버튼 클릭 시 동작
// 숨겨진 이미지 확인 및 버튼 모양 변경
filpClickBtn = document.querySelector(".filp-button");
filpHiddenClickBtn = document.querySelector(".filp-button-hidden");
filpMoreClickBtn = document.querySelector(".filp-more-hidden");
overflowHidden = document.querySelector(".max-overflow-hidden");
isHiddenShadow = document.querySelector(".is-hidden-shadow");
filpClickBtn.addEventListener("click", (e) => {
    overflowHidden.style.maxHeight = "none";
    isHiddenShadow.style.backgroundImage = "none";
    filpClickBtn.style.display = "none";
    filpHiddenClickBtn.style.display = "flex";
});

filpHiddenClickBtn.addEventListener("click", () => {
    overflowHidden.style.maxHeight = "700px";
    isHiddenShadow.style.backgroundImage = "linear-gradient(to top, var(--tw-gradient-stops))";
    filpClickBtn.style.display = "flex";
    filpHiddenClickBtn.style.display = "none";
});


// 관심행사 추가 시 발생되는 동작
let nonLikeDisplay = document.querySelectorAll(".k-like-btn-shadow");
let nonLikeBtn = document.querySelectorAll(".k-like-btn-display");
let likeBtn = document.querySelectorAll(".k-like-btn-display-none");
let subLikeModal = document.querySelector(".k-club-modal-wrap");
let subLikeTextIcon = document.querySelector(".k-club-modal-like-title-text");
let subLikeTextIconDelete = document.querySelector(".k-club-modal-like-title-text-delete");

const isLikeds = document.querySelectorAll("input[name=is-liked]")
nonLikeDisplay.forEach(async (displayButton, i) => {
    let isLiked = isLikeds[i].value;
    if (isLiked === 'True') {
        nonLikeBtn[i].style.display = "none";
        likeBtn[i].style.display = "flex";
    } else {
        nonLikeBtn[i].style.display = "flex";
        likeBtn[i].style.display = "none";
    }
    await displayButton.addEventListener("click", (e) => {
        nonLikeBtn.forEach(async (nonLikeButton, j) => {
            if (i === j) {
                let recommendedActivityId = document.querySelectorAll("input[name=recommended-activity-id]")[i].value
                if (nonLikeBtn[j].style.display === "none") {
                    await addActivityLike(recommendedActivityId, false);
                    nonLikeBtn[j].style.display = "flex";
                    likeBtn[j].style.display = "none";
                    subLikeModal.style.display = "flex";
                    subLikeTextIcon.style.display = "none";
                    subLikeTextIconDelete.style.display = "flex";

                } else {
                    await addActivityLike(recommendedActivityId, true);
                    nonLikeBtn[j].style.display = "none";
                    likeBtn[j].style.display = "flex";
                    subLikeModal.style.display = "flex";
                    subLikeTextIconDelete.style.display = "none";
                    subLikeTextIcon.style.display = "flex";
                }
            }
        });
    });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 틴친 클릭 시 나오는 모달

// 프로필 클릭 시 틴친 프로필 모달 출력 이벤트
const commentProfileImg = document.querySelector(".k-comment-profile-container");
const profile = document.querySelector(".profile");

if (commentProfileImg){
    commentProfileImg.addEventListener("click", () => {
        profile.classList.remove("hidden");
    });
}

// 틴친 프로필 모달 닫기 이벤트
const teenchinBox = document.querySelector(".teenchin-box");

if (teenchinBox && commentProfileImg){
    document.addEventListener("click", (e) => {
        if (!commentProfileImg.contains(e.target) && !teenchinBox.contains(e.target)) {
            profile.classList.add("hidden");
        }
    });
}

// 쪽지 보내기 클릭 시 쪽지 보내기 모달 출력 이벤트
const sendLetterBoxBtn = document.querySelector(".send-letter-btn");
const sendLetter = document.querySelector(".send-modal-wrap");

if (sendLetterBoxBtn){
    sendLetterBoxBtn.addEventListener("click", () => {
        profile.classList.add("hidden");
        sendLetter.classList.remove("hidden");
    });
}

// 쪽지 보내기 닫기(버튼) 모달 이벤트
const sendLetterCloseBtn = document.querySelector(".send-close-btn");

if (sendLetterCloseBtn){
    sendLetterCloseBtn.addEventListener("click", () => {
        sendLetter.classList.add("hidden");
    });
}

// 쪽지 보내기 닫기(여백) 모달 이벤트
const sendLetterModal = document.querySelector(".send-modal-box");

if (sendLetterModal){
    document.addEventListener("click", (e) => {
        if (!sendLetterBoxBtn.contains(e.target) && !sendLetterModal.contains(e.target)) {
            sendLetter.classList.add("hidden");
        }
    });
}

// 쪽지 보내기 모달 이벤트
const sendLetterBtn = document.querySelector(".send-check-btn");

if (sendLetterBtn){
    sendLetterBtn.addEventListener("click", () => {
        Swal.fire("쪽지가 전송 되었습니다.", "", "success");
    });
}

// 틴친 추가 모달 이벤트
const teenFriendAdd = document.querySelector(".teenchin-add-btn");
const teenFriendRequest = document.querySelector(".teenchin-request-btn");

if (teenFriendAdd){
    teenFriendAdd.addEventListener("click", () => {
        Swal.fire({
            title: "틴친 신청을 보낼까요?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CE201B",
            cancelButtonColor: "#E1E1E1",
            confirmButtonText: "친구추가",
            cancelButtonText: "닫기",
        }).then((result) => {
            if (result.value) {
                // 틴플레이 삭제 관련 서버 작업 코드 입력
                // 완료 시 아래 코드 실행 (실제로는 또 .then(()=>{}) 으로 써야함)
                teenFriendAdd.classList.add("hidden");
                teenFriendRequest.classList.remove("hidden");
            } else if ((result.dismiss = "cancel")) {
                return;
            }
        });
    });
}

// 틴친 신청 취소 모달 이벤트
if (teenFriendRequest){
    teenFriendRequest.addEventListener("click", () => {
        Swal.fire({
            title: "신청을 취소할까요?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CE201B",
            cancelButtonColor: "#E1E1E1",
            confirmButtonText: "신청취소",
            cancelButtonText: "닫기",
        }).then((result) => {
            if (result.value) {
                // 틴플레이 삭제 관련 서버 작업 코드 입력
                // 완료 시 아래 코드 실행 (실제로는 또 .then(()=>{}) 으로 써야함)
                teenFriendRequest.classList.add("hidden");
                teenFriendAdd.classList.remove("hidden");
            } else if ((result.dismiss = "cancel")) {
                return;
            }
        });
    });
}

// 틴친 취소 모달 이벤트
const teenFriendCancle = document.querySelector(".teenchin-btn");

if (teenFriendCancle){
    teenFriendCancle.addEventListener("click", () => {
        Swal.fire({
            title: "틴친을 그만둘까요?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CE201B",
            cancelButtonColor: "#E1E1E1",
            confirmButtonText: "틴친끊기",
            cancelButtonText: "닫기",
        }).then((result) => {
            if (result.value) {
                // 틴플레이 삭제 관련 서버 작업 코드 입력
                // 완료 시 아래 코드 실행 (실제로는 또 .then(()=>{}) 으로 써야함)
                teenFriendCancle.classList.add("hidden");
                teenFriendAdd.classList.remove("hidden");
            } else if ((result.dismiss = "cancel")) {
                return;
            }
        });
    });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 댓글 목록 불러오기, 댓글 작성, 댓글 수정/삭제
const commentWrap = document.querySelector(".k-comment-list-box-wrap")

const showReplies = (replies) => {
    const memberId = document.querySelector("input[name=member-id]").value;

    if (replies.length === 0) {
        commentWrap.innerHTML = `
            <div class="k-comment-line"></div>
            <div class="feed-item">
                <span>등록된 댓글이 없습니다.</span>
            </div>
        `;
    } else {
        commentWrap.innerHTML = `
            <div class="k-comment-line"></div>
            <div class="k-comment-list-all-wrap">
        `
        replies.forEach((reply) => {
            commentWrap.innerHTML += `
                <!-- 댓글 수정 부분 -->
                <div class="k-comment-update-box-all-wrap">
                    <div class="k-comment-update-box-wrap">
                        <div class="k-comment-update-wrap">
                            <div class="k-comment-update-username-container">${reply.member.member_nickname}</div>
                            <div class="k-comment-update-container">
                                <textarea class="k-comment-update-guide" id="comment-input-update-guide" name="reply-content" type="text" placeholder="수정할 댓글을 남겨주세요. 욕설, 비방글은 무통보 삭제됩니다." autocomplete="off" required=""></textarea>
                                <div class="k-comment-update-upload-wrap">
                                    <div class="k-comment-update-upload-container">
                                        <button class="k-comment-update-upload-button" id="comment-update-upload" type="button">수정</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 개별 댓글 부분 -->
                <div class="k-comment-list-wrap">
                    <!-- 댓글 내 프로필 사진 부분 -->
                    <div class="k-comment-profile-container">
                           <img src="/upload/${reply.member_profile_path}" alt="프로필사진" class="k-comment-profile-icon">
                           <img src="/static/public/web/images/logo/logo1.png" alt="프로필사진" class="k-comment-profile-icon">
                    </div>
                    <!-- 개별 댓글 전체 내용 부분 -->
                    <div class="k-comment-content-container">
                        <!-- 댓글 정보 부분 -->
                        <div class="k-comment-info">
                            <!-- 댓글 작성자 이름 부분 -->
                            <span>${reply.member.member_nickname}</span>
                            <!-- 댓글 작성 날짜 부분 -->
                            <span class="k-comment-info-date">${timeForToday(reply.created_date)}</span>
                        </div>
                        <!-- 개별 댓글 내용 부분 -->
                        <div class="k-comment-text">${reply.reply_content}</div>
                    </div>
                </div>
            `;
            if (reply.member.id === memberId){
                commentWrap.innerHTML += `
                    <!-- 개별 댓글 메뉴 부분 -->
                    <div>
                        <button class="k-comment-menu" type="button" aria-haspopup="menu" data-headlessui-state>
                            <svg class="k-comment-menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <div class="k-comment-menu-open-wrap" aria-labelledby="main-wishlist-content-menu" role="menu" tabindex="0" data-headlessui-state="open">
                            <div class="k-comment-menu-open-container" role="none">
                                <div class="k-comment-menu-open-divison" role="none">
                                    <button class="k-comment-menu-open-choice" type="button" id="comment-menu-open-update" role="menuitem" tabindex="-1">수정</button>
                                    <button class="k-comment-menu-open-choice" type="button" id="comment-menu-open-delete" role="menuitem" tabindex="-1">삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        });

        commentWrap.innerHTML += `
            </div>
        `;
    }
}

function timeForToday(datetime) {
    const today = new Date();
    const date = new Date(datetime);

    let gap = Math.floor((today.getTime() - date.getTime()) / 1000 / 60);

    if (gap < 1) {
        return "방금 전";
    }

    if (gap < 60) {
        return `${gap}분 전`;
    }

    gap = Math.floor(gap / 60);

    if (gap < 24) {
        return `${gap}시간 전`;
    }

    gap = Math.floor(gap / 24);

    if (gap < 31) {
        return `${gap}일 전`;
    }

    gap = Math.floor(gap / 31);

    if (gap < 12) {
        return `${gap}개월 전`;
    }

    gap = Math.floor(gap / 12);

    return `${gap}년 전`;
}



// // 댓글 수정
// let commentButton = document.querySelector(".k-comment-menu");
// let commentSubButton = document.querySelector(".k-comment-menu-open-divison");
// let commentCorrectionClick = document.querySelector(".k-comment-menu-open-choice");
//
// let commentCorrection = document.querySelector(".k-comment-update-box-all-wrap");
// let commentCorrectionText = document.querySelector(".k-comment-update-box-wrap");
//
// let commentListAllWrap = document.querySelector(".k-comment-list-all-wrap");
// let commentInputBoxAllWrap = document.querySelector(".k-comment-input-box-all-wrap");
//
// if (commentButton){
//     commentButton.addEventListener("click", (e) => {
//         commentCorrectionClick.addEventListener("click", () => {
//             commentCorrection.style.display = "block";
//             commentCorrectionText.style.display = "block";
//             commentSubButton.style.display = "none";
//             commentListAllWrap.classList.add("hidden");
//             commentInputBoxAllWrap.classList.add("hidden");
//         });
//         commentSubButton.style.display = "block";
//     });
// }
//
// let commentUpdateUploadContainer = document.querySelector(".k-comment-update-upload-container");
//
// if (commentUpdateUploadContainer){
//     commentUpdateUploadContainer.addEventListener("click", () => {
//         commentCorrection.style.display = "none";
//         commentCorrectionText.style.display = "none";
//         commentSubButton.style.display = "flex";
//         commentListAllWrap.classList.remove("hidden");
//         commentInputBoxAllWrap.classList.remove("hidden");
//         commentSubButton.style.display = "none";
//     });
// }

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 공유하기 버튼
const shareBtn = document.getElementById("share-button");
function clipCopy() {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = window.document.location.href;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    Swal.fire("URL 복사 완료", "주소가 클립보드에 복사되었습니다. <br> 원하는 곳에 붙여넣기 해주세요.", "success");
}
shareBtn.addEventListener("click", clipCopy);

// 모임 공지사항 불러오기(모임공지 쪽 작업 끝나면 추가 예정)
// const getClubNoticeList = async (callback) => {
//     const clubId = document.querySelector("input[name='club-id']").value
//     const response = await fetch('/')
// }

// 공지사항 각각 제목 클릭 시 세부 내용 표시
const noticeContentWraps = document.querySelectorAll(".club-notice-content-wrap");
const noticeTitles = document.querySelectorAll(".club-notice-box");
const noticeShowBtns = document.querySelectorAll(".club-notice-show-icon");
const noticeHideBtns = document.querySelectorAll(".club-notice-hide-icon");

noticeTitles.forEach((title, i) => {
    title.addEventListener("click", () => {
        if (noticeShowBtns[i].style.display == "block") {
            noticeShowBtns[i].style.display = "none";
            noticeHideBtns[i].style.display = "block";
        } else {
            noticeShowBtns[i].style.display = "block";
            noticeHideBtns[i].style.display = "none";
        }
        if (noticeContentWraps[i].style.display == "none") {
            noticeContentWraps[i].style.display = "block";
        } else {
            noticeContentWraps[i].style.display = "none";
        }
    });
});