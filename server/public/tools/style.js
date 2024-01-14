const change_background_image = ({selector, prop, value})=>{
    get_image(value.replace('url(', '').replace(')','')).then(() => {
        $(selector).fadeOut(500, () => {
            $(selector).css(prop, value);
            $(selector).fadeIn(500);
        });
    });
}

const css_apply = ({selector, prop, value}) => {
    if (prop === 'background-image'){
        change_background_image({selector, prop, value});
    } else {
        $(selector).css(prop, value);
    }
}

const css_load = ({list}) => {
    for (let args of list) {
        css_apply(args);
    }
}