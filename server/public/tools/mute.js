let volume = 1;
let mute = false;

const change_volume = () => {
    console.log($('audio'))
    console.log($('audio')[0])
    for (let i in $('audio')){
        $('audio')[i].volume = volume;
    }
    
}

const toggle_mute = () => {
    mute = !mute;
    volume = mute ? 0 : 1;
}

$('.mute').on('click', (e) => {
    toggle_mute();
    $('.mute img').attr('src', mute? 'images/unmute.png' :'images/mute.png' );
    change_volume();
});