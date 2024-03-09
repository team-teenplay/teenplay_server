// 전체 선택 버튼
const statusName = document.querySelector(".main-user-status-name");
// 체크박스
const checkBox = document.querySelectorAll(".main-comment-list-checkbox");
// 선택된 회원의 명수
const totalCount = document.getElementById("total-count");
// 상태 변경 버튼
const statusUpdateButton = document.querySelector(".toggle-button")
// 상태 변경 모달창
const modal = document.getElementById("admin-user-modal");
const modalBack = document.getElementById("admin-user-modal-backdrop");
// 취소 버튼
const modalCloseButtons = document.getElementById("modalCloseButton");
// 적용하기 버튼
const ApplyButton = document.getElementById("modalApplyButton")

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
    checkBoxCount();

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

// 상태 변경 버튼 클릭 시 이벤트 발생
statusUpdateButton.addEventListener("click", (event) => {
    // 이벤트 객체 class명에 disabled가 없다면, 모달 오픈
    if (!event.currentTarget.classList.contains("disabled")) {

        modal.classList.remove("hidden");
        modalBack.classList.remove("hidden");
    }
});

// 상태 변경 취소 버튼 클릭 시 모달 종료
modalCloseButtons.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalBack.classList.add("hidden");
});

// 모달 창 밖 화면 클릭 시 모달 종료
document.addEventListener("click", (e) => {
    if (!statusUpdateButton.contains(e.target) && !modal.contains(e.target)) {
        modal.classList.add("hidden");
        modalBack.classList.add("hidden");
    }
})

// 적용하기 버튼 클릭 시 이벤트 발생
ApplyButton.addEventListener("click", async () => {
    // 체크 박스
    const checkBox = document.getElementById('checkbox');
    // 회원 상태
    const statusBox = document.querySelector('.main-user-list-message');
    // 만약 체크 박스가 True라면,
    if (checkBox) {
        // 체크 박스에 포함된 user.id 정보 가져오기
        const idValue = checkBox.closest("li").getAttribute('data-id');
        const id = document.querySelector(`li[data-id="${idValue}"]`);
        // 회원 상태 태그에 포함된 user.status 정보 가져오기
        const satus = statusBox.getAttribute('data-user-status');
        console.log(id)
        // 만약, status가 -1(정지)이라면
        if (satus === '-1') {
            // 해당 유저의 status를 1(활동중)로 변경
            await adminUserService.update({user_id: id}, {status: 1})
        // 만약, status가 1(활동중)이라면
        } else if (satus === '1') {
            // 해당 유저의 status를 -1(정지)로 변경
            await adminUserService.update({user_id: id}, {status: -1})
        }

    }

    // 다 끝나면 모달 종료
    modal.classList.add("hidden");
    modalBack.classList.add("hidden");
})