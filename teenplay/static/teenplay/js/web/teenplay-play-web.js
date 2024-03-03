NodeList.prototype.filter = Array.prototype.filter;

let pauseIcons = document.querySelectorAll(".pause");
let playIcons = document.querySelectorAll(".restart");
let videos = document.querySelectorAll(".play-video");
let videoInfos = document.querySelectorAll(".play-info-wrap");
let controlButtons = document.querySelectorAll(".play-control-wrap");
let progressBars = document.querySelectorAll(".progress-bar-now");
let muteIcons = document.querySelectorAll(".mute");
let unmuteIcons = document.querySelectorAll(".unmute");
let videoWraps = document.querySelectorAll(".play-each");
let nowPlaying = document.querySelector(".play-each.playing"); // 얘만 let
let slideWrap = document.querySelector(".play-items");
let slideContainer = document.querySelector(".play-item");
let likeBtns = document.querySelectorAll(".play-like-btn");
let emptyHeart = document.querySelectorAll(".play-like-icon.empty");
let fullHeart = document.querySelectorAll(".play-like-icon.full");


// 구글 개인정보 소리 설정 해제 후 동영상 최초 재생 확인
videos[0].play();


// 재생 중이 아닌 영상은 일시정지로 시작
videoWraps.forEach((videoWrap, i) => {
    if (!videoWrap.classList.contains("playing")) {
        videos[i].autoplay = false;
    } else {
        videos[i].autoplay = true;
    }
});

// 일시정지, 재생 관련 버튼
// false일 때 클릭 시 재생, true일 때 클릭 시 일시정지
globalThis.flags = new Array(videos.length);

videos.forEach((video, i) => {
    video.addEventListener("click", (e) => {
        if (!globalThis.flags[i]) {
            globalThis.flags[i] = true;
            pauseIcons[i].style.display = "none";
            playIcons[i].style.display = "block";
            e.target.pause();
        } else {
            globalThis.flags[i] = false;
            pauseIcons[i].style.display = "block";
            playIcons[i].style.display = "none";
            e.target.play();
        }
    });
});

// 음소거 관련 버튼
muteIcons.forEach((mute) => {
    mute.addEventListener("click", () => {
        muteIcons.forEach((mute) => {
            mute.style.display = "none";
        });
        videos.forEach((video) => {
            video.muted = true;
        });
        unmuteIcons.forEach((unmute) => {
            unmute.style.display = "block";
        });
    });
});

unmuteIcons.forEach((unmute) => {
    unmute.addEventListener("click", (e) => {
        unmuteIcons.forEach((unmute) => {
            unmute.style.display = "none";
        });
        videos.forEach((video) => {
            video.muted = false;
        });
        muteIcons.forEach((mute) => {
            mute.style.display = "block";
        });
    });
});

// 진행도 1초마다 증가
videos.forEach((video, i) => {
    video.addEventListener("timeupdate", (e) => {
        let percent = (e.target.currentTime / e.target.duration) * 100;
        progressBars[i].style.width = `${percent}%`;
    });
});

// 스크롤로 이전/다음 틴플레이 이동

function slideNext(idx) {
    slideContainer.style.transition = `all 0.5s ease-in`;
    // slideContainer.style.transform = `translateY(-${window.innerHeight * idx}px)`;
    slideContainer.style.transform = `translateY(-${674* idx}px)`;
    videoWraps[idx - 1].classList.remove("playing");
    videoWraps[idx].classList.add("playing");
}

function slidePrev(idx) {
    slideContainer.style.transition = `all 0.5s ease-in`;
    slideContainer.style.transform = `translateY(-${window.innerHeight * idx}px)`;
    videoWraps[idx + 1].classList.remove("playing");
    videoWraps[idx].classList.add("playing");
}

function manageScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return;
}

let idx = 0;
let check = true;
let isFetchingTeenplay = false;
slideWrap.addEventListener("wheel", (e) => {
    manageScroll(e);
    if (!check) return;
    check = false;
    for (let i = 0; i < videoWraps.length; i++) {
        if (videoWraps[i].classList.contains("playing")) {
            idx = i;
            break;
        }
    }
    if (e.deltaY > 0) {
        setTimeout(() => {
            check = true;
        }, 800);
        if (idx == videoWraps.length - 1) {
            return;
        }
        slideNext(idx + 1);
        videos[idx].pause();
        globalThis.flags[idx] = true;
        pauseIcons[idx].style.display = "none";
        playIcons[idx].style.display = "block";
        idx++;
        videos[idx].play();
        globalThis.flags[idx] = false;
        pauseIcons[idx].style.display = "block";
        playIcons[idx].style.display = "none";
        console.log("down2", idx, videoWraps.length)

    } else {
        setTimeout(() => {
            check = true;
        }, 800);
        if (idx == 0) {
            return;
        }
        slidePrev(idx - 1);
        videos[idx].pause();
        globalThis.flags[idx] = true;
        pauseIcons[idx].style.display = "none";
        playIcons[idx].style.display = "block";
        idx--;
        videos[idx].play();
        globalThis.flags[idx] = false;
        pauseIcons[idx].style.display = "block";
        playIcons[idx].style.display = "none";
        console.log("up2", idx, videoWraps.length)
    }
    if (idx === videoWraps.length-1 && !isFetchingTeenplay && idx===4){
        setTimeout( () => {
            isFetchingTeenplay = true;
            getTeenplay(showTeenplay)
        },500)
    }
});

// 좋아요 아이콘 클릭 시 반영
likeBtns.forEach((button, i) => {
    button.addEventListener("click", () => {
        if (emptyHeart[i].style.display == "none") {
            emptyHeart[i].style.display = "block";
            fullHeart[i].style.display = "none";
        } else {
            emptyHeart[i].style.display = "none";
            fullHeart[i].style.display = "block";
        }
    });
});

// 좋아요 수 증가는 비동기로 좋아요 db에 반영 후 가져와 넣기 때문에
// 현재 화면에서는 구현하지 않습니다.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 화면 데이터를 가져오는 것을 fetch 를 이용해서 값을 가져온다.

const getTeenplay = async (callback) => {
    const response = await fetch(`new/`)
    const teenplay = await response.json();
    if (callback){
        callback(teenplay)
    }
}

const showTeenplay = (teenplay) => {
    const playWrap = document.querySelector(".play-item")

    playWrap.innerHTML += `  
    <!-- 다음 대기열 -->
    <div class="play-each">
        <section class="play-each-wrap">
            <div class="play-each-container">
                <div class="video-wrap">
                    <!-- 비디오 -->
                    <video class="play-video" preload loop="" autoplay="">
                        <source src="/upload/teenplay_video/2024/03/02/teenplay_example_1.MOV" type="video/ogg" />
                    </video>
                </div>
            </div>
            <!-- 틴플레이 정보 -->
            <div class="play-info-wrap">
                <div class="play-info-container">
                    <!-- 작성자(모임) 정보 -->
                    <div class="play-writer-wrap">
                        <a href="" class="play-writer-image-wrap">
                            <div class="play-writer-image-container">
                                <!-- 모임 프사 -->
<!--                                <img src="{% static 'teenplay/image/teenplay_example_1_profile.jpg' %}" class="play-writer-image" />-->
                                <img src="/teenplay/static/teenplay/image/teenplay_example_1_profile.jpg" class="play-writer-image" />
                            </div>
                        </a>
                        <div class="play-writer-container">
                            <div class="play-writer-boxes">
                                <div class="play-writer-box">
                                    <!-- 모임 이름 -->
                                    <a href="" class="play-writer-name">teen</a>
                                </div>
                            </div>
                        </div>
                        <div class="play-like-info-wrap">
                            <div class="play-like-wrap">
                                <button class="play-like-btn">
                                    <svg data-v-e13ecf0e="" xmlns="http://www.w3.org/2000/svg" class="play-like-icon empty" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path data-v-e13ecf0e="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    <svg data-v-e13ecf0e="" xmlns="http://www.w3.org/2000/svg" class="play-like-icon full" viewBox="0 0 20 20" fill="currentColor">
                                        <path data-v-e13ecf0e="" fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="play-like-count">1.3천</div>
                        </div>
                    </div>
                    <!-- 제목(내용) -->
                    <h2 class="play-info-title-wrap">
                        <div class="play-info-title-container">
                            <span class="play-info-title">틴친들과 함께한 일본여행 VLOG😘</span>
                        </div>
                    </h2>
                </div>
            </div>
        </section>
        <!-- 재생, 음소거 버튼 -->
        <div class="play-control-wrap">
            <div class="play-control-container">
                <div class="play-btn-wrap">
                    <button class="play-btn">
                        <div class="play-btn-icon-wrap">
                            <div class="play-btn-icon-container">
                                <div class="play-btn-icon-boxes pause">
                                    <!-- 일시정지 버튼 -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
                                </div>
                                <div class="play-btn-icon-boxes restart">
                                    <!-- 재생 버튼 -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M8 5v14l11-7z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                <div class="play-btn-wrap">
                    <button class="play-btn">
                        <div class="play-btn-icon-wrap">
                            <div class="play-btn-icon-container">
                                <div class="play-btn-icon-boxes mute">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                                </div>
                                <div class="play-btn-icon-boxes unmute">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%">
                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <!-- progress bar -->
        <div class="play-progress-bar-wrap">
            <div class="play-progress-bar-container">
                <div class="progress-bar-background"></div>
                <div class="progress-bar-now"></div>
            </div>
        </div>
    </div>
    <div class="play-each">
        <section class="play-each-wrap">
            <div class="play-each-container">
                <div class="video-wrap">
                    <!-- 비디오 -->
                    <video class="play-video" preload loop="" autoplay="">
                        <source src="/upload/teenplay_video/2024/03/02/teenplay_example_1.MOV" type="video/ogg" />
                    </video>
                </div>
            </div>
            <!-- 틴플레이 정보 -->
            <div class="play-info-wrap">
                <div class="play-info-container">
                    <!-- 작성자(모임) 정보 -->
                    <div class="play-writer-wrap">
                        <a href="" class="play-writer-image-wrap">
                            <div class="play-writer-image-container">
                                <!-- 모임 프사 -->
<!--                                <img src="{% static 'teenplay/image/teenplay_example_1_profile.jpg' %}" class="play-writer-image" />-->
                                <img src="/teenplay/static/teenplay/image/teenplay_example_1_profile.jpg" class="play-writer-image" />
                            </div>
                        </a>
                        <div class="play-writer-container">
                            <div class="play-writer-boxes">
                                <div class="play-writer-box">
                                    <!-- 모임 이름 -->
                                    <a href="" class="play-writer-name">teen</a>
                                </div>
                            </div>
                        </div>
                        <div class="play-like-info-wrap">
                            <div class="play-like-wrap">
                                <button class="play-like-btn">
                                    <svg data-v-e13ecf0e="" xmlns="http://www.w3.org/2000/svg" class="play-like-icon empty" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path data-v-e13ecf0e="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    <svg data-v-e13ecf0e="" xmlns="http://www.w3.org/2000/svg" class="play-like-icon full" viewBox="0 0 20 20" fill="currentColor">
                                        <path data-v-e13ecf0e="" fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="play-like-count">1.3천</div>
                        </div>
                    </div>
                    <!-- 제목(내용) -->
                    <h2 class="play-info-title-wrap">
                        <div class="play-info-title-container">
                            <span class="play-info-title">틴친들과 함께한 일본여행 VLOG😘</span>
                        </div>
                    </h2>
                </div>
            </div>
        </section>
        <!-- 재생, 음소거 버튼 -->
        <div class="play-control-wrap">
            <div class="play-control-container">
                <div class="play-btn-wrap">
                    <button class="play-btn">
                        <div class="play-btn-icon-wrap">
                            <div class="play-btn-icon-container">
                                <div class="play-btn-icon-boxes pause">
                                    <!-- 일시정지 버튼 -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
                                </div>
                                <div class="play-btn-icon-boxes restart">
                                    <!-- 재생 버튼 -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M8 5v14l11-7z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                <div class="play-btn-wrap">
                    <button class="play-btn">
                        <div class="play-btn-icon-wrap">
                            <div class="play-btn-icon-container">
                                <div class="play-btn-icon-boxes mute">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                                </div>
                                <div class="play-btn-icon-boxes unmute">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%">
                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <!-- progress bar -->
        <div class="play-progress-bar-wrap">
            <div class="play-progress-bar-container">
                <div class="progress-bar-background"></div>
                <div class="progress-bar-now"></div>
            </div>
        </div>
    </div>
    <div class="play-each">
        <section class="play-each-wrap">
            <div class="play-each-container">
                <div class="video-wrap">
                    <!-- 비디오 -->
                    <video class="play-video" preload loop="" autoplay="">
                        <source src="/upload/teenplay_video/2024/03/02/teenplay_example_1.MOV" type="video/ogg" />
                    </video>
                </div>
            </div>
            <!-- 틴플레이 정보 -->
            <div class="play-info-wrap">
                <div class="play-info-container">
                    <!-- 작성자(모임) 정보 -->
                    <div class="play-writer-wrap">
                        <a href="" class="play-writer-image-wrap">
                            <div class="play-writer-image-container">
                                <!-- 모임 프사 -->
<!--                                <img src="{% static 'teenplay/image/teenplay_example_1_profile.jpg' %}" class="play-writer-image" />-->
                                <img src="/teenplay/static/teenplay/image/teenplay_example_1_profile.jpg" class="play-writer-image" />
                            </div>
                        </a>
                        <div class="play-writer-container">
                            <div class="play-writer-boxes">
                                <div class="play-writer-box">
                                    <!-- 모임 이름 -->
                                    <a href="" class="play-writer-name">teen</a>
                                </div>
                            </div>
                        </div>
                        <div class="play-like-info-wrap">
                            <div class="play-like-wrap">
                                <button class="play-like-btn">
                                    <svg data-v-e13ecf0e="" xmlns="http://www.w3.org/2000/svg" class="play-like-icon empty" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path data-v-e13ecf0e="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    <svg data-v-e13ecf0e="" xmlns="http://www.w3.org/2000/svg" class="play-like-icon full" viewBox="0 0 20 20" fill="currentColor">
                                        <path data-v-e13ecf0e="" fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="play-like-count">1.3천</div>
                        </div>
                    </div>
                    <!-- 제목(내용) -->
                    <h2 class="play-info-title-wrap">
                        <div class="play-info-title-container">
                            <span class="play-info-title">틴친들과 함께한 일본여행 VLOG😘</span>
                        </div>
                    </h2>
                </div>
            </div>
        </section>
        <!-- 재생, 음소거 버튼 -->
        <div class="play-control-wrap">
            <div class="play-control-container">
                <div class="play-btn-wrap">
                    <button class="play-btn">
                        <div class="play-btn-icon-wrap">
                            <div class="play-btn-icon-container">
                                <div class="play-btn-icon-boxes pause">
                                    <!-- 일시정지 버튼 -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
                                </div>
                                <div class="play-btn-icon-boxes restart">
                                    <!-- 재생 버튼 -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M8 5v14l11-7z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                <div class="play-btn-wrap">
                    <button class="play-btn">
                        <div class="play-btn-icon-wrap">
                            <div class="play-btn-icon-container">
                                <div class="play-btn-icon-boxes mute">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                                </div>
                                <div class="play-btn-icon-boxes unmute">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%">
                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <!-- progress bar -->
        <div class="play-progress-bar-wrap">
            <div class="play-progress-bar-container">
                <div class="progress-bar-background"></div>
                <div class="progress-bar-now"></div>
            </div>
        </div>
    </div>
    `
///////////////////////////////////////////////////////////////////////////////////////////////
    let pauseIcons = document.querySelectorAll(".pause");
    let playIcons = document.querySelectorAll(".restart");
    let videos = document.querySelectorAll(".play-video");
    let videoInfos = document.querySelectorAll(".play-info-wrap");
    let controlButtons = document.querySelectorAll(".play-control-wrap");
    let progressBars = document.querySelectorAll(".progress-bar-now");
    let muteIcons = document.querySelectorAll(".mute");
    let unmuteIcons = document.querySelectorAll(".unmute");
    let videoWraps = document.querySelectorAll(".play-each");
    let nowPlaying = document.querySelector(".play-each.playing"); // 얘만 let
    let slideWrap = document.querySelector(".play-items");
    let slideContainer = document.querySelector(".play-item");
    let likeBtns = document.querySelectorAll(".play-like-btn");
    let emptyHeart = document.querySelectorAll(".play-like-icon.empty");
    let fullHeart = document.querySelectorAll(".play-like-icon.full");


    videoWraps.forEach((videoWrap, i) => {
        if (!videoWrap.classList.contains("playing")) {
            videos[i].autoplay = false;
        } else {
            videos[i].autoplay = true;
        }
    });

    globalThis.flags = new Array(videos.length);

    videos.forEach((video, i) => {
        video.addEventListener("click", (e) => {
            if (!globalThis.flags[i]) {
                globalThis.flags[i] = true;
                pauseIcons[i].style.display = "none";
                playIcons[i].style.display = "block";
                e.target.pause();
            } else {
                globalThis.flags[i] = false;
                pauseIcons[i].style.display = "block";
                playIcons[i].style.display = "none";
                e.target.play();
            }
        });
    });

    muteIcons.forEach((mute) => {
        mute.addEventListener("click", () => {
            muteIcons.forEach((mute) => {
                mute.style.display = "none";
            });
            videos.forEach((video) => {
                video.muted = true;
            });
            unmuteIcons.forEach((unmute) => {
                unmute.style.display = "block";
            });
        });
    });

    unmuteIcons.forEach((unmute) => {
        unmute.addEventListener("click", (e) => {
            unmuteIcons.forEach((unmute) => {
                unmute.style.display = "none";
            });
            videos.forEach((video) => {
                video.muted = false;
            });
            muteIcons.forEach((mute) => {
                mute.style.display = "block";
            });
        });
    });

    videos.forEach((video, i) => {
        video.addEventListener("timeupdate", (e) => {
            let percent = (e.target.currentTime / e.target.duration) * 100;
            progressBars[i].style.width = `${percent}%`;
        });
    });

    function slideNext(idx) {
        slideContainer.style.transition = `all 0.5s ease-in`;
        slideContainer.style.transform = `translateY(-${window.innerHeight * idx}px)`;
        videoWraps[idx - 1].classList.remove("playing");
        videoWraps[idx].classList.add("playing");
    }

    function slidePrev(idx) {
        slideContainer.style.transition = `all 0.5s ease-in`;
        slideContainer.style.transform = `translateY(-${window.innerHeight * idx}px)`;
        videoWraps[idx + 1].classList.remove("playing");
        videoWraps[idx].classList.add("playing");
    }

    function manageScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }

    let idx = 0;
    let check = true;
    let isFetchingTeenplayAnother = false;

    slideWrap.addEventListener("wheel", (e) => {
        manageScroll(e);
        if (!check) return;
        check = false;

        for (let i = 0; i < videoWraps.length; i++) {
            if (videoWraps[i].classList.contains("playing")) {
                idx = i;
                break;
            }
        }
        if (e.deltaY > 0) {
            setTimeout(() => {
                check = true;
            }, 800);
            if (idx == videoWraps.length - 1) {
                return;
            }
            slideNext(idx + 1);
            videos[idx].pause();
            globalThis.flags[idx] = true;
            pauseIcons[idx].style.display = "none";
            playIcons[idx].style.display = "block";
            idx++;
            videos[idx].play();
            globalThis.flags[idx] = false;
            pauseIcons[idx].style.display = "block";
            playIcons[idx].style.display = "none";
            console.log("down", idx, videoWraps.length)

        } else {
            setTimeout(() => {
                check = true;
            }, 800);
            if (idx == 0) {
                return;
            }
            slidePrev(idx - 1);
            videos[idx].pause();
            globalThis.flags[idx] = true;
            pauseIcons[idx].style.display = "none";
            playIcons[idx].style.display = "block";
            idx--;
            videos[idx].play();
            globalThis.flags[idx] = false;
            pauseIcons[idx].style.display = "block";
            playIcons[idx].style.display = "none";
            console.log('up', idx, videoWraps.length)
        }


        if (idx == videoWraps.length-1 && !isFetchingTeenplayAnother) {
            isFetchingTeenplayAnother = true;
            // 해당 부분 호출 시 item height 의 max 를 늘려줘야 함
            let currentHeight = parseInt(window.getComputedStyle(slideContainer).height);
            // 현재 뷰포트의 높이를 가져오기
            let viewportHeight = window.innerHeight;
            // 기존 높이에 674px를 더한 후 이를 vh 단위로 변환
            let newHeightInVh = ((currentHeight + 674 * 3) / viewportHeight) * 100;
            // 새로운 높이를 설정
            slideContainer.style.height = newHeightInVh + "vh";

            setTimeout(() => {
                console.log(idx, videoWraps.length)
                isFetchingTeenplayAnother = false;
                getTeenplay(showTeenplay)
                console.log("우웨웨웨웨웩!!!!")
            }, 500)
        }
    });

    likeBtns.forEach((button, i) => {
        button.addEventListener("click", () => {
            if (emptyHeart[i].style.display == "none") {
                emptyHeart[i].style.display = "block";
                fullHeart[i].style.display = "none";
            } else {
                emptyHeart[i].style.display = "none";
                fullHeart[i].style.display = "block";
            }
        });
    });

}


