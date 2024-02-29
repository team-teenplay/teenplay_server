const signalDeletes = document.querySelectorAll(".signal-delete");
const signalDeleteModal = document.querySelector(".signal-delete-modal");
const signalDeleteBox = document.querySelector(".signal-delete-box");
let signalTarget;

signalDeletes.forEach((signalDelete) => {
    signalDelete.addEventListener("click", (e) => {
        signalTarget = e.target.closest(".signal-container");
        signalDeleteBox.style.animation = "popUp 0.5s";
        signalDeleteModal.style.display = "block";
    });
});

const signalModalBtns = document.querySelectorAll(".signal-delete-btns button[type=button]");

signalModalBtns.forEach((signalModalBtn) => {
    signalModalBtn.addEventListener("click", (e) => {
        signalDeleteBox.style.animation = "popDown 0.5s";
        if (e.target.className == "delete-check-btn") {
            setTimeout(() => {
                signalDeleteModal.style.display = "none";
                signalTarget.remove();
            }, 450);
            return;
        }
        setTimeout(() => {
            signalDeleteModal.style.display = "none";
        }, 450);
    });
});
