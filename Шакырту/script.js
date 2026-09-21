// AOS анимация іске қосу
AOS.init({ duration: 1000, once: true });

// 1. Беттерді ауыстыру логикасы (Tabs)
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 2. Музыка плеері және винил дискінің айналуы
const audio = document.getElementById('bgMusic');
const audioWidget = document.getElementById('audioWidget');
const vinyl = document.getElementById('vinyl');
const audioStatus = document.getElementById('audioStatus');
let isPlaying = false;

audioWidget.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().catch(() => {});
        vinyl.classList.add('playing');
        audioWidget.classList.add('active');
        audioStatus.textContent = 'Ән қосулы';
        isPlaying = true;
    } else {
        audio.pause();
        vinyl.classList.remove('playing');
        audioWidget.classList.remove('active');
        audioStatus.textContent = 'Әнді тыңдау';
        isPlaying = false;
    }
});

// 3. Кері санақ таймері (17 қазан 2026 жыл)
const targetDate = new Date('October 17, 2026 18:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
        document.getElementById('days').textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById('hours').textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        document.getElementById('minutes').textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        document.getElementById('seconds').textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 4. Фотогалерея слайдері
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Автоматты түрде слайд алмасу
setInterval(() => { changeSlide(1); }, 4000);

// 5. RSVP жауабы және фейерверк анимациясы
function handleRsvp(type) {
    const msg = document.getElementById('rsvpMessage');
    if (type === 'yes') {
        msg.textContent = 'Керемет! Сізді тойда асыға күтеміз! 🎉';
        launchFireworks();
    } else {
        msg.textContent = 'Жауабыңызға рахмет, ойымызда боласыз!';
    }
}

// 6. Тілектер қабырғасы (Guestbook)
function submitWish() {
    const name = document.getElementById('guestName').value.trim();
    const text = document.getElementById('guestWish').value.trim();

    if (name && text) {
        const list = document.getElementById('wishesList');
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.innerHTML = `<strong>${escapeHtml(name)}:</strong><p>${escapeHtml(text)}</p>`;
        list.prepend(item);

        document.getElementById('guestName').value = '';
        document.getElementById('guestWish').value = '';
        alert('Тілегіңіз сәтті қосылды, рахмет!');
    } else {
        alert('Атыңызды және тілегіңізді толық жазыңыз.');
    }
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 7. Мерекелік фейерверк скрипті (Canvas)
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function launchFireworks() {
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            color: ['#d4af37', '#ffdf00', '#ffffff', '#2e7d32'][Math.floor(Math.random() * 4)],
            alpha: 1
        });
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;

        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) particles.splice(index, 1);
    });
    requestAnimationFrame(animateFireworks);
}
animateFireworks();