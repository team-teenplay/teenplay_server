// 위시리스트 댓글 메뉴 열고 닫기 이벤트
const wishlistCommentMenuButton = document.querySelector(".comment-menu");
const wishlistCommentMenu = document.querySelector(".comment-menu-open-wrap");

wishlistCommentMenuButton.addEventListener("click", () => {
    wishlistCommentMenu.classList.toggle("hidden");
});

// 위시리스트 댓글 메뉴 닫기 이벤트
document.addEventListener("click", (e) => {
    if (
        !wishlistCommentMenuButton.contains(e.target) &&
        !wishlistCommentMenu.contains(e.target)
    ) {
        wishlistCommentMenu.classList.add("hidden");
    }
});

// 댓글 수정 이벤트
const commentMenuOpenUpdate = document.getElementById(
    "comment-menu-open-update"
);
const commentInputUpdate = document.querySelector(
    ".comment-update-box-all-wrap"
);
const commentComment = document.querySelector(".comment-list-all-wrap");

commentMenuOpenUpdate.addEventListener("click", () => {
    commentInputUpdate.classList.remove("hidden");
    commentComment.classList.add("hidden");
});

const commentUploadFinish = document.getElementById("comment-update-upload");

commentUploadFinish.addEventListener("click", () => {
    commentInputUpdate.classList.add("hidden");
    commentComment.classList.remove("hidden");
});
