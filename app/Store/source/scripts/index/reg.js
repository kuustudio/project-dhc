(function($){
    $('.bd').on('click','.select-store-category .select-btn',function(e){
        $('.select-store-category .list').slideDown('slow');
        $('.select-store-category').css('height','auto');
    }).on('click','.select-store-category ul li',function(e){
        $('.select-store-category .list').slideUp('slow');
        $('.select-store-category .text').text($(this).text());
    }).on('click','.select-store-area .select-btn',function(e){
        $('.select-store-area .list').slideDown('slow');
        $('.select-store-area').css('height','auto');
    }).on('click','.select-store-area ul li',function(e){
        $('.select-store-area .list').slideUp('slow');
        $('.select-store-area .text').text($(this).text());
        $('.address-more').slideDown('slow');
    }).on('click','.search-perimeter-area',function(e){
        $('.search-area-result').slideDown('slow');
    })
})(jQuery);