

const signalDeletes = document.querySelectorAll(".signal-delete");
const signalDeleteModal = document.querySelector(".signal-delete-modal");
const signalDeleteBox = document.querySelector(".signal-delete-box");
let signalTarget;
const tbody = document.querySelector("#inner")
const moreButton = document.getElementById("more-button")
page = 1
const canButton = document.getElementById("delete-cancle-btn")

canButton.addEventListener("click", (e)=>{
    signalDeleteModal.style.display = "none"
})


alramService.getList(member_id, page + 1).then((alram) => {
    if (alram.length !== 0){
        moreButton.style.display = "flex";
    }
});

alramService.getList(member_id, page + 1).then((alram) => {
    if (alram.length === 0){
        moreButton.style.display = "none";
    }
});


moreButton.addEventListener("click", (e) => {
    alramService.getList(member_id, ++page, showList).then((text) => {
        tbody.innerHTML += text;
    });

    alramService.getList(member_id, page + 1).then((alram) => {
    if (alram.length === 0){
        moreButton.style.display = "none";
    }
});

});





const showList = async (alram) => {
    let text = '';
    if (alram.length ===0){
            text +=
            `<div class="signal-none">아직 새로운 알림이 없습니다.</div>`
        }
    else{
        alram.forEach((alram) =>  {
            if(alram.alarm_type ===1){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">모임</div>
                            <div class="target-title">당신이 작성한 모임홍보글에 댓글이 작성되었어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">댓글을 확인하주세요!.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 2){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">활동</div>
                            <div class="target-title">당신이 작성한 활동글에 댓글이 작성되었어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">댓글을 확인해주세요!</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 3){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">위시리스트</div>
                            <div class="target-title">당신이 작성한 위시리스트에 댓글이 작성되었어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">댓글을 확인해주세요!.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 4){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">쪽지</div>
                            <div class="target-title">당신에게 쪽지가 도착하였어요!!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">쪽지를 확인해주세요!.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 5){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">틴친</div>
                            <div class="target-title">당신이 틴친을 신청한 사람이 있어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">틴친 신청내역을 확인해주세요!.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 6){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">활동</div>
                            <div class="target-title">당신이 가입한 모임에 활동이 개설되었어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">활동을 확인해주세요!.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 7){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">모임</div>
                            <div class="target-title">당신이 가입된 모임에 공지사항이 작성되었어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">공지사항을 확인해주세요.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 8){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">모임</div>
                            <div class="target-title">당신이 가입된 모임에 틴플레이가 작성되었어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">틴플레이를 확인해주세요!.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 9){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">모임</div>
                            <div class="target-title">당신이 신청한 모임에서 소식이 왔어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">모임 가입이 신청되었습니다!.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 10){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">모임</div>
                            <div class="target-title">당신이 신청한 모임에서 소식이 왔어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">모임에서 탈퇴되였습니다!.</div>
                </div>
            </div>
`}
            if(alram.alarm_type === 11){
            text += `
             <div class="signal-container">
                <div class="signal-box">
                    <div class="signal-top-box">
                        <div class="type-title">
                            <div class="signal-type">활동</div>
                            <div class="target-title">당신이 신청한 모임에서 소식이 왔어요!</div>
                        </div>
                        <div class="check-date">
                            <div class="signal-delete ${alram.id}">삭제</div>
                            <div class="signal-date">${changeDate(alram.created_date)}</div>
                        </div>
                    </div>
                    <div class="signal-bottom-text">활동 신청이 접수 되었습니다.</div>
                </div>
            </div>
`}

    });}

    return text;

};

const deleteButton = document.getElementById('delete-check-btn')
tbody.addEventListener("click", async (e) =>{
    if (e.target.classList[0] === 'signal-delete'){
        const data = e.target.classList[1];
        signalDeleteModal.style.display = "block"
        console.log(data)
        deleteButton.addEventListener("click", async(e)=>{
            await alramService.remove(data)
            page = 1
            const text = await alramService.getList(member_id, page, showList);
            tbody.innerHTML = text;
            signalDeleteModal.style.display = "none"
        } )


    }
})







alramService.getList(member_id, page, showList).then((text) => {
    tbody.innerHTML += text;
});


alramService.getList(member_id, page, showList);

const changeDate = (dateStr) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateStr); // string타입을 date타입으로 바꿈.
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함.
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()]; // 요일을 숫자로 가져와 해당 요일 문자열로 변환

    // padStart는 ,앞의 숫자의 자릿수 만큼 0을 채워줌
    return `${month.toString().padStart(2, '0')}월 ${day.toString().padStart(2, '0')}일(${dayOfWeek})`;
}
