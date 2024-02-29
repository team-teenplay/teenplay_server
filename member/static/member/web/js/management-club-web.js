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

sortingTargets.forEach((sortingTarget) => {
    sortingTarget.addEventListener("click", () => {
        sortingBtn.firstElementChild.innerText = sortingTarget.innerText;
    });
});
