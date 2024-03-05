//페이지에 게시글 데이터 넣기
let page = 1
const getList = (callback) => {
    fetch(`http://127.0.0.1:10000/wishlist/list/${page}`)
    .then((response) => response.json())
    .then((wishlists) => {
        if(callback){
            callback(wishlists)
        }
    })
}

const moreButton = document.getElementById("more");
const stopButton = document.querySelector(".post-watch");
const showList = (wishlist_info) => {
    // hasNext가 false이면 : 더이상 나올 게시글이 없으면, 더보기 버튼의 displaty를 none으로 설정
    if(!wishlist_info.hasNext){
        console.log("바꿨음")
        stopButton.style.display = 'none'
    }

    // 더보기 버튼을 눌렀을 때, page 추가 됨과 동시에 3개씩 게시글 보여주기
    moreButton.addEventListener("click", (e) => {
        console.log("눌렀음")
        page ++;
        getList(showList);
    });

    let wishlists = wishlist_info.wishlist
    const table= document.querySelector(".add-post");
    wishlists.forEach((wishlist) => {
        table.innerHTML += `
            <!-- 위시리스트 게시글 부분 -->
            <div class="wishlist-post">
                <div class="post-wrap">
                    <!-- 위시리스트 게시글 상단 부분 -->
                    <div class="post-top-warp">
                        <!-- 위시리스트 게시글 프로필 부분 -->
                        <div class="post-profile-warp">
                            <!-- 위시리스트 게시글 프로필 이미지 부분 -->
                            <div class="post-profile-img-container">
                                <!-- 프로필 사진이 있을 경우 이미지 사진 출력 -->
                                <img src="" />
                                <!-- 기본 프로필 이미지 -->
                                <svg class="post-profile-img-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <!-- 위시리스트 게시글 프로필 이름 부분 -->
                            <div class="post-username-container">
                                <div class="post-username-text">
                                    <span>${wishlist.member_name}</span>
                                </div>
                                <!-- 위시리스트 게시글 정보 부분 -->
                                <div class="wishlist-post-info-container">
                                    <span class="post-category">${wishlist.category_name}</span>
                                    <span class="post-upload-date">${ wishlist.change_date_format }</span>
                                </div>
                            </div>
                        </div>
                        <!-- 위시리스트 게시글 아이템 부분 -->
                        <div class="post-items">
                            <div class="post-items-wrap">
                                <div class="post-items-divison-wrap">
                                    <!-- 위시리스트 게시글 좋아요 정보 부분 -->
                                    <div class="post-like-container">
                                        <svg class="post-like-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path>
                                        </svg>
                                        <span class="post-like-count">0</span>
                                    </div>
                                    <!-- 위시리스트 게시글 댓글 정보 부분 -->
                                    <div class="post-comment-container">
                                        <svg class="post-comment-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="post-comment-count">0</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <!-- 위시리스트 게시글 메뉴 부분 -->
                                <button class="post-menu-container" id="main-wishlist-content-menu" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state class="text-gray-500 pb-2 pl-2">
                                    <svg class="post-menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                                <!-- 위시리스트 게시글 메뉴 열기 부분 -->
                                <div class="post-menu-open hidden" aria-labelledby="main-wishlist-content-menu" role="menu" tabindex="0" data-headlessui-state="open">
                                    <div class="post-menu-open-container" role="none">
                                        <div class="post-menu-open-divison" role="none">
                                            <button class="post-menu-open-choice" type="button" id="post-menu-open-update" role="menuitem" tabindex="-1">수정</button>
                                            <button class="post-menu-open-choice" type="button" id="post-menu-open-delete" role="menuitem" tabindex="-1">삭제</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 위시리스트 게시글 제목 부분 -->
                    <div class="post-title-wrap">
                        <div class="post-title-text">${wishlist.wishlist_content}</div>
                    </div>
                    <!-- 위시리스트 게시글 태그 부분 -->
                    <div class="post-tags-wrap">
                        <span class="post-tag">태그 test1</span>
                        <span class="post-tag">태그 test2</span>
                        <span class="post-tag">태그 test3</span>
                        <span class="post-tag">태그 test4</span>
                        <span class="post-tag">태그 test5</span>
                    </div>
                </div>
                <!-- 위시리스트 댓글 열기 부분 -->
                <div class="comment-open-wrap">
                    <button class="comment-open-button" type="button">
                        <span> 댓글 보기 </span>
                        <svg class="comment-open-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <!-- 위시리스트 댓글 닫기 부분 -->
                <div class="comment-close-wrap hidden">
                    <button class="comment-close-button" type="button">
                        <span> 닫기 </span>
                        <svg class="comment-close-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <!-- 위시리스트 댓글 부분 -->
                <div class="comment-all-wrap hidden">
                    <!-- 위시리스트 댓글 추가 부분 -->
                    <div class="comment-input-box-all-wrap">
                        <div class="comment-input-box-wrap">
                            <div class="comment-input-wrap">
                                <div class="comment-input-username-container">틴친이</div>
                                <form class="comment-input-container" method="post" data-hs-cf-bound="true">
                                    <input class="comment-input" name="__RequestVerificationToken" type="hidden" value="lQ1k2HcglUXXMwOa0SIMa_JXSkG8dcFibXk3jrgj1xqrlfkZnxzZ69pIbMszXgP7-1CrLPr7j5y-xEsj8UfSWd2EpmvQnlNfBilqDAT5vUaOv7fZgaT00ILqYk8j9LZOYraW8JeO8poPFXuOtKyENA2" />
                                    <input class="comment-input-hidden" name="CommunityBoardArticleId" hidden="" />
                                    <textarea class="comment-input-guide" name="content" type="text" placeholder="댓글을 남겨주세요. 욕설, 비방글은 무통보 삭제됩니다." autocomplete="off" required=""></textarea>
                                    <div class="comment-input-upload-wrap">
                                        <div class="comment-input-upload-container">
                                            <button class="comment-input-upload-button" id="comment-upload-button" type="submit">등록</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- 위시리스트 댓글 개수 정보 부분 -->
                    <div class="comment-count-wrap">댓글 1</div>
                    <!-- 위시리스트 전체 댓글 부분 -->
                    <div class="comment-list-box-wrap">
                        <!-- 댓글 구분선 -->
                        <div class="comment-line"></div>
                        <!-- 위시리스트 댓글 수정 부분 -->
                        <div class="comment-update-box-all-wrap hidden">
                            <div class="comment-update-box-wrap">
                                <div class="comment-update-wrap">
                                    <div class="comment-update-username-container">핏자</div>
                                    <form class="comment-update-container" method="post" data-hs-cf-bound="true">
                                        <input class="comment-update" name="__RequestVerificationToken" type="hidden" value="lQ1k2HcglUXXMwOa0SIMa_JXSkG8dcFibXk3jrgj1xqrlfkZnxzZ69pIbMszXgP7-1CrLPr7j5y-xEsj8UfSWd2EpmvQnlNfBilqDAT5vUaOv7fZgaT00ILqYk8j9LZOYraW8JeO8poPFXuOtKyENA2" />
                                        <input class="comment-update-hidden" name="CommunityBoardArticleId" hidden="" />
                                        <textarea class="comment-update-guide" id="comment-input-update-guide" name="content" type="text" placeholder="수정할 댓글을 입력하세요." autocomplete="off" required=""></textarea>
                                        <div class="comment-update-upload-wrap">
                                            <div class="comment-update-upload-container">
                                                <button class="comment-update-upload-button" id="comment-update-upload" type="button">등록</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- 위시리스트 댓글 목록 부분 -->
                        <div class="comment-list-all-wrap">
                            <!-- 위시리스트 개별 댓글 부분 -->
                            <div class="comment-list-wrap">
                                <!-- 위시리스트 댓글 내 프로필 사진 부분 -->
                                <div class="comment-profile-container">
                                    <!-- 프로필 사진이 있을 경우 이미지 사진 출력 -->
                                    <!-- <img src="/staticfiles/images/teenplay_logo/logo1.png"> -->
                                    <!-- 기본 프로필 이미지 -->
                                    <svg class="comment-profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <!-- 위시리스트 개별 댓글 전체 내용 부분 -->
                                <div class="comment-content-container">
                                    <!-- 위시리스트 댓글 정보 부분 -->
                                    <div class="comment-info">
                                        <!-- 위시리스트 댓글 작성자 이름 부분 -->
                                        <span>핏자</span>
                                        <!-- 위시리스트 댓글 작성 날짜 부분 -->
                                        <span class="comment-info-date">1일 전</span>
                                    </div>
                                    <!-- 위시리스트 개별 댓글 내용 부분 -->
                                    <div class="comment-text">댓글 내용</div>
                                </div>
                            </div>
                            <!-- 위시리스트 개별 댓글 메뉴 부분 -->
                            <div>
                                <button class="comment-menu" type="button" aria-haspopup="menu" data-headlessui-state>
                                    <svg class="comment-menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                                <div class="comment-menu-open-wrap hidden" aria-labelledby="main-wishlist-content-menu" role="menu" tabindex="0" data-headlessui-state="open">
                                    <div class="comment-menu-open-container" role="none">
                                        <div class="comment-menu-open-divison" role="none">
                                            <button class="comment-menu-open-choice" type="button" id="comment-menu-open-update" role="menuitem" tabindex="-1">수정</button>
                                            <button class="comment-menu-open-choice" type="button" id="comment-menu-open-delete" role="menuitem" tabindex="-1">삭제</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 댓글 구분선 -->
                    <div class="comment-line"></div>
                </div>
            </div>
        `
        // 위시리스트 게시글 좋아요 클릭 이벤트
        // 하트 아이콘 쿼리
        const likeIcon = document.querySelectorAll(".post-like-icon");
        // 하트 개수 쿼리
        const likeCount = document.querySelectorAll(".post-like-count");

        // 하트 아이콘 클릭 시 이벤트 발생
        // 좋아요가 눌렀다면, 좋아요 취소 후 개수 -1
        // 좋아요를 누르지 않았다면, 좋아요 표기 후 개수 +1
        likeIcon.forEach((like, i)=> {
            likeIcon[i].addEventListener("click", () => {
                console.log("눌러졌어요!")
                if (likeIcon[i].classList.contains('liked')) {
                    likeIcon[i].classList.remove("liked");
                    // likeCount[i].textContent = parseInt(likeCount.textContent) - 1;
                } else {
                    likeIcon[i].classList.add("liked");
                    // likeCount[i].textContent = parseInt(likeCount.textContent) + 1;
                }
            });
        })

        // 위시리스트 게시글 메뉴 열고 닫기 이벤트
        // 위시리스트 게시글 내 메뉴 버튼 쿼리
        const wishlistPostMenuButton = document.querySelectorAll(".post-menu-container");
        // 위시리스트 게시글 메뉴(기본 가려짐) 쿼리
        const wishlistPostMenu = document.querySelectorAll(".post-menu-open");

        // 위시리스트 게시글 내 메뉴 버튼 클릭 시 클릭 이벤트 발생
        // 위시리스트 게시글 메뉴를 활성화 or 비활성화
        wishlistPostMenuButton.forEach((btn, i) => {
            wishlistPostMenuButton[i].addEventListener("click", () => {
                wishlistPostMenu[i].classList.toggle("hidden");
            });
        // 위시리스트 메뉴 닫기 이벤트
        // 여백 클릭 시 위시리스트 메뉴 자동 숨기기
            document.addEventListener("click", () => {
                if (!wishlistPostMenuButton[i] && !wishlistPostMenu[i]) {
                    console.log("눌러조")
                    wishlistPostMenu[i].classList.add("hidden");
                }
            });
        })


        // 위시리스트 게시글 댓글 열고 닫기 이벤트
        // 위시리스트 댓글 열기 쿼리
        const commentOpen = document.querySelectorAll(".comment-open-wrap");
        // 위시리스트 게시글 닫기 쿼리
        const commentClose = document.querySelectorAll(".comment-close-wrap");
        // 위시리스트 댓글 쿼리
        const comment = document.querySelectorAll(".comment-all-wrap");
        // 위시리스트 댓글 열기 클릭 시 이벤트 발생
        // 댓글 열기 버튼 비활성화 > 닫기 버튼, 댓글 목록 활성화
        commentOpen.forEach((open,i) => {
            commentOpen[i].addEventListener("click", () => {
                // console.log("열렸다!")
                commentOpen[i].classList.add("hidden");
                commentClose[i].classList.remove("hidden");
                comment[i].classList.remove("hidden");
            })
        })

        // 위시리스트 게시글 댓글 닫기 버튼 클릭 시 이벤트 발생
        // 댓글 닫기 버튼, 댓글 목록 비활성화 > 댓글 열기 버튼 활성화
        commentClose.forEach((close,i) => {
            commentClose[i].addEventListener("click", () => {
                // console.log("닫혔다!")
                commentOpen[i].classList.remove("hidden");
                commentClose[i].classList.add("hidden");
                comment[i].classList.add("hidden");
            });
        })
    });
}

// 실행
getList(showList)



// 태그 검색 이벤트
// 해시태그 검색 묶음 쿼리
const inputTagsSearchBorder = document.querySelector(".tag-search");
// 해시태그 검색 input 쿼리
const inputTagsSearch = document.querySelector(".tag-search-text");
// 해시태그 검색 아이콘 button 쿼리
const inputTagsSearchIcon = document.querySelector(".tag-search-icon");

// 해시태그 검색 값 입력 시 이벤트 발생
// 값이 없으면, 박스 및 버튼 등 색상 붉은 색으로 변경
// 값이 있으면 다시 정상 출력
inputTagsSearch.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        inputTagsSearch.classList.add("red")
        inputTagsSearchIcon.style = "color: #CE201B";
        inputTagsSearchBorder.style = "border-color: #CE201B";
        return;
    } else {
        inputTagsSearch.classList.remove("red")
        inputTagsSearchIcon.style = "color: #878D91";
        inputTagsSearchBorder.style = "border-color: #E1E4E6";
    }
});



// 상단 카테고리 선택 이벤트
// 각 카테고리 button 쿼리
const wishlistItems = document.querySelectorAll(".top-categroy-item");

// 각 카테고리 버튼 클릭 시 이벤트 발생
// 특정 카테고리 선택 시 전체 카테고리의 선택 속성 해제 후
// 선택한 카테고리에만 선택 속성 부여
wishlistItems.forEach((button) => {
    button.addEventListener('click', () => {
        wishlistItems.forEach((item) => {
            item.classList.remove("all");
        });

        button.classList.add("all");
    });
});


// 위시리스트 게시글 댓글 카운팅 이벤트
// 개별 댓글 묶음 쿼리
const commentList = document.querySelectorAll(".comment-list-all-wrap");
// 게시글 댓글 개수 쿼리
const commentCount =  document.querySelector(".post-comment-count");



// 개별 댓글 묶음 개수(길이) = 게시글 댓글 개수로 표기
// function commentCountNum() {
//     commentCount.textContent = commentList.length;
// }
//
// commentCountNum();


//
// // 위시리스트 게시글 메뉴 열고 닫기 이벤트
// // 위시리스트 게시글 내 메뉴 버튼 쿼리
// const wishlistPostMenuButton = document.querySelectorAll(".post-menu-container");
// // 위시리스트 게시글 메뉴(기본 가려짐) 쿼리
// const wishlistPostMenu = document.querySelectorAll(".post-menu-open");
//
// // 위시리스트 게시글 내 메뉴 버튼 클릭 시 클릭 이벤트 발생
// // 위시리스트 게시글 메뉴를 활성화 or 비활성화
// wishlistPostMenuButton.forEach((btn, i) => {
//     wishlistPostMenuButton[i].addEventListener("click", () => {
//         wishlistPostMenu[i].classList.toggle("hidden");
//     });
// });
//
//
// // 위시리스트 메뉴 닫기 이벤트
// // 여백 클릭 시 위시리스트 메뉴 자동 숨기기
// document.addEventListener("click", (e) => {
//     if (!wishlistPostMenuButton.contains(e.target) && !wishlistPostMenu.contains(e.target)) {
//         wishlistPostMenu.classList.add("hidden");
//     }
// });



// 위시리스트 게시글 수정 모달창
// 위시리스트 게시글 메뉴 중 수정 버튼 쿼리
const postUpdateButton = document.getElementById("post-menu-open-update");
// 위시리스트 게시글 수정 모달 쿼리
const modalPostUpdate = document.querySelector(".post-update");
// 위시리스트 게시글 수정 모달 돌아가기 버튼 쿼리
const modalPostUpdateClose = document.querySelector(".update-close-container");
// 위시리스트 게시글 수정 모달 발행하기 버튼 쿼리
const modalPostUpdateFinish = document.querySelector(".update-finish-botton");

// 위시리스트 수정 메뉴 버튼 클릭 시 이벤트 발생
// 위시리스트 수정 모달 보이기
// postUpdateButton.addEventListener("click", () => {
//     modalPostUpdate.classList.remove("hidden");
// });

// 위시리스트 수정 모달 돌아가기 버튼 클릭 시 이벤트 발생
// 위시리스트 수정 모달 숨기기
modalPostUpdateClose.addEventListener("click", () => {
    modalPostUpdate.classList.add("hidden");
});

// 위시리스트 수정 모달 발행하기 버튼 클릭 시 이벤트 발생
// 위시리스트 수정 모달 숨기기
modalPostUpdateFinish.addEventListener("click", () => {
    modalPostUpdate.classList.add("hidden");
});



// 위시리스트 게시글 수정 타이틀 입력 이벤트
// 위시리스트 게시글 수정 모달 제목 입력 쿼리
const updatePostTitle = document.querySelector(".update-category-input");

// 위시리스트 게시글 수정 모달 발행하기 버튼 클릭 시 이벤트 발생
// 수정 모달에 타이틀이 입력되지 않으면 안내 문구 빨간색으로 출력
modalPostUpdateFinish.addEventListener("click", () => {
    if (!updatePostTitle.value) {
        updatePostTitle.classList.add("red");
        return;
    } else {
        updatePostTitle.classList.remove("red");
    }
});

// 위시리스트 게시글 태그 수정 이벤트
// 위시리스트 수정 모달 태그 입력 쿼리
const tagInput = document.querySelector(".update-tags-input-container .update-tags-input");
// 위시리스트 수정 모달 태그 묶음 쿼리
const tagWrap = document.querySelector(".update-tags-wrap");
// 위시리스트 수정 모달 태그 목록 쿼리
const tag = document.querySelector(".update-tags-wrap .tag");
// 위시리스트 수정 모달 태그 에러 메시지 쿼리
const tagError = document.querySelector(".tag-error-text");

// 위시리스트 수정 모달에서 태그 입력 시 이벤트 발생
// 만약, 엔터를 입력했다면,
tagInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        // 위시리스트 수정 모달 태그 목록 쿼리
        const tags = document.querySelectorAll(".update-tags-wrap .tag-list");

        // 입력 값의 길이가 10 이하이며, 목록의 태그 개수가 5이하면,
        // 태그 값 추가(태그 생성)
        if (e.target.value.length <= 10 && tags.length <= 5) {
            if (e.target.value) {
                const tagDiv = document.createElement("div");
                tagDiv.classList.add("tag-list");
                tagDiv.innerHTML = `<span>${e.target.value} ×</span>`;
                tag.appendChild(tagDiv);
                e.target.value = "";
                tagError.classList.add("hidden")

                // tagDiv 클릭 시 이벤트 발생
                tagDiv.addEventListener("click", (e) => {
                    // 태그 삭제
                    e.stopPropagation();
                    tag.removeChild(tagDiv);
                    tagError.classList.add("hidden")
                });
            } 
        } else {
            // 위 값이 아니라면, 오류 메시지 출력
            tagError.classList.remove("hidden")
        }
    }
});



// // 위시리스트 게시글 수정 모달창 닫기 이벤트
// // 위시리스트 게시글 수정 모달 묶음 쿼리
// const postUpdateWrap = document.querySelector(".post-update-wrap");
//
// // 화면 클릭 시 위시리스트 게시글 수정 모달 숨기기
// document.addEventListener("click", (e) => {
//     if (!postUpdateButton.contains(e.target) && !postUpdateWrap.contains(e.target)) {
//         modalPostUpdate.classList.add("hidden");
//     }
// });



// 위시리스트 게시글 댓글 열고 닫기 이벤트
// 위시리스트 댓글 열기 쿼리
// const commentOpen = document.querySelectorAll(".comment-open-wrap");
// // 위시리스트 게시글 닫기 쿼리
// const commentClose = document.querySelectorAll(".comment-close-wrap");
// // 위시리스트 댓글 쿼리
// const comment = document.querySelectorAll(".comment-all-wrap");
//
// // 위시리스트 댓글 열기 클릭 시 이벤트 발생
// // 댓글 열기 버튼 비활성화 > 닫기 버튼, 댓글 목록 활성화
// commentOpen.forEach((open,i) => {
//     console.log(commentOpen[i])
//     commentOpen[i].addEventListener("click", () => {
//         console.log("들어옴")
//         commentOpen[i].classList.add("hidden");
//         commentClose[i].classList.remove("hidden");
//         comment[i].classList.remove("hidden");
//     })
// })

// 위시리스트 게시글 댓글 닫기 버튼 클릭 시 이벤트 발생
// 댓글 닫기 버튼, 댓글 목록 비활성화 > 댓글 열기 버튼 활성화
// commentClose.addEventListener("click", () => {
//     commentOpen.classList.remove("hidden");
//     commentClose.classList.add("hidden");
//     comment.classList.add("hidden");
// });



// 위시리스트 댓글 메뉴 열고 닫기 이벤트
// 위시리스트 댓글 내 메뉴 버튼 쿼리
const wishlistCommentMenuButton = document.querySelector(".comment-menu");
// 위시리스트 댓글 메뉴 목록 쿼리
const wishlistCommentMenu = document.querySelector(".comment-menu-open-wrap");

// 위시리스트 댓글 버튼 클릭 시 이벤트 발생
// 위시리스트 댓글 메뉴를 활성화 or 비활성화
wishlistCommentMenuButton.addEventListener("click", () => {
    wishlistCommentMenu.classList.toggle("hidden");
});




// 위시리스트 댓글 메뉴 닫기 이벤트
// 여백 클릭 시 댓글 메뉴 비활성화
document.addEventListener("click", (e) => {
    if (!wishlistCommentMenuButton.contains(e.target) && !wishlistCommentMenu.contains(e.target)) {
        wishlistCommentMenu.classList.add("hidden");
    }
});



// 댓글 수정 이벤트
// 댓글 메뉴 중 수정하기 버튼 쿼리
const commentMenuOpenUpdate = document.getElementById("comment-menu-open-update");
// 댓글 수정 입력 쿼리
const commentInputUpdate = document.querySelector(".comment-update-box-all-wrap");
// 개별 댓글 쿼리
const commentComment = document.querySelector(".comment-list-all-wrap");

// 댓글 메뉴 중 수정하기 버튼 클릭 시 이벤트 발생
// 댓글 수정 입력 활성화 후 개별 댓글 숨기기
commentMenuOpenUpdate.addEventListener("click", () => {
    commentInputUpdate.classList.remove("hidden");
    commentComment.classList.add("hidden");
    
});

// 댓글 수정 등록 버튼
const commentUploadFinish =document.getElementById("comment-update-upload");

// 댓글 수정 등록 버튼 클릭 시 이벤트 발생
// 댓글 수정 입력 비활성화 개별 댓글 활성화
commentUploadFinish.addEventListener("click", () => {
    commentInputUpdate.classList.add("hidden");
    commentComment.classList.remove("hidden");
});



// 위시리스트 생성 모달창
// const wishlistCreate = document.querySelector(".main-extra-create-wrap")

// 위시리스트 생성 모달창 - 미로그인 시 발생 이벤트
// const modalLogin = document.querySelector(".modal-login")
// const modalLoginClose = document.querySelector(".modal-divison-login-button-close")
// const modalLoginFinish = document.querySelector(".modal-divison-login-button")

// wishlistCreate.addEventListener("click", () => {
//     modalLogin.classList.remove("hidden");
// });

// modalLoginClose.addEventListener("click", () => {
//     modalLogin.classList.add("hidden");
// });

// modalLoginFinish.addEventListener("click", () => {
//     modalLogin.classList.add("hidden");
// });



// 위시리스트 생성 모달창 - 정상 로그인
// 위시리스트 생성 버튼 쿼리
const wishlistCreate = document.querySelector(".extra-create-button")

// 위시리스트 생성 모달 쿼리
const modalCreateInput = document.querySelector(".post-create")
// 위시리스트 생성 모달 돌아가기 버튼 쿼리
const modalCreateClose = document.querySelector(".create-close-container")
// 위시리스트 생성 모달 발행하기 버튼 쿼리
const modalCreateFinish = document.querySelector(".create-finish-container")

// 위시리스트 생성 모달창 열기 이벤트
// 위시리스트 생성 버튼 클릭 시 생성 모달 활성화 이벤트 발생
wishlistCreate.addEventListener("click", () => {
    modalCreateInput.classList.remove("hidden");
});

// 위시리스트 생성 모달창 닫기(아이콘) 이벤트
// 위시리스트 돌아가기 버튼 클릭 시 생성 모달 비활성화 이벤트 발생
modalCreateClose.addEventListener("click", () => {
    modalCreateInput.classList.add("hidden");
});

// 위시리스트 생성 모달창 완료 이벤트
// 위시리스트 발행하기 버튼 클릭 시 생성 모달 비활성화 이벤트 발생
modalCreateFinish.addEventListener("click", () => {
    modalCreateInput.classList.add("hidden");
});



// 위시리스트 게시글 태그 추가 이벤트
// 위시리스트 생성 모달 태그 입력 쿼리
const createTagInput = document.querySelector(".create-tags-input-container .create-tags-input");
// 위시리스트 생성 모달 태그 묶음 쿼리
const createTagWrap = document.querySelector(".create-tags-wrap");
// 위시리스트 생성 모달 태그 목록 쿼리
const createTag = document.querySelector(".create-tags-wrap .create-tag");
// 위시리스트 생성 모달 에러 메시지 쿼리
const createTagError = document.querySelector(".create-tag-error");

// 위시리스트 생성 모달 태그 입력 시 이벤트 발생
createTagInput.addEventListener("keyup", (e) => {
    // 만약, enter 입력 시
    if (e.keyCode === 13) {
        // 위리시리스트 생성 모달 태그 목록 쿼리
        const createTags = document.querySelectorAll(".create-tags-wrap .create-tag-list");

        // 입력 값의 길이가 10 이하이며, 목록의 태그 개수가 5이하면,
        // 태그 값 추가(태그 생성)
        if (e.target.value.length <= 10 && createTags.length <= 5) {
            if (e.target.value) {
                const createTagDiv = document.createElement("div");
                createTagDiv.classList.add("create-tag-list");
                createTagDiv.innerHTML = `<span>${e.target.value} ×</span>`;
                createTag.appendChild(createTagDiv);
                e.target.value = "";
                createTagError.classList.add("hidden")

                // createTagDiv 클릭 시 태그 삭제 이벤트 발생
                createTagDiv.addEventListener("click", (e) => {
                    // 취소
                    e.stopPropagation();
                    createTag.removeChild(createTagDiv);
                    createTagError.classList.add("hidden")
                });
            } 
        // 위가 아니라면 에러 메시지 출력
        } else {
            createTagError.classList.remove("hidden")
        }
    }
});



// 위시리스트 생성 모달창 닫기(여백) 이벤트
// 위시리스트 생성 모달 묶음 쿼리
const postCreateWrap = document.querySelector(".post-create-wrap");

// 여백 클릭 시 생성 모달 비활성화 이벤트 발생
document.addEventListener("click", (e) => {
    if (!wishlistCreate.contains(e.target) && !postCreateWrap.contains(e.target)) {
        modalCreateInput.classList.add("hidden");
    }
});



// 프로필 클릭 시 틴친 프로필 모달 출력 이벤트
// 게시글 내 틴친 프로필 사진 쿼리
const postProfileImg = document.querySelector(".post-profile-img-container")
// 댓글 내 틴친 프로필 사진 쿼리
const commentProfileImg = document.querySelector(".comment-profile-container")
// 틴친 프로필 모달 묶음 쿼리
const profile = document.querySelector(".profile")

// 게시글 내 틴친 프로필 사진 쿼리 클릭 시 프로필 모달 활성화 이벤트 발생
postProfileImg.addEventListener("click", () => {
    profile.classList.remove("hidden");
});

// 댓글 내 틴친 프로필 사진 쿼리 클릭 시 프로필 모달 활성화 이벤트 발생
commentProfileImg.addEventListener("click", () => {
    profile.classList.remove("hidden");
});




// 틴친 프로필 모달 닫기 이벤트
// 틴친 프로필 모달 쿼리
const teenchinBox = document.querySelector(".teenchin-box")

// 여백 클릭시 틴친 프로필 모달 쿼리 비활성화 이벤트 발생
document.addEventListener("click", (e) => {
    if (!postProfileImg.contains(e.target) && !commentProfileImg.contains(e.target) && !teenchinBox.contains(e.target)) {
        profile.classList.add("hidden");
    }
});



// 쪽지 보내기 클릭 시 쪽지 보내기 모달 출력 이벤트
// 쪽지 보내기 버튼 쿼리
const sendLetterBoxBtn = document.querySelector(".send-letter-btn")
// 쪽지 보내기 모달 쿼리
const sendLetter = document.querySelector(".send-modal-wrap")

// 쪽지 보내기 버튼 클릭 시 이벤트 발생
// 틴친 프로필 모달 비활성화 및 쪽지 보내기 모달 활성화
sendLetterBoxBtn.addEventListener("click", () => {
    profile.classList.add("hidden");
    sendLetter.classList.remove("hidden");
});



// 쪽지 보내기 닫기(버튼) 모달 이벤트
// 쪽지 보내기 닫기 버튼 쿼리
const sendLetterCloseBtn = document.querySelector(".send-close-btn")

// 쪽지 보내기 닫기 버튼 클릭 시 쪽지 보내기 모달 비활성화
sendLetterCloseBtn.addEventListener("click", () => {
    sendLetter.classList.add("hidden");
});




// 쪽지 보내기 닫기(여백) 모달 이벤트
// 여백 클릭 시 쪽지 보내기 창 닫기 이벤트 발생
const sendLetterModal = document.querySelector(".send-modal-box")

document.addEventListener("click", (e) => {
    if (!sendLetterBoxBtn.contains(e.target) && !sendLetterModal.contains(e.target)) {
        sendLetter.classList.add("hidden");
    }
});



// 쪽지 보내기 모달 이벤트
// 쪽지 보내기 버튼 쿼리
const sendLetterBtn = document.querySelector(".send-check-btn")

// 쪽지 보내기 버튼 클릭 시 쪽지 발송 완료 모달 활성화
sendLetterBtn.addEventListener("click", () => {
    Swal.fire({
        title: "쪽지가 전송 되었습니다.",
        text: "",
        icon: "success",
        confirmButtonColor: "#CE201B"
    });
});


// 틴친 추가 모달 이벤트
// 틴친 추가 버튼 쿼리
const teenFriendAdd = document.querySelector(".teenchin-add-btn")
// 틴친 대기 중 버튼 쿼리
const teenFriendRequest = document.querySelector(".teenchin-request-btn")

// 틴친 추가 버튼 클릭 시 틴친 신청 확인 모달 활성화
// 닫기 시 모달 종료, 추가 시 틴친 대기중 버튼 활성화
teenFriendAdd.addEventListener("click", () => {
    Swal.fire({
        title: "틴친 신청을 보낼까요?",
        text: "",
        icon: "question",
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

// 틴친 대기중 버튼 클릭 시 신청 취소 확인 모달 활성화
// 닫기 시 모달 종료, 신청 취소 시 틴친 추가 버튼 활성화
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
})

// 틴친 취소 모달 이벤트
// 틴친중 버튼 쿼리
const teenFriendCancle = document.querySelector(".teenchin-btn");

// 틴친중 버튼 클릭 시 틴친 그만두기 모달 활성화 이벤트 발생
// 닫기 클릭 시 모달 종료, 틴친 끊기 클릭 시 틴친 추가 버튼 활성화
teenFriendCancle.addEventListener("click", () => {
    Swal.fire({
        title: "틴친을 그만둘까요?",
        text: "",
        icon: "error",
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
})
