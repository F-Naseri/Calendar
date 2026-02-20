const appointments = {
    "1404/11/30": [ 
        { time: "12:30 ب.ظ", name: "سهیل رمضانی", doctor: "دکتر آرزو فرهادی", status: "تکمیل شده", img: "pictures/4.jpg" },
        { time: "01:45 ب.ظ", name: "سارا رحمانی", doctor: "دکتر علیرضا کریمی", status: "تکمیل شده", img: "pictures/7.jpg" }
    ],
    "1404/12/03": [ 
        { time: "12:15 ب.ظ", name: "رضا کریمی", doctor: "دکتر آرزو فرهادی", status: "در انتظار", img: "pictures/2.jpg" },
        { time: "03:45 ب.ظ", name: "سهیلا حاجی پور", doctor: "دکتر علیرضا کریمی", status: "در انتظار", img: "pictures/8.jpg" }
    ],
    "1404/12/02": [ 
        { time: "01:45 ب.ظ", name: "سارا رحمانی", doctor: "دکتر علیرضا کریمی", status: "در انتظار", img: "pictures/7.jpg" }
    ]
};

let baseDate = new Date(); 

function toEnglishDigits(str) {
    return str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

function renderCalendar() {
    const daysList = document.getElementById('daysList');
    const monthNameDisplay = document.getElementById('monthName');
    if (!daysList || !monthNameDisplay) return;

    daysList.innerHTML = '';

    const monthName = new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(baseDate);
    const yearNum = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(baseDate);
    monthNameDisplay.innerText = `جلسات ${monthName} ${yearNum}`;

    for (let i = -3; i <= 3; i++) {
        let tempDate = new Date(baseDate);
        tempDate.setDate(baseDate.getDate() + i);

        const faParts = new Intl.DateTimeFormat('fa-IR', { 
            day: 'numeric', weekday: 'short', year: 'numeric', month: '2-digit' 
        }).formatToParts(tempDate);

        const dayName = faParts.find(p => p.type === 'weekday').value;
        const dayNum = faParts.find(p => p.type === 'day').value;
        const year = faParts.find(p => p.type === 'year').value;
        const month = faParts.find(p => p.type === 'month').value;
        
        let dateKey = toEnglishDigits(`${year}/${month}/${dayNum.padStart(2, '۰')}`);
        
        const isToday = i === 0 ? 'active' : '';

        daysList.innerHTML += `
            <div class="day-item ${isToday}" onclick="selectDate(this, '${dateKey}')">
                <span class="day-name">${dayName}</span>
                <span class="day-num">${dayNum}</span>
            </div>
        `;
    }
    
    const todayKey = toEnglishDigits(new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(baseDate));
    loadEvents(todayKey);
}

function selectDate(el, dateKey) {
    document.querySelectorAll('.day-item').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
    loadEvents(dateKey);
}

function loadEvents(dateKey) {
    const display = document.getElementById('eventsDisplay');
    if (!display) return;

    const dayEvents = appointments[dateKey] || [];

    if (dayEvents.length === 0) {
        display.innerHTML = '<p class="no-data" style="text-align:center; padding:20px; color:#aaa;">در این تاریخ نوبتی ثبت نشده است.</p>';
        return;
    }

    display.innerHTML = dayEvents.map(ev => `
        <div class="apt-row">
            <div class="apt-user">
                <img src="${ev.img}" class="user-img" style="width:45px; height:45px; border-radius:12px; object-fit:cover;">
                <div style="margin-right:10px">
                    <strong>${ev.name}</strong><br>
                    <small>${ev.doctor}</small>
                </div>
            </div>
            <div class="apt-info" style="text-align:left">
                <span>${ev.time}</span><br>
                <span class="status ${ev.status === 'تکمیل شده' ? 'done' : 'pending'}">${ev.status}</span>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const btnSidebar = document.querySelector('.btn-sidebar');
    const sidebar = document.querySelector('.sidebar');
    if (btnSidebar && sidebar) {
        btnSidebar.onclick = () => sidebar.classList.toggle('active');
    }

    const prevBtn = document.getElementById('prevweek');
    const nextBtn = document.getElementById('nextweek');
    
    if (prevBtn) {
        prevBtn.onclick = () => { baseDate.setDate(baseDate.getDate() + 7); renderCalendar(); };
    }
    if (nextBtn) {
        nextBtn.onclick = () => { baseDate.setDate(baseDate.getDate() - 7); renderCalendar(); };
    }

    renderCalendar();
});