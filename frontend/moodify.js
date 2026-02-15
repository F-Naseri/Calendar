window.onload = function() {
    const btnSidebar = document.querySelector('.btn-sidebar');
    const sidebar = document.querySelector('.sidebar');

    console.log("برنامه لود شد. وضعیت دکمه:", btnSidebar);

    if (btnSidebar) {
        btnSidebar.addEventListener('click', function() {
            console.log("دکمه کلیک شد!");
            sidebar.classList.toggle('active');
        });
    }
};