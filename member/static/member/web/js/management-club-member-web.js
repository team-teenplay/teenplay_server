// 전체선택 클릭 시 발생하는 이벤트
// 전체선택이라는 div를 가져온다
const checkedAllCategory = document.querySelector(".checked-all-category");
// 체크박스 전체를 가져온다
const inputCheckboxes = document.querySelectorAll("input[type=checkbox]");

checkedAllCategory.addEventListener("click", () => {
    // 체크된 체크박스들을 가져온다
    let inputCheckedboxes = document.querySelectorAll("input[type=checkbox]:checked");

    // 반복문을 통해 각 버튼에 속성을 바꾼다.
    for (const inputCheckbox of inputCheckboxes) {
        // 체크된 것의 개수와 전체 개수가 같다면
        if (inputCheckedboxes.length == inputCheckboxes.length) {
            inputCheckbox.checked = false;
            // 체크된 것의 개수와 전체 개수가 같지 않다면
        } else {
            inputCheckbox.checked = true;
        }
    }
    insertCheckedMemberCount();
});

// input[type=checkbox]에 변화가 있을 경우 감지하고 insertCheckedMemberCount 함수를 실행해주는 이벤트
inputCheckboxes.forEach((inputCheckbox) => {
    inputCheckbox.addEventListener("change", () => {
        insertCheckedMemberCount();
    });
});

// 체크된 개수를 선택된 구성원 수에 넣어주는 함수
const insertCheckedMemberCount = () => {
    const checkedMemberCount = document.querySelector(".checked-member-count");
    let inputCheckedboxes = document.querySelectorAll("input[type=checkbox]:checked");

    checkedMemberCount.innerText = `${inputCheckedboxes.length}명`;
};

// 쪽지 보내기 클릭 시 작성 모달 여는 이벤트
const sendModalWrap = document.querySelector(".send-modal-wrap");
const sendToCheckedMember = document.querySelector(".send-to-checked-member");
const noneModalWrap = document.querySelector(".none-modal-wrap");

sendToCheckedMember.addEventListener("click", () => {
    let inputCheckedboxes = document.querySelectorAll("input[type=checkbox]:checked");

    if (inputCheckedboxes.length == 0) {
        noneModalWrap.querySelector(".none-modal-container").style.animation = "popUp 0.5s";
        noneModalWrap.style.display = "block";
        return;
    }

    for (let inputCheckedbox of inputCheckedboxes) {
        let email = inputCheckedbox.closest(".member-info-list").querySelector(".email");
        sendModalWrap.querySelector(".send-receiver-email").innerHTML += `<span class="email-span">${email.innerText}</span>`;
    }
    sendModalWrap.querySelector(".send-modal-container").style.animation = "popUp 0.5s";
    sendModalWrap.style.display = "block";
});

// none-modal-wrap의 닫기 버튼 클릭 시
const noneModalCloseBtn = document.querySelector(".none-modal-close-btn");

noneModalCloseBtn.addEventListener("click", () => {
    noneModalWrap.querySelector(".none-modal-container").style.animation = "popDown 0.5s";
    setTimeout(() => {
        noneModalWrap.style.display = "none";
    }, 450);
});

// 쪽지 작성 모달 내 textarea의 value 상태에 따라 보내기 버튼 활성화/비활성화
const textarea = sendModalWrap.querySelector("textarea[name=send-content]");
const sendCheckBtn = sendModalWrap.querySelector(".send-check-btn");

textarea.addEventListener("input", (e) => {
    sendCheckBtn.disabled = !e.target.value.trim();
});

// 쪽지 보내기 모달 버튼 클릭 시 발생하는 이벤트
const sendModalBtns = document.querySelectorAll(".send-modal-container button");

sendModalBtns.forEach((sendModalBtn) => {
    sendModalBtn.addEventListener("click", (e) => {
        if (e.target.className == "send-check-btn") {
            sendModalWrap.querySelector(".send-modal-container").style.animation = "popDown 0.5s";
            setTimeout(() => {
                sendModalWrap.querySelector(".send-modal-container").style.display = "none";
                sendModalWrap.querySelector(".check-modal-container").style.animation = "popUp 0.5s";
                sendModalWrap.querySelector(".check-modal-container").style.display = "flex";
                sendModalWrap.querySelector(".send-receiver-email").innerHTML = ``;
                sendModalWrap.querySelector("textarea[name=send-content]").value = ``;
                sendCheckBtn.disabled = true;
            }, 450);
        } else {
            sendModalWrap.querySelector(".send-modal-container").style.animation = "popDown 0.5s";
            setTimeout(() => {
                sendModalWrap.style.display = "none";
                sendModalWrap.querySelector(".send-receiver-email").innerHTML = ``;
                sendModalWrap.querySelector("textarea[name=send-content]").value = ``;
                sendCheckBtn.disabled = true;
            }, 450);
        }
    });
});

// 보내기 확인 모달 내 확인 클릭 시 모달 종료하는 이벤트
const checkModalCheckBtn = document.querySelector(".check-modal-container .check-btn");

checkModalCheckBtn.addEventListener("click", () => {
    sendModalWrap.querySelector(".check-modal-container").style.animation = "popDown 0.5s";
    setTimeout(() => {
        sendModalWrap.style.display = "none";
        sendModalWrap.querySelector(".check-modal-container").style.display = "none";
        sendModalWrap.querySelector(".send-modal-container").style.display = "flex";
    }, 450);
});

// 가입중 클릭 시 퇴출 확인 모달 나타나는 이벤트
const kickOutModalWrap = document.querySelector(".kick-out-modal-wrap");
const kickOutModalContainer = kickOutModalWrap.querySelector(".kick-out-modal-container");
let target;
let targetName;
const statusAddEvent = () => {
    let memberStatusJoinBtns = document.querySelectorAll(".member-status-join-btn");

    memberStatusJoinBtns.forEach((memberStatusJoinBtn) => {
        memberStatusJoinBtn.addEventListener("click", (e) => {
            target = e.target.closest(".member-info-list");
            targetName = target.querySelector(".member-name").innerText;

            kickOutModalContainer.style.animation = "popUp 0.5s";
            kickOutModalContainer.querySelector(".kick-out-modal-title").innerText = `${targetName}님을 퇴출하시겠습니까?`;
            kickOutModalWrap.style.display = "block";
        });
    });
};

statusAddEvent();

// 퇴출 모달 내 버튼 클릭 시 발생하는 이벤트
const kickOutModalContainerBtns = kickOutModalWrap.querySelectorAll("button");
const kickOutCheckModalContainer = kickOutModalWrap.querySelector(".kick-out-check-modal-container");

kickOutModalContainerBtns.forEach((kickOutModalContainerBtn) => {
    kickOutModalContainerBtn.addEventListener("click", (e) => {
        kickOutModalContainer.style.animation = "popDown 0.5s";
        if (e.target.className == "kick-out-btn") {
            // 데이터가 없어 임시 방편으로 사용
            target.remove();

            setTimeout(() => {
                kickOutModalContainer.style.display = "none";
                kickOutCheckModalContainer.querySelector(".modal-header-title").innerText = `${targetName}님을 퇴출했습니다.`;
                kickOutCheckModalContainer.style.animation = "popUp 0.5s";
                kickOutCheckModalContainer.style.display = "flex";
            }, 450);
        } else if (e.target.className == "kick-out-modal-cancle-btn") {
            setTimeout(() => {
                kickOutModalWrap.style.display = "none";
            }, 450);
        } else {
            kickOutCheckModalContainer.style.animation = "popDown 0.5s";
            setTimeout(() => {
                kickOutCheckModalContainer.style.removeProperty("animation");
                kickOutCheckModalContainer.style.display = "none";
                kickOutModalContainer.style.display = "flex";
                kickOutModalWrap.style.display = "none";
            }, 450);
        }
    });
});

// 가입대기 클릭 시 퇴출 확인 모달 나타나는 이벤트
const joinModalWrap = document.querySelector(".join-modal-wrap");
const joinModalContainer = joinModalWrap.querySelector(".join-modal-container");
const memberStatusStandBtns = document.querySelectorAll(".member-status-stand-btn");

memberStatusStandBtns.forEach((memberStatusStandBtn) => {
    memberStatusStandBtn.addEventListener("click", (e) => {
        target = e.target.closest(".member-info-list");
        targetName = target.querySelector(".member-name").innerText;

        joinModalContainer.style.animation = "popUp 0.5s";
        joinModalContainer.querySelector(".join-modal-title").innerText = `${targetName}님의 가입을 승인하시겠습니까?`;
        joinModalWrap.style.display = "block";
    });
});

// 가입 모달 내 버튼 클릭 시 발생하는 이벤트
const joinModalContainerBtns = joinModalWrap.querySelectorAll("button");
const joinCheckModalContainer = joinModalWrap.querySelector(".join-check-modal-container");

joinModalContainerBtns.forEach((joinModalContainerBtn) => {
    joinModalContainerBtn.addEventListener("click", (e) => {
        joinModalContainer.style.animation = "popDown 0.5s";
        if (e.target.className == "join-btn") {
            // 데이터가 없어 임시 방편으로 사용
            target.querySelector(".member-status").innerHTML = `<div class="member-status-join-btn">가입중</div>`;
            statusAddEvent();

            setTimeout(() => {
                joinModalContainer.style.display = "none";
                joinCheckModalContainer.querySelector(".modal-header-title").innerText = `${targetName}님의 가입을 승인했습니다.`;
                joinCheckModalContainer.style.animation = "popUp 0.5s";
                joinCheckModalContainer.style.display = "flex";
            }, 450);
        } else if (e.target.className == "join-modal-cancle-btn") {
            setTimeout(() => {
                joinModalWrap.style.display = "none";
            }, 450);
        } else {
            joinCheckModalContainer.style.animation = "popDown 0.5s";
            setTimeout(() => {
                joinCheckModalContainer.style.removeProperty("animation");
                joinCheckModalContainer.style.display = "none";
                joinModalContainer.style.display = "flex";
                joinModalWrap.style.display = "none";
            }, 450);
        }
    });
});
