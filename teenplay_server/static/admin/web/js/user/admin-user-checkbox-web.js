// 전체 선택 버튼
const statusName = document.querySelector(".main-user-status-name");
// 체크박스
const checkBox = document.querySelectorAll(".main-comment-list-checkbox");
// 선택된 회원의 개수
const totalCount = document.getElementById("total-count");
// 상태 변경 버튼
const statusUpdateButton = document.querySelector(".toggle-button")
// 상태 변경 모달창
const modal = document.getElementById("admin-user-modal");
const modalBack = document.getElementById("admin-user-modal-backdrop");
// 취소 버튼
const modalCloseButtons = document.querySelector(".admin-user-modal-left-button");
// 적용하기 버튼
const applyButton = document.querySelector(".admin-user-modal-right-button");

// 체크 박스 체크 시 카운트 업데이트 함수 선언
function checkBoxCount() {
    // 체크박스 체크 시 전체 숫자 up
    let checkedCount = 0;

    // 체크박스 반복하여 하나씩 가져오기
    checkBox.forEach((check) => {
        // 체크박스 체크 시 체크 카운트 up
        if (check.checked) {
            checkedCount++;
        }
    });

    // 선택된 회원의 개수(텍스트)에 checkedCount(개수 데이터) 업데이트
    totalCount.textContent = checkedCount;
}

// 체크 박스 선택 시 함수 실행
// 체크 박스 반복하여 하나씩 가져오기
checkBox.forEach((check) => {
    // 체크 박스 값 변경(change) 시 이벤트 발생, checkBoxCount 함수 실행
    check.addEventListener('change', checkBoxCount)
});

// 체크 박스 전체 선택 버튼 기능 구현
// 전체 선택 버튼 클릭 시 이벤트 발생
statusName.addEventListener("click", () => {
    // 모든 체크박스가 체크되었다고 가정
    let allChecked = true;

    // 체크 박스 반복하여 하나씩 가져오기
    checkBox.forEach((checkbox) => {
        // 만약, 체크 박스가 체크되어 있지 않다면
        if (!checkbox.checked) {
                allChecked = false;
                // 체크박스 체크해주기
                checkbox.checked = true;
                // 상태 변경 버튼 활성화
                statusUpdateButton.classList.remove("disabled");
            }
        });

    // 체크 박스 반복하여 하나씩 가져오기
    checkBox.forEach((checkbox) => {
        // 모든 체크 박스가 체크 되어 있다면
        if (allChecked) {
            // 체크박스 체크 없애기
            checkbox.checked = false;
            // 상태 변경 버튼 비활성화
            statusUpdateButton.classList.add("disabled");
        }
    });
    // checkBoxCount 함수 실행
    checkBoxCount();
});

// 체크 박스 선택 여부에 따라 버튼 활성화/비활성화
// 체크 박스 반복하여 하나씩 가져오기
checkBox.forEach((checkbox) => {
    // 체크 박스 값 변경(change) 시 이벤트 발생, checkBoxCount 함수 실행
    checkbox.addEventListener('change', () => {
        // 체크 박스 선택 여부에 따라 버튼 활성화/비활성화
        statusUpdateButton.classList.toggle("disabled", !checkbox.checked);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // 상태 변경 버튼 클릭 시 모달 오픈
    statusUpdateButton.addEventListener("click", (event) => {
        // 모달 오픈
        if (!event.currentTarget.classList.contains("disabled")) {
            const userId = event.currentTarget.getAttribute("data-id");
            modal.setAttribute("data-id", userId);
            modal.classList.remove("hidden");
            modalBack.classList.remove("hidden");
        }
    });

    // 상태 변경 취소 버튼 클릭 시 모달 종료
    modalCloseButtons.addEventListener("click", () => {
        modal.classList.add("hidden");
        modalBack.classList.add("hidden");
    });

    // 상태 변경 적용 버튼 클릭 시 변경 내용 적용 및 모달 종료
    applyButton.addEventListener("click", () => {
        const userId = modal.getAttribute("data-id");
        const userStatus = document.querySelector(`[data-id="${userId}"]`);

        const checkedItems = document.querySelectorAll(".main-comment-list-checkbox:checked");

        checkedItems.forEach((checkbox) => {
            const targetId = checkbox.closest("li").getAttribute("data-number");
            const targetUserStatus = document.querySelector(
                `[data-id="${targetId}"]`
            );

            // 여기에서 상태를 변경하는 로직을 추가
            if (targetUserStatus.textContent.trim() === "활동중") {
                targetUserStatus.textContent = "정지";
            } else if (targetUserStatus.textContent.trim() === "정지") {
                targetUserStatus.textContent = "활동중";
            }
        });

        modal.classList.add("hidden");
        modalBack.classList.add("hidden");
    });
});





// 상태 변경 적용 버튼 클릭 시 변경 내용 적용 및 모달 종료
applyButton.addEventListener("click", () => {
    const userId = modal.getAttribute("data-id");
    const userStatus = document.querySelector(`[data-id="${userId}"]`);

    const checkedItems = document.querySelectorAll(
        ".main-comment-list-checkbox:checked"
    );

    checkedItems.forEach((checkbox) => {
        const targetId = checkbox.closest("li").getAttribute("data-number");
        const targetUserStatus = document.querySelector(
            `[data-id="${targetId}"]`
        );

        // 여기에서 상태를 변경하는 로직을 추가
        if (targetUserStatus.textContent.trim() === "활동중") {
            targetUserStatus.textContent = "정지";
        } else if (targetUserStatus.textContent.trim() === "정지") {
            targetUserStatus.textContent = "활동중";
        }
    });

    modal.classList.add("hidden");
    modalBack.classList.add("hidden");
});

// 분류 모달창
const searchModal = document.getElementById("admin-message-modal-search");
const searchOpen = document.querySelector(".main-wish-sellect-button");
const searchSend = document.querySelector(".admin-message-modal-search-send");
const searchReceive = document.querySelector(".admin-message-modal-search-receive");
const searchText = document.querySelector(".main-wish-sellect-button-span");
const searchadd = document.querySelector(".admin-message-modal-search-donotreceive");
const svg = document.querySelector(".main-comment-info-button-svg");

// 검색 버튼 클릭 시 모달 열기
searchOpen.addEventListener("click", (event) => {
    // 이벤트 전파를 막기 위해 stopPropagation() 호출
    event.stopPropagation();
    svg.setAttribute("transform", "rotate(180)");
    searchModal.classList.remove("hidden");
});

// 모달 외부를 클릭했을 때 이벤트 처리
document.addEventListener("click", (event) => {
    if (event.target !== searchOpen && !searchModal.contains(event.target)) {
        // 클릭된 요소가 검색 버튼이 아니고 모달 창에 속하지 않으면 모달을 닫음
        svg.removeAttribute("transform");
        searchModal.classList.add("hidden");
    }
});

// "공개/비공개" 버튼 클릭 시 모달 닫고 텍스트 변경
searchReceive.addEventListener("click", () => {
    searchModal.classList.add("hidden");
    searchText.textContent = "전체";
    svg.removeAttribute("transform");
});
// "공개" 버튼 클릭 시 모달 닫고 텍스트 변경
searchSend.addEventListener("click", () => {
    searchModal.classList.add("hidden");
    searchText.textContent = "활동중";
    svg.removeAttribute("transform");
});

// "비공개" 버튼 클릭 시 모달 닫고 텍스트 변경
searchadd.addEventListener("click", () => {
    searchModal.classList.add("hidden");
    searchText.textContent = "정지";
    svg.removeAttribute("transform");
});