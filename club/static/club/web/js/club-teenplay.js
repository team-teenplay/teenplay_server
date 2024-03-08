const teenplayTabButton = document.querySelector('.club-detail-filter-teenplay>.club-detail-filter-button')
const teenplayViewList = document.querySelector('.club-teenplay-wrap')
const teenplayNoneView = document.querySelector(".club-teenplay-empty-wrap")
const teenplayMoreButtonWrap = document.querySelector('.tp-show-more-btn-wrap')


teenplayTabButton.addEventListener('click', async (e)=> {
    clubId = club_list[0]['id']
    if (teenplayInfo.teenplay_list.length == 0){
        console.log(1)
        teenplayNoneView.style.display = 'flex'
        }
    else if (teenplayInfo.teenplay_list.length < 5){
        teenplayViewList.style.display = 'flex'

    }else {
        teenplayViewList.style.display = 'flex'
        teenplayMoreButtonWrap.style.display = 'flex'

    }
})



const noneText = `
<div class="club-teenplay-empty-wrap">
    <div class="club-teenplay-empty-container">
        <div class="club-teenplay-empty">업로드한 틴플레이가 없습니다.</div>
    </div>
</div>
`





let text = ``
teenplayInfo.forEach((teenplayInfo)=> {
    text += `
        <div class="club-teenplay-contents">
            <a href="" class="club-teenplay-thumbnail-wrap">
                <img src="/staticfiles/images/club/club-detail/club-shorts-thumbnail5.png" class="club-teenplay-thumbnail" />
            </a>
            <div class="club-teenplay-details">
                <h3 class="club-teenplay-title-wrap">
                    <a href="" class="club-teenplay-title-link">
                        <span class="club-teenplay-title">먹방이란 이런 것이다.mukbang (바닷물 색 실화?)</span>
                    </a>
                </h3>
                <div class="club-teenplay-views-wrap">
                    <div class="club-teenplay-views-container">
                        <?xml version="1.0" ?><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                        <svg width="15px" height="15px" fill="currentColor" id="Layer_1" style="enable-background: new 0 0 64 64" version="1.1" viewBox="0 0 64 64" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g>
                                <g id="Icon-Heart" transform="translate(178.000000, 230.000000)">
                                    <path class="st0" d="M-146-177.1l-0.8-0.7c-18.2-14.8-23.1-20-23.1-28.5c0-7,5.7-12.6,12.6-12.6     c5.8,0,9.1,3.3,11.3,5.8c2.2-2.5,5.5-5.8,11.3-5.8c7,0,12.6,5.7,12.6,12.6c0,8.5-4.9,13.7-23.1,28.5L-146-177.1L-146-177.1z      M-157.3-216.3c-5.5,0-10,4.5-10,10c0,7.3,4.6,12.1,21.3,25.8c16.7-13.7,21.3-18.5,21.3-25.8c0-5.5-4.5-10-10-10     c-5,0-7.7,3-9.8,5.4l-1.5,1.7l-1.5-1.7C-149.6-213.3-152.3-216.3-157.3-216.3L-157.3-216.3z" id="Fill-18" />
                                </g>
                            </g>
                        </svg>
                        <span class="club-teenplay-views">2,024</span>
                    </div>
                    <div class="club-teenplay-date-container">1일 전</div>
                </div>
            </div>
            <div class="club-teenplay-delete-wrap">
                <img src="/staticfiles/images/club/club-create/cover_delete_icon_white.png" class="club-teenplay-delete" />
                <img src="/staticfiles/images/club/club-detail/teenplay_delete_icon_hover.png" class="club-teenplay-delete-hover" />
            </div>
        </div>`
});
