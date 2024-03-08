let page = 1;
const div = document.querySelector(".add-post");
const addButton = document.querySelector(".post-watch");
const moreButton = document.querySelector(".post-watch-button")
const categoryBtn = document.querySelectorAll(".top-categroy-item")


// 상단 카테고리 선택 이벤트
// 각 카테고리 버튼 클릭 시 이벤트 발생
categoryBtn.forEach((button) => {
    button.addEventListener('click', () => {
        // 더보기 버튼 눌렀을 때 ++page 로 2가 된 page 를 1로 초기화
        page = 1
        // 특정 카테고리 선택 시 전체 카테고리의 선택 속성 해제 후
        // 선택한 카테고리에만 선택 속성 부여
        categoryBtn.forEach((item) => {
            item.classList.remove("all");
        });
        // console.log("더보기 부활")
        addButton.style.display = "block";
        button.classList.add("all");
        // 카테고리에 해당하는 위시리스트 추가
        wishlistService.getList(page, category, showList).then((text) => {
            div.innerHTML = text;
            wishlistMenu()
            // console.log("카테고리 위시리스트 추가")
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
            commentOpen.forEach((open, i) => {
                commentOpen[i].addEventListener("click", () => {
                    // console.log("열렸다!")
                    commentOpen[i].classList.add("hidden");
                    commentClose[i].classList.remove("hidden");
                    comment[i].classList.remove("hidden");
                })
            })
            // 위시리스트 게시글 댓글 닫기 버튼 클릭 시 이벤트 발생
            // 댓글 닫기 버튼, 댓글 목록 비활성화 > 댓글 열기 버튼 활성화
            commentClose.forEach((close, i) => {
                commentClose[i].addEventListener("click", () => {
                    // console.log("닫혔다!")
                    commentOpen[i].classList.remove("hidden");
                    commentClose[i].classList.add("hidden");
                    comment[i].classList.add("hidden");
                });
            })
        });
    });
});


// 위시리스트가 3개 이상 있을 때 더보기 버튼 나오기
wishlistService.getList(page + 1, category).then((wishlists) => {
    if (wishlists.length !== 0) {
        addButton.style.display = "block";
    }
});


//전체 위시리스트 보여주기
const showList = (wishlists) => {
    let text = ``;
    wishlists.forEach((wishlist) => {
        if(wishlists.length === 0) {
            text = `
                <!-- 카테고리에 게시글이 없을 때 출력 -->
                <div class="post-error">
                    <span>게시글이 존재하지 않습니다.</span>
                </div>
            `
        } else {
            text += `
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
                                        <span class="post-upload-date">${timeForToday(wishlist.created_date)}</span>
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
            `
            if(wishlist.member_id === Number(memberId)) {
                text += `
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
                `
            }
            text += `
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
                                        <div class="comment-update-username-container">댓글작성자</div>
                                        <form class="comment-update-container" method="post" data-hs-cf-bound="true">
                                            <input class="comment-update" name="__RequestVerificationToken" type="hidden" value="lQ1k2HcglUXXMwOa0SIMa_JXSkG8dcFibXk3jrgj1xqrlfkZnxzZ69pIbMszXgP7-1CrLPr7j5y-xEsj8UfSWd2EpmvQnlNfBilqDAT5vUaOv7fZgaT00ILqYk8j9LZOYraW8JeO8poPFXuOtKyENA2" />
                                            <input class="comment-update-hidden" name="CommunityBoardArticleId" hidden="" />
                                            <textarea class="comment-update-guide" id="comment-input-update-guide" name="content" type="text" placeholder="수정할 댓글을 입력하세요" autocomplete="off" required=""></textarea>
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
                                            <span>댓글작성자</span>
                                            <!-- 위시리스트 댓글 작성 날짜 부분 -->
                                            <span class="comment-info-date">1일 전</span>
                                        </div>
                                        <!-- 위시리스트 개별 댓글 내용 부분 -->
                                        <div class="comment-text">댓글내용</div>
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
        }
    });
    return text;
}

wishlistService.getList(page,category, showList).then((text) => {
    div.innerHTML = text;
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
    commentOpen.forEach((open, i) => {
        commentOpen[i].addEventListener("click", () => {
            // console.log("열렸다!")
            commentOpen[i].classList.add("hidden");
            commentClose[i].classList.remove("hidden");
            comment[i].classList.remove("hidden");
        })
    })
    // 위시리스트 게시글 댓글 닫기 버튼 클릭 시 이벤트 발생
    // 댓글 닫기 버튼, 댓글 목록 비활성화 > 댓글 열기 버튼 활성화
    commentClose.forEach((close, i) => {
        commentClose[i].addEventListener("click", () => {
            // console.log("닫혔다!")
            commentOpen[i].classList.remove("hidden");
            commentClose[i].classList.add("hidden");
            comment[i].classList.add("hidden");
        });
    })
});


// 더보기 버튼 누르면 위시리스트 나오기
moreButton.addEventListener("click", (e) => {
    wishlistService.getList(++page, category, showList).then((text) => {
        // console.log(category)
        // console.log("더보기로 추가됐어요!")
        div.innerHTML += text;
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
            commentOpen.forEach((open, i) => {
                commentOpen[i].addEventListener("click", () => {
                    // console.log("열렸다!")
                    commentOpen[i].classList.add("hidden");
                    commentClose[i].classList.remove("hidden");
                    comment[i].classList.remove("hidden");
                })
            })
            // 위시리스트 게시글 댓글 닫기 버튼 클릭 시 이벤트 발생
            // 댓글 닫기 버튼, 댓글 목록 비활성화 > 댓글 열기 버튼 활성화
            commentClose.forEach((close, i) => {
                commentClose[i].addEventListener("click", () => {
                    // console.log("닫혔다!")
                    commentOpen[i].classList.remove("hidden");
                    commentClose[i].classList.add("hidden");
                    comment[i].classList.add("hidden");
                });
            })
    });

    wishlistService.getList(page + 1,category).then((wishlists) => {
        if (wishlists.length === 0) {
            // console.log("사라졌지롱")
            addButton.style.display = "none";
        }
    });
});


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