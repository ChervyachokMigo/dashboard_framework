const { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, createWriteStream, open } = require('fs');
const path = require('path')
const axios = require('axios');
const md5File = require('md5-file');
const fsExtra = require('fs-extra');

const images_data_path = path.join(__dirname, 'images_db.json');
const images_stock_path = path.join(__dirname, '..', 'public', 'images');
const images_temp_path = path.join(__dirname, 'temp');

const _images = {
    list: [],
}

const init_images = () => {
    if (!existsSync(images_stock_path)){
        mkdirSync(images_stock_path, {recursive: true});
    } else {
        fsExtra.emptyDirSync(images_stock_path);
    }

    if (!existsSync(images_temp_path)){
        mkdirSync(images_temp_path, {recursive: true});
    } else {
        fsExtra.emptyDirSync(images_temp_path);
    }
    
    if (existsSync(images_data_path)){
        //_images.list = JSON.parse(readFileSync(images_data_path, {encoding: 'utf8'}));
        writeFileSync(images_data_path, JSON.stringify(_images.list));
    } else {
        writeFileSync(images_data_path, JSON.stringify(_images.list));
    }
}

const image_add = (img) => {
    _images.list.push(img);
    writeFileSync(images_data_path, JSON.stringify(_images.list));
}

let temp_img_couter = 0;

const load_image = (src) => {
    try{
        const temp_image_name = `${temp_img_couter}${path.extname(src)}`;
        temp_img_couter++;

        const image_temp_path = path.join(images_temp_path, temp_image_name);

        axios({ 
            method: 'get', 
            url: src, 
            responseType: 'stream' 
        }).then( response => {
            response.data.pipe(createWriteStream(image_temp_path)).on('finish', () => {
                const md5 = md5File.sync(image_temp_path);
                const image_name = `${md5}${path.extname(temp_image_name)}`;
                const image_path =  path.join(images_stock_path, image_name);
                copyFileSync(image_temp_path, image_path);
                rmSync(image_temp_path);
                image_add({
                    src, 
                    local_src: `images/${image_name}`,
                });
            }).on('error', e => console.error(e));
        }). catch ( e => console.error(e));

    } catch (e) {
        console.error(e);
    }
}

const get_image_html = ({src}) => {
    const image = _images.list.find( v => v.src === src );

    if (image){
        return { remote_src: src, src: image.local_src };
    } else {
        load_image(src);
        return { is_loading: true };
    }    
}

module.exports = {
    init_images,
    get_image_html
}