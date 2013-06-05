(function(){
    $(".share-wrap").gridalicious({
        gutter: 0,
        width: 175,
        selector:'.item',
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