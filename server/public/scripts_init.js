const include = async (js_src) => {
    return new Promise( (res) => {
        const js = document.createElement("script");
        js.type = "text/javascript";
        js.src = js_src;
        document.body.appendChild(js);
        js.onload = res;
    })
}

$(document).ready( async () => {
    await include("./tools/settings.js");
    await include("./tools/misc.js");
    await include("./tools/image_loader.js");
    await include("./tools/style.js");
    await include("./tools/status.js");
    await include("./tools/feed.js").finally( () => {
        $( window ).on( "resize", () => {
            recreate_feed_list();
        });
    });
    
    await include("./tools/socket.js").finally( () => {
        socket_init();
    });

});

