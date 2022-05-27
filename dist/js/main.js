window.onload = function(){
    let head = document.getElementsByClassName('header')[0].offsetHeight;
    let reserve = document.getElementById('reserve_body');

    console.log(location.pathname);
    if( location.pathname === "/reserve/") {
        reserve.style.marginTop = head + 'px';
    }
}