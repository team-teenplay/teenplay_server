const button = document.querySelector(".main-login-button");
const id = document.querySelector(".main-login-id");
const pw = document.querySelector(".main-login-pw");
const modal = document.querySelector("#admin-message-modal");
const backmodal = document.querySelector("#admin-message-modal-backdrop");

const canclebutton = document.querySelector(".admin-message-modal-left-button");

button.addEventListener("click", () => {
    // 임시? 아이디비번
    if ((id.value === "teenple", pw.value === "1234")) {
        // 페이지 나오면 페이지이동 url
        window.location.href = "";
        return;
    }
    modal.classList.remove("hidden");
    backmodal.classList.remove("hidden");
});

canclebutton.addEventListener("click", () => {
    modal.classList.add("hidden");
    backmodal.classList.add("hidden");
});
