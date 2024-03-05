const statusName = document.querySelector(".main-user-status-name");
const checkBox = document.querySelectorAll(".main-comment-list-checkbox")
const totalCount = document.getElementById("total-count")

function checkBoxCount() {
    // 체크박스 체크 시 전체 숫자 up
    let checkedCount = 0;

    checkBox.forEach((check) => {
        if (check.checked) {
            checkedCount++;
        }
    });

    totalCount.textContent = checkedCount;
}

checkBox.forEach((check) => {
    check.addEventListener('change', checkBoxCount)
});

statusName.addEventListener("click", () => {
    checkBox.forEach((checkbox) => {
        let allChecked = true;

        if (!checkbox.checked) {
            allChecked = false;
            checkbox.checked = true;

        } else {
            checkbox.checked = false;
        }

    });
    checkBoxCount();
});
