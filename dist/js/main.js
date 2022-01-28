window.onload = function(){
    // init
    var petto = localStorage.getItem('ペット'),
        syou = localStorage.getItem('小動物'),
        ningen = localStorage.getItem('人間');

        var ans = Number(petto) + Number(syou) + Number(ningen)
    
    $('[name=pull-down1]').change(function(){
        var val = $(this).val();
        localStorage.setItem('ペット',val);
        changePlice('ペット');
    })
    $('[name=pull-down2]').change(function(){
        var val = $(this).val();
        localStorage.setItem('小動物',val);
        changePlice('小動物');
    })
    $('[name=pull-down3]').change(function(){
        var val = $(this).val();
        localStorage.setItem('人間',val);
        changePlice('人間');
    })

    //それぞれのローカルストレージに値がなければ
    if(petto == null && syou == null && ningen == null) {
        document.querySelector('.ans').innerHTML = ans;
    }

    //時間削除のロジック
    var tm = 5000;
    function timeout() {
        localStorage.clear();
    }

    //値段の加算と対象にインプット
    function changePlice() {
        var value01 = localStorage.getItem('ペット');
        var value02 = localStorage.getItem('小動物');
        var value03 = localStorage.getItem('人間');
        var ans = Number(value01) + Number(value02) + Number(value03)
        document.querySelector('.ans').innerHTML = ans;
    }

    document.querySelector('.ans').innerHTML = ans;


    $('.ans').on('click', function(){
        console.log("5秒経ちました");
        setTimeout(timeout,tm);
    })
}