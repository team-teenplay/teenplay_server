NodeList.prototype.filter = Array.prototype.filter;
NodeList.prototype.map = Array.prototype.map;

let page = 1

// 상단 배너 배경 이미지 넣기
const prDetailBannerWrap = document.querySelector(".pr-detail-banner-wrap")

prDetailBannerWrap.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)), url("/upload/${clubImagePath}")`

// 틴친 및 쪽지 관련 자바스크립트
// 쪽지 모달창에 발신자 정보 받아와서 넣기
const sendLetterBoxBtn = document.querySelector(".send-letter-btn");
const sendLetter = document.querySelector(".send-modal-wrap");
const senderInfo = document.querySelector(".send-sender-email")
const receiverInfo = document.querySelector(".send-receiver-email")

const sendLetterAddInfo = (replyId) => {
    senderInfo.innerText = `${memberNickname} (${memberEmail})`;
    const receiverName = document.querySelector(`.member-name${replyId}`).innerText;
    const receiverEmail = document.querySelector(`.member-email${replyId}`).value;
    receiverInfo.innerText = `${receiverName} (${receiverEmail})`;
}

// 틴친 클릭 시 프로필 모달 나오도록 하기
const profileModal = document.querySelector("div.profile");
const profileModalProfileImage = document.querySelector(".profile-default-img");
const profileModalMemberName = document.querySelector("div.profile-name");

const showMemberProfileModal = (replyId) => {
    if (profileModal.classList.contains("hidden")) {
        profileModal.classList.remove("hidden")
        const memberProfileImage = document.querySelector(`.profile-image${replyId}`);
        profileModalProfileImage.src = memberProfileImage.src;
        const memberProfileName = document.querySelector(`.member-name${replyId}`);
        profileModalMemberName.innerText = memberProfileName.innerText;
        sendLetterAddInfo(replyId);
    }
}

const hideMemberProfileModal = () => {
    if (!profileModal.classList.contains("hidden")){
        profileModal.classList.add("hidden");
    }
}

const addClickEventReplyProfile = () => {
    const profilePhotos = document.querySelectorAll(".comment-profile-container");
    profilePhotos.forEach((wrap) => {
        wrap.addEventListener("click", (e) => {
            let replyId = wrap.classList[1];
            showMemberProfileModal(replyId);
        })
    })
    const modalDivision = document.querySelector(".modal-divison")
    const modalContainer = document.querySelector(".teenchin-box.post-update-wrap")
    modalDivision.addEventListener("click", (e) => {
        if (e.target !== modalContainer){
            hideMemberProfileModal()
        }
    })
}

// 프로필 클릭 시 틴친 프로필 모달 출력 이벤트
const commentProfileImg = document.querySelector(".comment-profile-container");
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



sendLetterBoxBtn.addEventListener("click", () => {
    profile.classList.add("hidden");
    sendLetter.classList.remove("hidden");
})

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
    sendLetterBtn.addEventListener("click", async () => {
        const letterContent = document.getElementById("letter-content").value;
        if (!letterContent) return;
        const receiverId = document.querySelector(".send-receiver-email").innerText;
        await clubPostLetterService.write({
            letter_content: letterContent,
            receiver_id: receiverId
        })
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 더보기 버튼 보여줄지 판단하는 함수
const showMoreBtnWrap = document.querySelector(".show-more-btn-wrap")

const checkMoreBtn = () => {
    clubPostRelyService.getList(clubPostId, page +1).then((replies_info) => {
        if (replies_info.replies.length !== 0){
            showMoreBtnWrap.style.display = "block";
        } else{
            showMoreBtnWrap.style.display = "none";
        }
    })
}

// 뿌려줄 댓글 목록을 만들어 주는 함수
const showList = (replies_info) => {
    let text = ``;
    const commentCountWrap = document.querySelector(".comment-count-wrap")
    commentCountWrap.innerText = `댓글 ${replies_info.replies_count}`

    if (replies_info.replies.length === 0) {
        text += `
            <div class="feed-item">
                <span>등록된 댓글이 없습니다.</span>
            </div>`
    } else {
        for (let reply of replies_info.replies) {
            text += `
                <div class="comment-update-box-all-wrap ${reply.id}">
                    <div class="comment-update-box-wrap">
                        <div class="comment-update-wrap">
                            <div class="comment-update-username-container">${reply.member_name}</div>
                            <div class="comment-update-container">
                                <textarea class="comment-update-guide" id="update-content${reply.id}" name="update-content" type="text" placeholder="수정할 댓글을 입력하세요." autocomplete="off" required=""></textarea>
                                <div class="comment-update-upload-wrap">
                                    <div class="comment-update-upload-container">
                                        <button class="comment-update-upload-button ${reply.id}" type="button">수정</button>
                                        <button class="comment-update-close-button ${reply.id}" type="button">취소</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 댓글 부분 -->
                <div class="comment-list-all-wrap ${reply.id}">
                <input type="hidden" class="member-email${reply.id}" name="writer-email" value="${reply.member_email}">
                    <!-- 개별 댓글 부분 -->
                    <div class="comment-list-wrap">
                        <!-- 댓글 내 프로필 사진 부분 -->
                        <div class="comment-profile-container ${reply.id}">
                            <img src="${reply.member_path ? '/upload/' + reply.member_path : '/static/public/web/images/logo/logo1.png'}" alt="프로필사진"  class="comment-profile-icon profile-image${reply.id}"></img>
                        </div>
                        <!-- 개별 댓글 전체 내용 부분 -->
                        <div class="comment-content-container">
                            <!-- 댓글 정보 부분 -->
                            <div class="comment-info">
                                <!-- 댓글 작성자 이름 부분 -->
                                <span class="member-name${reply.id}">${reply.member_name}</span>
                                <!-- 댓글 작성 날짜 부분 -->
                                <span class="comment-info-date">${timeForToday(reply.created_date)}</span>
                            </div>
                            <!-- 개별 댓글 내용 부분 -->
                            <div class="comment-text${reply.id}">${reply.reply_content.replace(/\n/g, '<br>')}</div>
                        </div>
                    </div>
                    <!-- 개별 댓글 메뉴 부분 -->
                    <div class="comment-modify-button ${reply.id}" style="display: ${reply.member_id !== Number(memberId) ? 'none' : 'block'}">
                        <button class="comment-menu" type="button" aria-haspopup="menu" data-headlessui-state>
                            <svg class="comment-menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <div class="comment-menu-open-wrap ${reply.id}">
                            <div class="comment-menu-open-container" role="none">
                                <div class="comment-menu-open-divison" role="none">
                                    <button class="comment-menu-open-choice update ${reply.id}" type="button">수정</button>
                                    <button class="comment-menu-open-choice delete ${reply.id}" type="button">삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    }
    return text;
}

// 더보기 버튼 클릭 시 발생하는 이벤트
const commentListBoxWrap = document.querySelector(".comment-list-box-wrap")

showMoreBtnWrap.addEventListener("click", () => {
    clubPostRelyService.getList(clubPostId, ++page, showList).then((text) => {
        commentListBoxWrap.innerHTML += text;
        checkMoreBtn()
        showReplyMenu()
        addClickEventUpdate()
        addClickEventHideUpdate()
        addClickEventUpdateUpload()
        addClickEventDelete()
        addClickEventReplyProfile()
    })
})

// 댓글 작성하기 이벤트
const commentInputUploadButton = document.querySelector(".comment-input-upload-button")

commentInputUploadButton.addEventListener("click", async () => {
    const replyContent = document.querySelector("textarea[name=write-content]")

    if (!replyContent.value) return;

    await clubPostRelyService.write({
        reply_content: replyContent.value,
        club_post_id: clubPostId
    })
    replyContent.value = "";

    page = 1
    const text = await clubPostRelyService.getList(clubPostId, page, showList)
    commentListBoxWrap.innerHTML = text;
    checkMoreBtn()
    showReplyMenu()
    addClickEventUpdate()
    addClickEventHideUpdate()
    addClickEventUpdateUpload()
    addClickEventDelete()
    addClickEventReplyProfile()
})

// 댓글의 메뉴(...)버튼을 눌렀을 때 발생하는 이벤트를 추가하는 함수
const bgForModal = document.querySelector(".bg-for-modal")

const showReplyMenu = () => {
    const commentModifyButtons = document.querySelectorAll(".comment-modify-button")
    const commentMenuOpenWraps = document.querySelectorAll(".comment-menu-open-wrap")

    commentModifyButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            let replyId = btn.classList[1];
            commentMenuOpenWraps.forEach((replyMenu) => {
                if (replyMenu.classList[1] === replyId) {
                    replyMenu.style.display = "block";
                } else {
                    replyMenu.style.display = "none";
                }
                bgForModal.style.display = "block";
                bgForModal.addEventListener("click", (e) => {
                    if (e.target !== replyMenu && !replyMenu.contains(e.target)) {
                        replyMenu.style.display = "none";
                    }
                    bgForModal.style.display = "none";
                })
            })
        })
    })
}

// 수정 메뉴 클릭 시 수정창 출력 이벤트 등록
const addClickEventUpdate = () => {
    let commentMenuOpenChoiceUpdate = document.querySelectorAll(".comment-menu-open-choice.update")
    let commentUpdateBoxAllWrap = document.querySelectorAll(".comment-update-box-all-wrap")
    let commentListAllWrap = document.querySelectorAll(".comment-list-all-wrap")

    commentMenuOpenChoiceUpdate.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            commentUpdateBoxAllWrap.filter((modal) => modal.classList[1] === e.target.classList[2])
                .map((modal) => {
                    modal.style.display = "block";
                    let commentText = document.querySelector(`.comment-text${e.target.classList[2]}`)
                    let updateContent = document.getElementById(`update-content${e.target.classList[2]}`)
                    updateContent.value = commentText.innerText;
                });
            commentListAllWrap.filter((reply) => reply.classList[1] === e.target.classList[2])
                .map((reply) => {
                    reply.style.display = "none";
                    bgForModal.style.display = "none";
                })
            bgForModal.style.display = "none";
        })
    })
}

// 수정창에서 취소 버튼 클릭 시 수정창 닫기 이벤트 등록
const addClickEventHideUpdate = () => {
    const commentUpdateCloseButtons = document.querySelectorAll(".comment-update-close-button")
    const commentUpdateBoxAllWraps = document.querySelectorAll(".comment-update-box-all-wrap");
    const commentListAllWraps = document.querySelectorAll(".comment-list-all-wrap")
    commentUpdateCloseButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            commentUpdateBoxAllWraps.filter((modal) => modal.classList[1] === e.target.classList[1])
                .map((modal, i) => {
                    modal.style.display = "none";
                })
            commentListAllWraps.filter((reply) => reply.classList[1] === e.target.classList[1])
                .map((reply) => {
                    reply.style.display = "flex";
                })
            bgForModal.style.display = "none";
        })
    })
}

// 댓글 수정하기 함수
const addClickEventUpdateUpload = () => {
    const commentUpdateUploadButtons = document.querySelectorAll(".comment-update-upload-button");
    commentUpdateUploadButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            const updateTextarea = document.getElementById(`update-content${e.target.classList[1]}`);
            const updateContent = updateTextarea.value;
            if (!updateContent) return;
            await clubPostRelyService.update({
                'reply_content': updateContent,
                'id': e.target.classList[1]
            });
            page = 1;
            updateTextarea.value = '';
            clubPostRelyService.getList(clubPostId, page, showList).then((text) => {
                commentListBoxWrap.innerHTML = text;
                checkMoreBtn()
                showReplyMenu()
                addClickEventUpdate()
                addClickEventHideUpdate()
                addClickEventUpdateUpload()
                addClickEventDelete()
                addClickEventReplyProfile()
            });
        })
    })
}

// 댓글 삭제하기
const addClickEventDelete = () => {
    const commentMenuOpenChoiceDelete = document.querySelectorAll(".comment-menu-open-choice.delete")
    commentMenuOpenChoiceDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            const replyId = e.target.classList[2];
            await clubPostRelyService.remove({
                'reply_id': replyId
            });
            page = 1;
            clubPostRelyService.getList(clubPostId, page, showList).then((text) => {
                commentListBoxWrap.innerHTML = text;
                checkMoreBtn()
                showReplyMenu()
                addClickEventUpdate()
                addClickEventHideUpdate()
                addClickEventUpdateUpload()
                addClickEventDelete()
                addClickEventReplyProfile()
            });
        })
    })
}

// 페이지 로드 시 댓글 목록을 가져오는 함수
clubPostRelyService.getList(clubPostId, page, showList).then((text) => {
    commentListBoxWrap.innerHTML = text;
    checkMoreBtn()
    showReplyMenu()
    addClickEventUpdate()
    addClickEventHideUpdate()
    addClickEventUpdateUpload()
    addClickEventDelete()
    addClickEventReplyProfile()
})

// // 위시리스트 댓글 메뉴 열고 닫기 이벤트
// const wishlistCommentMenuButton = document.querySelector(".comment-menu");
// const wishlistCommentMenu = document.querySelector(".comment-menu-open-wrap");
//
// wishlistCommentMenuButton.addEventListener("click", () => {
//     wishlistCommentMenu.classList.toggle("hidden");
// });
//
// // 위시리스트 댓글 메뉴 닫기 이벤트
// document.addEventListener("click", (e) => {
//     if (
//         !wishlistCommentMenuButton.contains(e.target) &&
//         !wishlistCommentMenu.contains(e.target)
//     ) {
//         wishlistCommentMenu.classList.add("hidden");
//     }
// });
//
// // 댓글 수정 이벤트
// const commentMenuOpenUpdate = document.getElementById(
//     "comment-menu-open-update"
// );
// const commentInputUpdate = document.querySelector(
//     ".comment-update-box-all-wrap"
// );
// const commentComment = document.querySelector(".comment-list-all-wrap");
//
// commentMenuOpenUpdate.addEventListener("click", () => {
//     commentInputUpdate.classList.remove("hidden");
//     commentComment.classList.add("hidden");
// });
//
// const commentUploadFinish = document.getElementById("comment-update-upload");
//
// commentUploadFinish.addEventListener("click", () => {
//     commentInputUpdate.classList.add("hidden");
//     commentComment.classList.remove("hidden");
// });

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