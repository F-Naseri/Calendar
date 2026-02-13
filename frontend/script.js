document.querySelectorAll('.btn-accept').forEach(button => {
    button.addEventListener('click', function() {
        alert('درخواست با موفقیت تایید شد!');
        // اینجا می‌توانید کد مربوط به تغییر وضعیت در دیتابیس را اضافه کنید
    });
});