// 게시글 추가하기
// 작성하기 버튼
const topCreateButton = document.querySelector(".main-festival-add-top-create-button")
const noticeCreateFrom =document.querySelector('form[name=notice-create-form]')

topCreateButton.addEventListener("click", () => {
    noticeCreateFrom.submit()
})




// // 공지사항 제목
// const noticeTitleInput = document.querySelector(".main-festival-info-detail-input")
// // 공지사항 내용
// const noticeContentTextarea = document.querySelector(".main-festival-info-detail-textarea")
// // 타입 버튼
// const radioButtons = document.querySelectorAll("input[name='selection']");


// topCreateButton.addEventListener("click", async (e) => {
//     for (const radioButton of radioButtons) {
//         let notice_type;
//
//         if (radioButton.value === '0') {
//             console.log(radioButton.value)
//             notice_type = radioButton.value
//         } else if (radioButton.value === '1') {
//             notice_type = radioButton.value
//         }
//
//         await adminNoticeService.write({
//             notice_title: noticeTitleInput.value,
//             notice_content: noticeContentTextarea.value,
//             notice_type: notice_type
//         })
//     }
//     // 작성 완료 후 입력창 초기화
//     noticeTitleInput.values = "";
//     noticeContentTextarea.values = "";
// })