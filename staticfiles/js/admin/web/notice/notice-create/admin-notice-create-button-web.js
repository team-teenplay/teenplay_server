function updateButtonStatus() {
    let inputElements = document.querySelectorAll(
        ".main-festival-info-detail-textarea, .main-festival-info-detail-input"
    );
    let radioButtons = document.querySelectorAll("input[name='selection']");
    let buttonElement = document.querySelector(
        ".main-festival-add-top-create-button"
    );

    let isAnyInputEmpty = Array.from(inputElements).some(
        (input) => input.value.trim() === ""
    );

    let isAnyRadioButtonChecked = Array.from(radioButtons).some(
        (radio) => radio.checked
    );

    buttonElement.disabled = isAnyInputEmpty || !isAnyRadioButtonChecked;
    buttonElement.style.backgroundColor =
        isAnyInputEmpty || !isAnyRadioButtonChecked ? "#f3f3f4" : "#CE201B";
    buttonElement.style.cursor =
        isAnyInputEmpty || !isAnyRadioButtonChecked ? "default" : "pointer";
    buttonElement.style.color =
        isAnyInputEmpty || !isAnyRadioButtonChecked ? "#b9b9bb" : "#fff";
}

document.addEventListener("DOMContentLoaded", function () {
    // 페이지가 로드될 때 라디오 버튼과 라벨에 대한 이벤트 리스너를 추가합니다.
    let radioButtons = document.querySelectorAll("input[name='selection']");
    let labels = document.querySelectorAll(
        "label[for='radio-notice'], label[for='radio-qr']"
    );
    let boxes = document.querySelectorAll(".main-festival-box");

    radioButtons.forEach((radio) => {
        radio.addEventListener("change", updateButtonStatus);
    });

    labels.forEach((label) => {
        label.addEventListener("click", function () {
            let radioId = this.getAttribute("for");
            let radio = document.getElementById(radioId);
            if (radio) {
                radio.checked = true;
                updateButtonStatus();
            }
        });
    });

    boxes.forEach((box) => {
        box.addEventListener("click", function () {
            let radio = this.querySelector("input[name='selection']");
            if (radio) {
                radio.checked = true;
                updateButtonStatus();
            }
        });
    });

    // 입력 필드에 대한 이벤트 리스너를 추가합니다.
    let inputElements = document.querySelectorAll(
        ".main-festival-info-detail-textarea, .main-festival-info-detail-input"
    );
    inputElements.forEach((input) => {
        input.addEventListener("input", updateButtonStatus);
    });
});

function checkRadioAndStyle(clickedBox, id) {
    // 모든 박스의 스타일 초기화
    var boxes = document.querySelectorAll(".main-festival-box");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("selected-box");
    }

    // 클릭한 박스의 스타일 변경
    clickedBox.classList.add("selected-box");

    // 해당하는 라디오 버튼 선택
    document.getElementById(id).checked = true;
}
