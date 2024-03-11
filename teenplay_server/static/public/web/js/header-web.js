
const checkBtn = document.querySelector(".check-btn");



const mypageServices = document.querySelector(".member-services");
const mypageMenu = document.querySelector(".mypage-menu");
const AllWhithoutClass = document.querySelectorAll("body :not(.member-services) :not(.mypage-menu)");

// 마이페이지 간이 목록 이외 클릭 시 none처리 이벤트
document.addEventListener("click", (e) => {
    if (!e.target.closest(".member-services")) {
        mypageMenu.classList.remove("display:flex");
    } else {
        console.log("else");
        if (e.target.closest(".member-service-menu-btn")) {
            mypageMenu.classList.toggle("display:flex");
        }
    }
});

// 헤더의 검색창 클릭 시 검색 모달창 block처리 이벤트
const searchModal = document.querySelector(".search-modal-container");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", () => {
    searchModal.style.display = "block";
});

// 검색창 클릭 시 검색 모달 block처리 이벤트
const backButton = document.querySelector(".back-btn");
const searchModalShadow = document.querySelector(".search-modal-shadow");

backButton.addEventListener("click", () => {
    searchModal.style.display = "none";
});

searchModalShadow.addEventListener("click", () => {
    searchModal.style.display = "none";
});

// 검색 입력 시 키워드에 해당하는 활동 및 모임 홍보 글 표기 이벤트
const searchInput = document.querySelector(".search-input");
const searchActivitySection = document.querySelector(".search-activity-section");
const searchClupSection = document.querySelector(".search-clup-section");
const serchIconBtn = document.querySelector(".serch-icon-btn");

searchInput.addEventListener("input", (e) => {
    if (e.target.value) {
        searchActivitySection.style.display = "block";
        searchClupSection.style.display = "block";
        return;
    }
    searchActivitySection.style.display = "none";
    searchClupSection.style.display = "none";
});

// 엔터키를 누를 경우 input의 value를 최근 검색기록 목록에 최신순으로 추가
const recentlyKeywordList = document.querySelector(".recently-keyword-list");

searchInput.addEventListener("keyup", (e) => {
    let text = ``;
    if (e.keyCode === 13) {
        if (!e.target.value) {
            return;
        }
        text += `<div class="recently-keyword-item">`;
        text += `<a class="search-keyword-link" href="">${e.target.value}</a>`;
        text += `<button class="cancle-btn" type="button">`;
        text += `<svg xmlns="http://www.w3.org/2000/svg" class="cancle-svg" viewBox="0 0 20 20" fill="currentColor">`;
        text += `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>`;
        text += `</svg>`;
        text += `</button>`;
        text += `</div>`;
        recentlyKeywordList.innerHTML = text + recentlyKeywordList.innerHTML;
        e.target.value = "";
        countKeyword();
        createEvent();
    }
});

// 최근 검색 기록 항목이 7개가 되면 7번째를 지우는 함수
const countKeyword = () => {
    const recentlyKeywordItem = document.querySelectorAll(".recently-keyword-item");

    if (recentlyKeywordItem.length > 6) {
        recentlyKeywordList.removeChild(recentlyKeywordItem[6]);
    }
};

// 검색어 삭제 버튼 클릭 시 해당 항목 삭제
const createEvent = () => {
    const cancleBtns = document.querySelectorAll(".cancle-btn");
    cancleBtns.forEach((cancleBtn) => {
        cancleBtn.addEventListener("click", (e) => {
            cancleBtn.parentElement.remove();
        });
    });
};

createEvent();

// 검색 기록 삭제 클릭 시 최근 검색어 목록 지우기
const deleteSearchLogBtn = document.querySelector(".delete-search-log-btn");

deleteSearchLogBtn.addEventListener("click", () => {
    recentlyKeywordList.innerHTML = "";
});

// 검색 모달 내 더보기 버튼 클릭 시 더보기 사라지고 리스트에 클레스로 준 속성 지우기
const recommendKeywordsMore = document.querySelector(".recommend-keywords-more");
const recommendKeywordsList = document.querySelector(".recommend-keywords-list");

recommendKeywordsMore.addEventListener("click", (e) => {
    recommendKeywordsList.className = "";
    recommendKeywordsMore.style.display = "none";
});

// 카테고리 불러오기


// 닉네임 길이에 따라 헤더 내 알림 개수 위치 변경하기
const memberNickname = document.querySelector("span.nicknaem").innerText;
const alarmCountWrap = document.querySelector(".signal-sign-item");
alarmCountWrap.style.left = `calc(100% - ${69 + (memberNickname.length - 2) * 6}px)`;


// 알람 개수 띄우기
const alarmCount1 = document.querySelector("div.signal-sign");
const alarmCount2 = document.querySelector(".mypage-menu-signal-count");
const memberId = document.querySelector("input[name=header-member-id]").value;

const getAlarmCount = async (memberId, callback) => {
    const response = await fetch(`/member/alarms/api?member-id=${memberId}`);
    const alarmCount = await response.json();
    if (callback) {
        callback(alarmCount);
    }
}

const showAlarmCount = (alarmCount) => {
    alarmCount1.innerText = alarmCount;
    alarmCount2.innerText = alarmCount;
}

getAlarmCount(memberId, showAlarmCount)

// 카테고리 띄우기
const headerCategoryWrap = document.querySelector(".category-group-items");

const getCategories = async (callback) => {
    const response = await fetch(`/activity/categories/api/`);
    const categories = await response.json();
    if (callback) {
        callback(categories);
    }
}

const showCategories = (categories) => {
    let text = ``;
    categories.forEach((category) => {
        text += `
            <div class="category-item">
                <a href="/activity/list?category-id=${category.id}" class="item-link" target="_blank">
                    <span>${category.category_name}</span>
                </a>
            </div>
        `;
    })
    headerCategoryWrap.innerHTML = text;
}

getCategories(showCategories);