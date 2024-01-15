const _images = {
    list: [],
    pending: []
};

const get_image_html = (src) => `<img src="${src}">`;

const change_image_html_src = (id, src) => {
    $(`.feed_event[id=${id}] .feed_event_icon`).html(get_image_html(src));
}

const check_local_image = ({id, src}) => {
    const i = _images.list.findIndex( v => v.remote_src === src );

    let image_src = '';

    if (i > -1 ){
        image_src = _images.list[i].src;
    } else {
        socket_send('get_image', {src});
        _images.pending.push({id, src});
        image_src = src;
    }

    change_image_html_src(id, image_src);
}


const change_pending_image_html = ({remote_src, src}) => {
    const i = _images.pending.findIndex( v => v.src === remote_src);
    if (i > -1){
        const id = _images.pending[i].id;
        change_image_html_src(id, src);
        _images.pending.splice(i, 1);
    }
}

const response_image = async ({is_loading = false, remote_src, src }) => {
    if (is_loading){
        return false;
    }

    _images.list.push({remote_src, src});
    change_pending_image_html({remote_src, src});
}

const load_image = async (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.addEventListener('load', () => resolve({image}));
        image.addEventListener('error', () => resolve({error: '404'}));
    })
};
