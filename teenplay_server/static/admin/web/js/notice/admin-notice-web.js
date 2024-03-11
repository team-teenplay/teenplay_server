let page = 1;

// 목록 태그
const noticeBox = document.querySelector(".notice-data")
// 페이지 번호 박스
const mainUserBottomUl = document.querySelector(".main-user-bottom-ul")

// 게시글 목록 가져오기
const createListService = (() => {
    const showList = (pagination) => {
        let text = ``;
        pagination.pagination.forEach((page) => {
            text += `
                <li class="main-user-list" data-id="${page.id}">
                    <div class="main-comment-list-check">
                        <input type="checkbox" class="main-comment-list-checkbox" />
                    </div>
                    <div class="main-user-list-name">${page.notice_title}</div>
                    <div class="main-user-list-status">${page.created_date}</div>
            `;
            if(page.notice_type === 0) {
                text += `
                    <div class="main-user-list-category" >공지사항</div>
                `
            } else if (page.notice_type === 1) {
                text += `
                    <div class="main-user-list-category" >자주묻는질문</div>
                `
            }
            text += `
                <div class="main-user-list-detail">
                        <button class="member-user-list-detail-button toggle-button" data-target="${page.id}">상세보기</button>
                    </div>
                </li>
            `
        })
        return text;
    }

    const showPaging = (pagination) => {
        let text = ``;
        // 시작 페이지가 1보다 큰 경우
        if (pagination.start_page > 1) {
            // 정렬이 popular이라면
            if (pagination.order === 'popular'){
                // 추가
                text += `
                    <li>
                        <a href="${pagination.start_page -1} popular" class="reft main-user-bottom-left">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="main-user-bottom-svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.58 3.27c.504.405.563 1.115.13 1.587L9.168 12l6.543 7.143a1.076 1.076 0 0 1-.13 1.586 1.26 1.26 0 0 1-1.695-.122L6 12l7.885-8.607a1.26 1.26 0 0 1 1.695-.122Z"></path>
                            </svg>
                        </a>
                    </li>
                 `
            } else {
                text += `
                    <li>
                        <a href="${pagination.start_page -1}" class="reft main-user-bottom-left">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="main-user-bottom-svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.58 3.27c.504.405.563 1.115.13 1.587L9.168 12l6.543 7.143a1.076 1.076 0 0 1-.13 1.586 1.26 1.26 0 0 1-1.695-.122L6 12l7.885-8.607a1.26 1.26 0 0 1 1.695-.122Z"></path>
                            </svg>
                        </a>
                    </li>
                 `
            }
        }

        // x문자열 선언
        const x = "x"

        // i가 0에서 시작; page_count 보다 작을 때까지 반복; i를 1씩 증가;
        for (let i = 0; i < pagination.page_count; i++) {
            // 반복문을 사용하여 문자열 x를 오른쪽으로 정렬
            // const padX = x.padEnd(pagination.page_count, ' ');
            // 현재 반복 횟수 + 시작 페이지 <= 진짜 끝나는 페이지 이하라면
            if (i + pagination.start_page <= pagination.real_end) {
                // 페이지가 현재 반복 횟수 + 시작 페이지와 같다면
                if (page === i + pagination.start_page) {
                    // 추가
                    text += `
                        <li class="main-margin">
                            <a href="javascript:void(0)" class="pagination main-user-bottom">
                                <span class="main-user-number" style="color: #CE201B;">${i + pagination.start_page}</span>
                            </a>
                        </li>
                    `
                // 같지 않다면
                } else {
                    // 정렬이 popular 와 같다면
                    if (pagination.order === 'popular') {
                        // 추가
                        text += `
                            <li class="main-margin">
                                <a href="${i + pagination.start_page} popular" class="pagination main-user-bottom" aria-label="page number button">
                                    <span class="main-user-number">${i + pagination.start_page}</span>
                                </a>
                            </li>
                        `
                    // 아니라면
                    } else {
                        // 추가
                        text += `
                            <li class="main-margin">
                                <a href="${i + pagination.start_page}" class="pagination main-user-bottom" aria-label="page number button">
                                    <span class="main-user-number">${i + pagination.start_page}</span>
                                </a>
                            </li>
                        `
                    }
                }
            }
        }


        if (pagination.end_page < pagination.real_end) {
            if (pagination.order === 'popular') {
                text += `
                    <li class="main-margin">
                        <a href="${pagination.end_page + 1} popular" class="right main-user-bottom-right">
                            <svg class="main-user-bottom-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.42 20.73a1.076 1.076 0 0 1-.13-1.587L14.832 12 8.289 4.857a1.076 1.076 0 0 1 .13-1.586 1.26 1.26 0 0 1 1.696.122L18 12l-7.885 8.607a1.26 1.26 0 0 1-1.695.122Z"></path>
                            </svg>
                        </a>
                    </li>
                `
            } else {
                text += `
                    <li class="main-margin">
                        <a href="${pagination.end_page + 1}" class="right main-user-bottom-right">
                            <svg class="main-user-bottom-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.42 20.73a1.076 1.076 0 0 1-.13-1.587L14.832 12 8.289 4.857a1.076 1.076 0 0 1 .13-1.586 1.26 1.26 0 0 1 1.696.122L18 12l-7.885 8.607a1.26 1.26 0 0 1-1.695.122Z"></path>
                            </svg>
                        </a>
                    </li>
                `
            }
        }

        return text;
    }

    return { showList: showList, showPaging: showPaging }
})()

adminNoticeService.getPagination(page, createListService.showList).then((text) => {
    noticeBox.innerHTML = text;
})

adminNoticeService.getPagination(page, createListService.showPaging).then((text) => {
    mainUserBottomUl.innerHTML = text;
})

const eventChange = (event) => {
    event.preventDefault()


}

mainUserBottomUl.addEventListener("click", (e) => {
    const endPage = document.querySelectorAll(".main-user-number")
    e.preventDefault()
    console.log(e.target)
    console.log(e.target.closest(".main-user-bottom-right"))
    if (e.target.closest(".main-user-bottom") && e.target.closest(".main-user-bottom").classList.contains('pagination')) {
        console.log("if 들어옴")
        page = e.target.closest(".main-user-bottom").querySelector(".main-user-number").innerText

        adminNoticeService.getPagination(page, createListService.showList).then((text) => {
            noticeBox.innerHTML = text;
        })
    } else if (e.target.closest(".main-user-bottom-right")) {
        page = parseInt(endPage[4].innerText) + 1

        adminNoticeService.getPagination(page, createListService.showList).then((text) => {
            noticeBox.innerHTML = text;
        })

        adminNoticeService.getPagination(page, createListService.showPaging).then((text) => {
            mainUserBottomUl.innerHTML = text;
        })
    } else if (e.target.closest(".main-user-bottom-left")) {
        page = parseInt(endPage[0].innerText) - 1

        adminNoticeService.getPagination(page, createListService.showList).then((text) => {
            noticeBox.innerHTML = text;
        })

        adminNoticeService.getPagination(page, createListService.showPaging).then((text) => {
            mainUserBottomUl.innerHTML = text;
        })
    }

    // const ul = e.target.closest(".main-user-bottom-ul")
    // console.log(e.target)
})