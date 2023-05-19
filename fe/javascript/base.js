const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// Chuyển TAB

const tabs = $$(".tab-item");
const tabActive = $(".tab-item.active");
const line = $('.line');

function ShowLine(tab) {
    line.style.left = tab.offsetLeft + "px";
    line.style.width = tab.offsetWidth + "px";
};

ShowLine(tabActive);


tabs.forEach((tab, index) => {
    var icon = $('.tab-item__icon')[index];
    tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");

        ShowLine(tab);

        this.classList.add("active");
    };
});