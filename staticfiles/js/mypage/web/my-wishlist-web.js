// 공개여부 및 전체를 선택하는 버튼 클릭 시 모달 열기
const tabListBtn = document.querySelector(".tab-list-btn");
const tabList = document.querySelector(".tab-list");

document.addEventListener("click", (e) => {
    if (!e.target.closest(".tab-list-contents")) {
        tabList.classList.remove("block");
    } else if (e.target.closest(".tab-list-btn") || e.target.closest(".tab-list")) {
        tabList.classList.toggle("block");
    }
});

// tap을 클릭 시 tabListBtn의 text에 tap을 안의 text로 바꿔준다
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabListBtn.firstElementChild.innerText = tab.innerText;
    });
});

// 삭제하기 클릭 시 해당 목록 선택하는 이벤트
const wishlistRemoveBtns = document.querySelectorAll(".wishlist-remove");
const deleteModalwrap = document.querySelector(".delete-modal-wrap");
let deleteTarget;

wishlistRemoveBtns.forEach((wishlistRemoveBtn) => {
    wishlistRemoveBtn.addEventListener("click", (e) => {
        deleteModalwrap.querySelector(".check-svg-box").style.display = "none";
        deleteModalwrap.querySelector(".delete-modal-container").style.animation = "popUp 0.5s";
        deleteModalwrap.style.display = "block";
        deleteTarget = wishlistRemoveBtn;
    });
});

// 모달내 닫기 및 확인 버튼 클릭 시 이벤트
const closeBtns = deleteModalwrap.querySelectorAll("button");

closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
        if (e.target.className == "check-btn") {
            deleteModalwrap.querySelector(".delete-modal-container").style.animation = "popDown 0.5s";
            setTimeout(() => {
                deleteModalwrap.style.display = "none";
                deleteTarget.closest(".wishlist-details").remove();
            }, 450);
        } else {
            deleteModalwrap.querySelector(".delete-modal-container").style.animation = "popDown 0.5s";
            setTimeout(() => {
                deleteModalwrap.style.display = "none";
            }, 450);
        }
    });
});
