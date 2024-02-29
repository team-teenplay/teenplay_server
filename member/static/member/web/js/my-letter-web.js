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

// 삭제하기 클릭 시 확인 모달 표시하는 이벤트
const letterRemoveBtns = document.querySelectorAll(".letter-remove");
const deleteModalwrap = document.querySelector(".delete-modal-wrap");
const deleteModalContainer = deleteModalwrap.querySelector(".delete-modal-container");
let deleteTarget;

letterRemoveBtns.forEach((letterRemoveBtn) => {
    letterRemoveBtn.addEventListener("click", (e) => {
        deleteModalwrap.querySelector(".check-svg-box").style.display = "none";
        deleteModalContainer.style.animation = "popUp 0.5s";
        deleteModalwrap.style.display = "block";
        deleteTarget = letterRemoveBtn;
    });
});

// 삭제 모달내 닫기 및 확인 버튼 클릭 시 이벤트
const closeBtns = deleteModalwrap.querySelectorAll("button");

closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
        deleteModalContainer.style.animation = "popDown 0.5s";
        if (e.target.className == "check-btn") {
            setTimeout(() => {
                deleteModalwrap.style.display = "none";
                deleteTarget.closest(".letter-details").remove();
            }, 450);
        } else {
            setTimeout(() => {
                deleteModalwrap.style.display = "none";
            }, 450);
        }
    });
});

// 내용 클릭 시 해당 목록의 정보를 모달에 담고 보여주는 이벤트
const letterTextBtns = document.querySelectorAll(".letter-text");
const letterModalwrap = document.querySelector(".letter-modal-wrap");
let letterDetails;

letterTextBtns.forEach((letterTextBtn) => {
    letterTextBtn.addEventListener("click", (e) => {
        letterDetails = e.target.closest(".letter-details");
        // letter-details
        letterModalwrap.querySelector(".sender-email").innerText = letterDetails.querySelector(".letter-sender").innerText;
        letterModalwrap.querySelector(".receiver-email").innerText = letterDetails.querySelector(".letter-receiver").innerText;
        letterModalwrap.querySelector(".write-time").innerText = letterDetails.querySelector(".letter-write-time").innerText;
        letterModalwrap.querySelector("textarea[name=letter-content]").value = e.target.innerText;
        letterModalwrap.querySelector(".letter-modal-container").style.animation = "popUp 0.5s";
        letterModalwrap.style.display = "block";
    });
});

// 상세보기 모달 닫기 클릭 시 모달을 끄는 이벤트
const letterModalCloseBtn = document.querySelector(".letter-modal-wrap .close-btn");

letterModalCloseBtn.addEventListener("click", () => {
    letterModalwrap.querySelector(".letter-modal-container").style.animation = "popDown 0.5s";
    setTimeout(() => {
        letterModalwrap.style.display = "none";
    }, 450);
});

// 작성하기 클릭 시 작성 모달 여는 이벤트
const sendModalWrap = document.querySelector(".send-modal-wrap");
const sendLetterBtn = document.querySelector(".send-letter-btn");

sendLetterBtn.addEventListener("click", () => {
    sendModalWrap.querySelector(".send-modal-container").style.animation = "popUp 0.5s";
    sendModalWrap.style.display = "block";
});

// 받는 사람과 내용 value 상태에 따라 활성화/비활성화
const sendReceiverEmail = sendModalWrap.querySelector(".send-receiver-email");
const textarea = sendModalWrap.querySelector("textarea[name=send-content]");
const sendCheckBtn = sendModalWrap.querySelector(".send-check-btn");

const countValue = () => {
    if (sendReceiverEmail.value && textarea.value) {
        sendCheckBtn.disabled = false;
    } else {
        sendCheckBtn.disabled = true;
    }
};

countValue();

sendReceiverEmail.addEventListener("input", () => {
    countValue();
});

textarea.addEventListener("input", () => {
    countValue();
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
                sendReceiverEmail.value = ``;
                textarea.value = ``;
                countValue();
            }, 450);
        } else {
            sendModalWrap.querySelector(".send-modal-container").style.animation = "popDown 0.5s";
            setTimeout(() => {
                sendModalWrap.style.display = "none";
                sendReceiverEmail.value = ``;
                textarea.value = ``;
                countValue();
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
