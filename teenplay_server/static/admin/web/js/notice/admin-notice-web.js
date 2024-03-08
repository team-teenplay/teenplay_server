let page = 1;

// 게시글 목록 가져오기
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