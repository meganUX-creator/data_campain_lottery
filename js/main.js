$(function() {
    // Initialize all date range pickers
    $('input[id*="date-range"]').daterangepicker({
        opens: 'left',
        autoUpdateInput: true,
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '从',
            toLabel: '到',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
        }
    });

    // Handle dropdown toggles in sidebar
    $('.dropdown-toggle').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('data-bs-target');
        $(target).collapse('toggle');
    });

    // Active state highlighting
    var currentPath = window.location.pathname.split('/').pop();
    if (currentPath) {
        $('.sidebar .nav-link').each(function() {
            if ($(this).attr('href') === currentPath) {
                $(this).addClass('active');
                $(this).closest('.collapse').addClass('show');
                $(this).closest('.nav-item').find('.dropdown-toggle').attr('aria-expanded', 'true');
            }
        });
    }
});
