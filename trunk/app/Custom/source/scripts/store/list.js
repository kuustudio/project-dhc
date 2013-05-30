(function(){
    $(".store-menu-wall").gridalicious({
        gutter: 10,
        selector:'.store-menu-item',
        animate: true,
        animationOptions: {
                speed: 150,
                duration: 500,
                complete: onComplete
        },
    });
    
    // function not used. 
    function onComplete(data) {
    }
})(jQuery)