const modalDeleteOpenButtons = document.querySelectorAll(
    ".member-user-list-button"
);
const modalDeleteCloseButtons = document.querySelectorAll(
    ".admin-user-modal-left-button"
);
const modalDeleteAddCloseButtons = document.querySelectorAll(
    ".admin-user-modal-right-button"
);

const deletemodal = document.getElementById("admin-user-modal");
const deletemodalBack = document.getElementById("admin-user-modal-backdrop");
let currentTargetLi;

modalDeleteCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        deletemodal.classList.add("hidden");
        deletemodalBack.classList.add("hidden");
    });
});

modalDeleteOpenButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const targetId = event.currentTarget.getAttribute("data-target");
        currentTargetLi = document.querySelector(
            `li[data-number="${targetId}"]`
        );

        // 모달 열기
        deletemodal.classList.remove("hidden");
        deletemodalBack.classList.remove("hidden");
    });
});

const deleteButton = document.querySelector(".admin-user-modal-right-button");

deleteButton.addEventListener("click", () => {
    const checkedItems = document.querySelectorAll(
        ".main-comment-list-checkbox:checked"
    );

    checkedItems.forEach((checkbox) => {
        const targetId = checkbox.closest("li").getAttribute("data-id");
        const targetLi = document.querySelector(`li[data-id="${targetId}"]`);
        if (targetLi) {
            targetLi.remove();
        }
    });

    updateTotalCount();

    // 모달 닫기
    deletemodal.classList.add("hidden");
    deletemodalBack.classList.add("hidden");
});

function updateTotalCount() {
    // 각종 업데이트 코드
}

// 수정모달
const modalAndOpenButtons = document.querySelectorAll(
    ".member-user-list-detail-button"
);
const modalAndCloseButtons = document.querySelectorAll(
    ".admin-user-modal-left-detail-button"
);
const modalAndAddCloseButtons = document.querySelectorAll(
    ".admin-user-modal-right-detail-button"
);
const Andmodal = document.getElementById("admin-post-modal");

modalAndOpenButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const targetId = event.currentTarget.getAttribute("data-target");
        currentTargetLi = document.querySelector(`li[data-id="${targetId}"]`);

        // 모달 열기
        Andmodal.classList.remove("hidden");
        modalBack.classList.remove("hidden");
    });
});

// 모달닫기
modalAndCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        Andmodal.classList.add("hidden");
        modalBack.classList.add("hidden");
    });
});

// 모달수정버튼
modalAndAddCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        Andmodal.classList.add("hidden");
        modalBack.classList.add("hidden");
    });
});

// 카테고리 모달

const searchModal = document.getElementById("admin-message-modal-search");
const searchOpen = document.querySelector(".main-wish-sellect-button");
const searchSend = document.querySelector(".admin-message-modal-search-send");
const searchReceive = document.querySelector(
    ".admin-message-modal-search-receive"
);
const searchText = document.querySelector(".main-wish-sellect-button-span");
const searchadd = document.querySelector(
    ".admin-message-modal-search-donotreceive"
);
const path = document.querySelector(".main-comment-info-button-svg");
// 검색 버튼 클릭 시 모달 열기
searchOpen.addEventListener("click", (event) => {
    // 이벤트 전파를 막기 위해 stopPropagation() 호출
    event.stopPropagation();
    path.setAttribute("transform", "rotate(180)");
    searchModal.classList.remove("hidden");
});

// 모달 외부를 클릭했을 때 이벤트 처리
document.addEventListener("click", (event) => {
    if (event.target !== searchOpen && !searchModal.contains(event.target)) {
        // 클릭된 요소가 검색 버튼이 아니고 모달 창에 속하지 않으면 모달을 닫음
        path.removeAttribute("transform");
        searchModal.classList.add("hidden");
    }
});

// "공개/비공개" 버튼 클릭 시 모달 닫고 텍스트 변경
searchReceive.addEventListener("click", () => {
    path.removeAttribute("transform");
    searchModal.classList.add("hidden");
    searchText.textContent = "카테고리";
});
// "공개" 버튼 클릭 시 모달 닫고 텍스트 변경
searchSend.addEventListener("click", () => {
    path.removeAttribute("transform");
    searchModal.classList.add("hidden");
    searchText.textContent = "공지사항";
});

// "비공개" 버튼 클릭 시 모달 닫고 텍스트 변경

searchadd.addEventListener("click", () => {
    path.removeAttribute("transform");
    searchModal.classList.add("hidden");
    searchText.textContent = "자주묻는질문";
});

// -------------------------------------------------
// 공개 비공개 버튼
document.addEventListener("DOMContentLoaded", function () {
    const allItems = document.querySelectorAll(".main-user-list");

    function updateTotalCount() {
        // 숫자 세는 코드
        const visibleItems = document.querySelectorAll(
            ".main-user-list:not(.hidden)"
        );
        const totalCount = visibleItems.length;
        // 숫자를 표시할 요소에 totalCount를 업데이트합니다.
        document.getElementById("total-count").textContent = totalCount;
    }

    document
        .querySelector(".admin-message-modal-search-receive")
        .addEventListener("click", function () {
            allItems.forEach((item) => {
                item.classList.remove("hidden");
            });
            updateTotalCount(); // 버튼 클릭 후 숫자 업데이트
        });

    document
        .querySelector(".admin-message-modal-search-send")
        .addEventListener("click", function () {
            allItems.forEach((item) => {
                if (
                    item
                        .querySelector(".main-user-list-category")
                        .textContent.trim() !== "공지사항"
                ) {
                    item.classList.add("hidden");
                } else {
                    item.classList.remove("hidden");
                }
            });
            updateTotalCount(); // 버튼 클릭 후 숫자 업데이트
        });

    document
        .querySelector(".admin-message-modal-search-donotreceive")
        .addEventListener("click", function () {
            allItems.forEach((item) => {
                if (
                    item
                        .querySelector(".main-user-list-category")
                        .textContent.trim() !== "자주묻는질문"
                ) {
                    item.classList.add("hidden");
                } else {
                    item.classList.remove("hidden");
                }
            });
            updateTotalCount(); // 버튼 클릭 후 숫자 업데이트
        });

    // 페이지가 로드될 때도 숫자를 업데이트합니다.
    updateTotalCount();
});

updateTotalCount();

// 체크박스 채워주기
document.addEventListener("DOMContentLoaded", function () {
    const statusName = document.querySelector(".main-user-status-name");
    const checkboxes = document.querySelectorAll(".main-comment-list-checkbox");

    statusName.addEventListener("click", function () {
        let allChecked = true;
        checkboxes.forEach((checkbox) => {
            if (!checkbox.checked) {
                allChecked = false;
                checkbox.checked = true;
            }
        });

        if (allChecked) {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
        }
    });
});
