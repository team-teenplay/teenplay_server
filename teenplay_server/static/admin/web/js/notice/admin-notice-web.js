// 전체 선택 버튼
const statusName = document.querySelector(".main-user-status-name");
// 체크박스
const checkBox = document.querySelectorAll(".main-comment-list-checkbox");
// 선택된 게시글 개수
const totalCount = document.getElementById("total-count");
// 상태 변경 버튼
const deleteButton = document.querySelector(".toggle-button")
// 목록 태그
const noticeBox = document.querySelector(".notice-data")

let page = 1;

// 게시글 목록 가져오기
const showlist = (notices) => {
    let text = ``;
    notices.forEach((notice) => {
        text += `
            <li class="main-user-list" data-id="${notice.id}">
                <div class="main-comment-list-check">
                    <input type="checkbox" class="main-comment-list-checkbox" />
                </div>
                <div class="main-user-list-name">${notice.notice_title}</div>
                <div class="main-user-list-status">${notice.created_date}</div>
                <div class="main-user-list-category" >
                    {% if notice.notice_type == 0 %}
                        공지사항
                    {% elif notice.notice_type == 1 %}
                        자주묻는질문
                    {% endif %}
                </div>
                <div class="main-user-list-detail">
                    <button class="member-user-list-detail-button toggle-button" data-target="${notice.id}">상세보기</button>
                </div>
            </li>
        `
    })
    return text;
}


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
                deleteButton.classList.remove("disabled");
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
            deleteButton.classList.add("disabled");
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
        deleteButton.classList.toggle("disabled", !checkbox.checked);
    });
});

// 삭제하기 버튼
const modalDeleteOpenButtons = document.querySelectorAll(".member-user-list-button");
// 모달 속 취소 버튼
const modalDeleteCloseButtons = document.querySelectorAll(".admin-user-modal-left-button");
// 모달 속 삭제 버튼
const modalDeleteButtons = document.querySelectorAll(".admin-user-modal-right-button");

// 삭제 모달
const deletemodal = document.getElementById("admin-user-modal");
const deletemodalBack = document.getElementById("admin-user-modal-backdrop");

let currentTargetLi;

// 삭제하기 버튼 클릭 시 이벤트 발생
modalDeleteOpenButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // 타겟의 아이디 값 가져오기
        const targetId = event.currentTarget.getAttribute("data-target");
        currentTargetLi = document.querySelector(`li[data-number="${targetId}"]`
        );

        // 모달 열기
        deletemodal.classList.remove("hidden");
        deletemodalBack.classList.remove("hidden");
    });
});

// 삭제 모달 속 닫기 버튼 클릭 시 이벤트 발생
modalDeleteCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // 삭제 모달 비활성화
        deletemodal.classList.add("hidden");
        deletemodalBack.classList.add("hidden");
    });
});

// 삭제 모달 속 삭제 버튼 클릭 시 이벤트 발생
modalDeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // 체크된 체크 박스 가져오기
        const checkedItems = document.querySelectorAll(".main-comment-list-checkbox:checked");

        // 체크된 체크 박스 반복하여 하나씩 checkbox에 담기
        for (const checkbox of checkedItems) {
            // 체크된 checkbox와 가장 가까운 li 요소를 찾고 data-id 값을 가져오기
            const targetId = checkbox.closest("li").getAttribute("data-id");

            // data-id 속성 값이 같은 li 요소를 가져오기
            adminNoticeService.remove({ targetId: targetId });
        }

        // 모달 닫기
        deletemodal.classList.add("hidden");
        deletemodalBack.classList.add("hidden");
        adminNoticeService.getList(showlist).then((text) => {
            noticeBox.innerHTML = text;
        })
    });
});

adminNoticeService.getList(showlist).then((text) => {
    noticeBox.innerHTML = text;
})