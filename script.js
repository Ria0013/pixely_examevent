
// ========================================
// PIXELY - PIXELLI EXAM
// JS 1-1 : NAVIGATION / PARTICLES / VALIDATION
// ========================================


/* ========================================
   01. EXAM LINK SETTINGS
======================================== */

// 실제 카페 게시글 주소를 여기에 입력하면 돼.
// 주소를 입력하지 않은 항목은 이동하지 않아.

const EXAM_LINKS = {
  event: "https://forms.gle/n1HrJTY9mGbDxzjt6",
  rule: "",
  rader: "https://forms.gle/49ooyGvHofc5rqRC7",
  deokgae: "https://forms.gle/z77xHR1iPwCSzUMn6",
  gakbyeol: "https://forms.gle/PfbHFNKcvhS7mf9HA",
  gongryong: "https://forms.gle/fzU1LwnZCwMRpjVZ7",
  jamtteul: "",
  suhyeon: ""
};


/* ========================================
   02. SECTION NAVIGATION
======================================== */

function navigateToSection(sectionId) {
  const target = document.getElementById(sectionId);

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ========================================
   03. PIXEL PARTICLES
======================================== */

function createPixelParticles() {

  const container = document.getElementById("particleContainer");

  if (!container) return;

  container.innerHTML = "";

  const particleColors = [
    "#EF7278",
    "#F3A05D",
    "#E8C74D",
    "#70B982",
    "#71BBD8",
    "#9B82D0"
  ];

  const particleCount = window.innerWidth <= 650 ? 9 : 15;

  for (let i = 0; i < particleCount; i++) {

    const particle = document.createElement("span");

    particle.className = "pixel-particle";

    const color =
      particleColors[
        Math.floor(Math.random() * particleColors.length)
      ];

    const size = Math.random() * 5 + 3;

    const duration = Math.random() * 5 + 6;

    const delay = Math.random() * -10;

    particle.style.backgroundColor = color;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 96}%`;
    particle.style.top = `${Math.random() * 95}%`;

    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particle.style.opacity =
      (Math.random() * 0.2 + 0.12).toFixed(2);

    container.appendChild(particle);
  }
}


// 최초 실행
createPixelParticles();


// 화면 크기가 크게 바뀌면 파티클 재배치
let particleResizeTimer;

window.addEventListener("resize", () => {

  clearTimeout(particleResizeTimer);

  particleResizeTimer = setTimeout(() => {
    createPixelParticles();
  }, 250);

});


/* ========================================
   04. EXAM BUTTON LINKS
======================================== */

function setupExamLinks() {

  const linkSettings = [
    { selector: ".exam-event", key: "event" },
    { selector: ".exam-rule", key: "rule" },
    { selector: ".exam-rader", key: "rader" },
    { selector: ".exam-deokgae", key: "deokgae" },
    { selector: ".exam-gakbyeol", key: "gakbyeol" },
    { selector: ".exam-gongryong", key: "gongryong" },
    { selector: ".exam-jamtteul", key: "jamtteul" },
    { selector: ".exam-suhyeon", key: "suhyeon" }
  ];

  linkSettings.forEach(item => {

    const button = document.querySelector(item.selector);

    if (!button) return;

    const url = EXAM_LINKS[item.key];

    if (url && url.trim() !== "") {

      button.href = url;
      button.target = "_blank";
      button.rel = "noopener noreferrer";

    } else {

      button.href = "#";
      button.addEventListener("click", event => {
        event.preventDefault();
        alert("아직 연결된 게시글 주소가 없습니다!");
      });

    }

  });

}


// 링크 설정 적용
setupExamLinks();


/* ========================================
   05. FORM ELEMENTS
======================================== */

const ticketForm = document.getElementById("ticketForm");

const nicknameInput = document.getElementById("nickname");

const scoreFields = [
  {
    id: "score-event",
    result: "resultEvent",
    name: "이벤트 영역"
  },
  {
    id: "score-rule",
    result: "resultRule",
    name: "규정 영역"
  },
  {
    id: "score-rader",
    result: "resultRader",
    name: "라더 영역"
  },
  {
    id: "score-deokgae",
    result: "resultDeokgae",
    name: "덕개 영역"
  },
  {
    id: "score-gakbyeol",
    result: "resultGakbyeol",
    name: "각별 영역"
  },
  {
    id: "score-gongryong",
    result: "resultGongryong",
    name: "공룡 영역"
  },
  {
    id: "score-jamtteul",
    result: "resultJamtteul",
    name: "잠뜰 영역"
  },
  {
    id: "score-suhyeon",
    result: "resultSuhyeon",
    name: "수현 영역"
  }
];


/* ========================================
   06. SCORE INPUT RESTRICTIONS
======================================== */

scoreFields.forEach(field => {

  const input = document.getElementById(field.id);

  if (!input) return;

  // 숫자 입력창 설정
  input.setAttribute("inputmode", "numeric");
  input.setAttribute("step", "1");
  input.setAttribute("min", "0");

  // 음수, 소수점, 지수 입력 방지
  input.addEventListener("keydown", event => {

    const blockedKeys = [
      "-", "+", ".", "e", "E"
    ];

    if (blockedKeys.includes(event.key)) {
      event.preventDefault();
    }

  });

  // 붙여넣기 및 직접 입력값 검사
  input.addEventListener("input", () => {

    const cleaned = input.value.replace(/[^0-9]/g, "");

    if (input.value !== cleaned) {
      input.value = cleaned;
    }

  });

});


/* ========================================
   07. NICKNAME VALIDATION
======================================== */

if (nicknameInput) {

  nicknameInput.addEventListener("input", () => {

    nicknameInput.setCustomValidity("");

    if (nicknameInput.value.length > 20) {
      nicknameInput.value =
        nicknameInput.value.slice(0, 20);
    }

  });

}


/* ========================================
   08. FORM SUBMIT PREPARATION
======================================== */

// 실제 수험표 생성 기능은 JS 1-2에서 이어져.



// ========================================
// PIXELY - PIXELLI EXAM
// JS 1-2 : TICKET GENERATOR / IMAGE EXPORT
// ========================================


/* ========================================
   09. DATE FORMAT
======================================== */

function getCurrentDate() {

  const now = new Date();

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(now);

  const year = parts.find(p => p.type === "year").value;
  const month = parts.find(p => p.type === "month").value;
  const day = parts.find(p => p.type === "day").value;

  return `${year}. ${month}. ${day}.`;
}


/* ========================================
   10. TICKET GENERATION
======================================== */

function generateTicket() {

  const nickname = nicknameInput.value.trim();

  // 닉네임 확인
  if (!nickname) {

    alert("닉네임을 입력해 주세요!");

    nicknameInput.focus();

    return false;
  }

  // 닉네임 반영
  document.getElementById("resultNickname").textContent = nickname;


  // 점수 반영
  scoreFields.forEach(field => {

    const input = document.getElementById(field.id);

    const result = document.getElementById(field.result);

    if (!input || !result) return;

    const score = input.value.trim();

    result.textContent = score === ""
      ? "미응시"
      : `${score}점`;

  });


  // 발급 날짜 반영
  document.getElementById("resultDate").textContent =
    getCurrentDate();


  // 수험표 영역 표시
  const resultSection = document.getElementById("section-ticket-result");

  resultSection.hidden = false;


  // 결과 영역으로 이동
  setTimeout(() => {

    resultSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 100);

  return true;
}


/* ========================================
   11. FORM SUBMIT
======================================== */

if (ticketForm) {

  ticketForm.addEventListener("submit", event => {

    event.preventDefault();

    generateTicket();

  });

}


/* ========================================
   12. EDIT TICKET
======================================== */

const editButton = document.getElementById("editTicket");

if (editButton) {

  editButton.addEventListener("click", () => {

    const formSection =
      document.getElementById("section-ticket-form");

    formSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

}


/* ========================================
   13. IMAGE EXPORT LIBRARY
======================================== */

// html2canvas 라이브러리 불러오기
const captureScript = document.createElement("script");

captureScript.src =
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

captureScript.crossOrigin = "anonymous";

captureScript.onload = () => {
  console.log("PIXELY IMAGE SYSTEM READY");
};

captureScript.onerror = () => {
  console.error("이미지 저장 라이브러리를 불러오지 못했습니다.");
};

document.head.appendChild(captureScript);


/* ========================================
   14. TICKET IMAGE DOWNLOAD
======================================== */

const downloadButton =
  document.getElementById("downloadTicket");


if (downloadButton) {

  downloadButton.addEventListener("click", async () => {

    const ticket = document.getElementById("ticketCapture");

    if (!ticket) return;

    if (typeof html2canvas === "undefined") {

      alert(
        "이미지 저장 기능을 준비하고 있어요. 잠시 후 다시 시도해 주세요!"
      );

      return;
    }

    const originalText = downloadButton.innerHTML;

    downloadButton.disabled = true;

    downloadButton.innerHTML = "이미지 생성 중...";

    try {

      // 화면의 수험표를 이미지로 변환
      const canvas = await html2canvas(ticket, {

        scale: 3,

        backgroundColor: "#EFF7FC",

        useCORS: true,

        logging: false,

        windowWidth: Math.max(
          document.documentElement.clientWidth,
          320
        )

      });


      // PNG 이미지 생성
      const imageURL = canvas.toDataURL("image/png");


      // 다운로드 링크 생성
      const downloadLink = document.createElement("a");

      downloadLink.href = imageURL;

      downloadLink.download =
        `PIXELY_수험표_${nicknameInput.value.trim() || "PLAYER"}.png`;


      // 다운로드 실행
      document.body.appendChild(downloadLink);

      downloadLink.click();

      downloadLink.remove();

    } catch (error) {

      console.error("수험표 저장 실패:", error);

      alert(
        "이미지를 저장하지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요!"
      );

    } finally {

      downloadButton.disabled = false;

      downloadButton.innerHTML = originalText;

    }

  });

}


/* ========================================
   15. INITIALIZATION
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  console.log(
    "%c PIXELY EXAM SYSTEM ",
    "background:#315B91;color:white;padding:8px;font-weight:bold;"
  );

  console.log("Welcome to PIXELY!");

});


/* ========================================
   END OF PIXELY SCRIPT
======================================== */

