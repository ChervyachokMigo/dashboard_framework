const _images = {
    list: []
};

const load_image = async (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.addEventListener('load', () => resolve({image}));
        image.addEventListener('error', () => resolve({error: '404'}));
    });
}

const get_image = async (src) => {
    let image = _images.list.find( v => v.src === src );
    if (image) {
        return image.html;
    } else {
        const loaded_image = await load_image(src);
        if (loaded_image.error){
            return document.createElement('img');
        } else if (loaded_image.image) {
            _images.list.push({src, html: loaded_image.image});
            return loaded_image.image;
        } else {
            console.error('get image error');
        }
        
    }
}