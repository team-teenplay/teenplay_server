// 헤더 사람 아이콘 클릭 시 마이페이지 간이 목록 표시 및 제거
const menuModalContainer = document.querySelector(".menu-modal-container");

document.addEventListener("click", (e) => {
    if (!e.target.closest(".mypage-menu-container")) {
        menuModalContainer.classList.remove("display:block");
    } else {
        if (e.target.closest(".menu-btn-box")) {
            menuModalContainer.classList.toggle("display:block");
        }
    }
});

// // 동의 체크박스 클릭 시 상태에 따라 경고 메시지 표시하는 이벤트
// const inputCheckBox = document.querySelector("input[type=checkbox]");
// const errorBoxs = document.querySelectorAll(".error-box");
// const select = document.querySelector(".select");

// inputCheckBox.addEventListener("change", (e) => {
//     if (!e.target.checked) {
//         errorBoxs[0].innerHTML = `<div id="agree-check-error" class="error">동의에 체크해주세요</div>`;
//     } else {
//         errorBoxs[0].innerHTML = "";
//     }
// });

// select.addEventListener("change", (e) => {
//     errorBoxs[1].innerHTML = "";
// });

// //
// const withdrawalBtn = document.querySelector(".withdrawal-btn");

// withdrawalBtn.addEventListener("click", () => {
//     if (!inputCheckBox.checked) {
//         errorBoxs[0].innerHTML = `<div id="agree-check-error" class="error">동의에 체크해주세요</div>`;
//     }
//     console.log(select.value);
//     if (!select.value) {
//         errorBoxs[1].innerHTML = `<div id="agree-check-error" class="error">동의에 체크해주세요</div>`;
//     }
// });
