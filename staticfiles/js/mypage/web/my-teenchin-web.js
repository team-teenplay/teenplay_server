// 정렬 우선 순위 선택하는 버튼 클릭 시 모달 열기
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

// 틴친중, 신청중 버튼 클릭 시 발생 하는 이벤트
const teenchinModalWrap = document.querySelector(".teenchin-modal-wrap");
const teenchinModalContainer = document.querySelector(".teenchin-modal-container");

// 틴친중
const teenchinBtns = document.querySelectorAll(".teenchin-btn");

teenchinBtns.forEach((teenchinBtn) => {
    teenchinBtn.addEventListener("click", (e) => {
        let profileName = e.target.closest(".teenchin-items").querySelector(".profile-name").innerText;
        madalContent(e, profileName);

        teenchinModalContainer.style.animation = "popUp 0.5s";
        teenchinModalWrap.style.display = "flex";
    });
});

// 신청중
const teenchinWaitBtns = document.querySelectorAll(".teenchin-wait-btn");

teenchinWaitBtns.forEach((teenchinWaitBtn) => {
    teenchinWaitBtn.addEventListener("click", (e) => {
        let profileName = e.target.closest(".teenchin-items").querySelector(".profile-name").innerText;
        madalContent(e, profileName);

        teenchinModalContainer.style.animation = "popUp 0.5s";
        teenchinModalWrap.style.display = "flex";
    });
});

// 수락하기
const teenchinAgreeBtns = document.querySelectorAll(".teenchin-agree-btn");

teenchinAgreeBtns.forEach((teenchinAgreeBtn) => {
    teenchinAgreeBtn.addEventListener("click", (e) => {
        let profileName = e.target.closest(".teenchin-items").querySelector(".profile-name").innerText;
        madalContent(e, profileName);

        teenchinModalContainer.style.animation = "popUp 0.5s";
        teenchinModalWrap.style.display = "flex";
    });
});

// 버튼의 클래스에 따라 모달창 내용을 변경해주는 함수
const teenchinModalTitle = document.querySelector(".teenchin-modal-title");
const teenchinModalCancleBtn = document.querySelector(".teenchin-modal-cancle-btn");
const teenchinModalChangedBtn = document.querySelector(".teenchin-modal-changed-btn");
const modalHeaderTitle = teenchinModalWrap.querySelector(".modal-header-title");

const madalContent = (e, profileName) => {
    if (e.target.closest(".teenchin-agree-btn")) {
        teenchinModalTitle.innerText = `${profileName}님의\n틴친 요청을 수락 하시겠습니까?`;
        teenchinModalCancleBtn.innerText = `거절하기`;
        teenchinModalCancleBtn.classList.add("refuse-btn");
        teenchinModalChangedBtn.innerText = `수락하기`;
        teenchinModalChangedBtn.classList.add("agree-btn");
        modalHeaderTitle.innerText = `${profileName}님의`;
        return;
    }

    if (e.target.closest(".teenchin-btn")) {
        teenchinModalTitle.innerText = `${profileName}님과\n틴친을 취소 하시겠습니까?`;
        teenchinModalChangedBtn.innerText = `틴친끊기`;
        modalHeaderTitle.innerText = `더 이상 ${profileName}님과\n틴친관계가 아닙니다.`;
        return;
    }

    if (e.target.closest(".teenchin-wait-btn")) {
        teenchinModalTitle.innerText = `${profileName}님에게\n보낸 틴친 신청을 취소하시겠습니까?`;
        teenchinModalChangedBtn.innerText = `취소하기`;
        modalHeaderTitle.innerText = `${profileName}님에게\n보낸 틴친 신청을 취소했습니다.`;
    }
};

// 틴친끊기, 취소하기 클릭 시 기존 모달을 닫고 확인모달을 나타내는 이벤트
const teenchinModalBtns = teenchinModalContainer.querySelectorAll("button");
const teenchinCheckModalContainer = teenchinModalWrap.querySelector(".teenchin-check-modal-container");

teenchinModalBtns.forEach((teenchinModalBtn) => {
    teenchinModalBtn.addEventListener("click", (e) => {
        teenchinModalContainer.style.animation = "popDown 0.5s";
        if (e.target.closest(".teenchin-modal-cancle-btn")) {
            if (e.target.closest(".teenchin-modal-cancle-btn").classList.contains("refuse-btn")) {
                modalHeaderTitle.innerText += `\n틴친 요청을 거절하셨습니다.`;

                setTimeout(() => {
                    teenchinModalCancleBtn.innerText = `닫기`;
                    teenchinModalCancleBtn.classList.remove("refuse-btn");
                    teenchinModalChangedBtn.classList.remove("agree-btn");
                    teenchinModalContainer.style.display = "none";
                    teenchinCheckModalContainer.style.animation = "popUp 0.5s";
                    teenchinCheckModalContainer.style.display = "flex";
                }, 500);
                return;
            }
            setTimeout(() => {
                teenchinModalWrap.style.display = "none";
            }, 500);
        } else {
            if (e.target.closest(".teenchin-modal-changed-btn").classList.contains("agree-btn")) {
                modalHeaderTitle.innerText += `\n틴친 요청을 수락하셨습니다.`;

                setTimeout(() => {
                    teenchinModalCancleBtn.innerText = `닫기`;
                    teenchinModalCancleBtn.classList.remove("refuse-btn");
                    teenchinModalChangedBtn.classList.remove("agree-btn");
                }, 500);
            }

            setTimeout(() => {
                teenchinModalContainer.style.display = "none";
                teenchinCheckModalContainer.style.animation = "popUp 0.5s";
                teenchinCheckModalContainer.style.display = "flex";
            }, 500);
        }
    });
});

// 2번째 확인 모달 내 확인버튼 클릭 시 발생하는 이벤트
const checkBtn = teenchinModalWrap.querySelector(".check-btn");

checkBtn.addEventListener("click", () => {
    teenchinCheckModalContainer.style.animation = "popDown 0.5s";
    setTimeout(() => {
        teenchinModalContainer.style.display = "flex";
        teenchinCheckModalContainer.style.display = "none";
        teenchinModalWrap.style.display = "none";
    }, 500);
});

// 쪽지 보내기 클릭 시 작성 모달 여는 이벤트
const sendModalWrap = document.querySelector(".send-modal-wrap");
const sendLetterBtns = document.querySelectorAll(".send-letter-btn");

sendLetterBtns.forEach((sendLetterBtn) => {
    sendLetterBtn.addEventListener("click", (e) => {
        document.querySelector(".send-receiver-email").value = e.target.closest(".teenchin-items").querySelector(".profile-name").innerText;
        sendModalWrap.querySelector(".send-modal-container").style.animation = "popUp 0.5s";
        sendModalWrap.style.display = "block";
    });
});

// textarea 내 value에 따라 보내기 버튼 활성화/비활성화
const sendCheckBtn = document.querySelector(".send-check-btn");
const textarea = document.querySelector("textarea[name=send-content]");

textarea.addEventListener("input", (e) => {
    checkValue();
});

const checkValue = () => {
    if (textarea.value) {
        sendCheckBtn.disabled = false;
        return;
    }
    sendCheckBtn.disabled = true;
};

// 쪽지 보내기 모달 내 버튼 클릭 시 발생하는 이벤트
const sendModalBtns = document.querySelectorAll(".send-modal-container button");

sendModalBtns.forEach((sendModalBtn) => {
    sendModalBtn.addEventListener("click", (e) => {
        if (e.target.className == "send-check-btn") {
            sendModalWrap.querySelector(".send-modal-container").style.animation = "popDown 0.5s";
            setTimeout(() => {
                sendModalWrap.querySelector(".send-modal-container").style.display = "none";
                sendModalWrap.querySelector(".check-modal-container").style.animation = "popUp 0.5s";
                sendModalWrap.querySelector(".check-modal-container").style.display = "flex";
                sendModalWrap.querySelector(".send-receiver-email").value = ``;
                sendModalWrap.querySelector("textarea[name=send-content]").value = ``;
                checkValue();
            }, 450);
        } else {
            sendModalWrap.querySelector(".send-modal-container").style.animation = "popDown 0.5s";
            setTimeout(() => {
                sendModalWrap.style.display = "none";
                sendModalWrap.querySelector(".send-receiver-email").value = ``;
                sendModalWrap.querySelector("textarea[name=send-content]").value = ``;
                checkValue();
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
