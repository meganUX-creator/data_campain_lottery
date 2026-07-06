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

    // Amount column sorting function
    $('th.sortable').on('click', function() {
        var $th = $(this);
        var index = $th.index();
        var $table = $th.closest('table');
        var $tbody = $table.find('tbody');
        var rows = $tbody.find('tr').not('#no-data-row').get();
        var $icon = $th.find('i.bi-arrow-down-up');

        // Determine sort direction
        var isAsc = !$th.data('asc');

        // Reset other headers' states
        $table.find('th.sortable').each(function() {
            if ($(this).get(0) !== $th.get(0)) {
                $(this).data('asc', null);
                $(this).find('i.bi-arrow-down-up').removeClass('text-primary').addClass('text-muted');
            }
        });

        $th.data('asc', isAsc);
        $icon.removeClass('text-muted').addClass('text-primary');

        rows.sort(function(a, b) {
            var valA = $(a).children('td').eq(index).text();
            var valB = $(b).children('td').eq(index).text();

            var parseVal = function(str) {
                // Keep only digits, slashes, periods, and negative signs
                str = str.replace(/[^\d\/\.\-]/g, '');
                if (str.indexOf('/') !== -1) {
                    return str.split('/').map(function(item) {
                        return parseFloat(item) || 0;
                    });
                }
                return [parseFloat(str) || 0];
            };

            var arrA = parseVal(valA);
            var arrB = parseVal(valB);

            // Lexicographical numeric comparison for slash-separated amounts (e.g. 0 / 24,305,000)
            var len = Math.max(arrA.length, arrB.length);
            for (var i = 0; i < len; i++) {
                var numA = arrA[i] || 0;
                var numB = arrB[i] || 0;
                if (numA !== numB) {
                    return isAsc ? numA - numB : numB - numA;
                }
            }
            return 0;
        });

        // Re-append sorted rows to the table body
        $.each(rows, function(idx, row) {
            $tbody.append(row);
        });
    });
});
