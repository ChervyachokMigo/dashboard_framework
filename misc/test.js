
const dashboard = require('../index');


const main = async () => {
    dashboard.settings.set({debug: true});

    await dashboard.run(3121, 3122);

    dashboard.set_status([
        {   
            name: 'running',
            text: 'Рабочая панель',
            status: 'off',
            values: [
                {name: 'on', color: [0,255,0], text: 'вкл'}, 
                {name: 'off', color: [255,0,0], text: 'выкл'},
                {name: 'test', color: [0,0,50], text: 'test'},
                {name: 'load', color: [150,150,0], text: 'Загрузка'}
            ]
        },
        {   
            name: 'server',
            text: 'Сервер',
            status: '0',
            values: [
                {name: '1', color: [0,255,0], text: 'true'}, 
                {name: '0', color: [255,0,0], text: 'false'},
            ]
        },
    ]);


    /*dashboard.change_status({name: 'running', status: 'load'});
    dashboard.change_status_text({name: 'running', text: 'Рабочая лошадь'})

    dashboard.change_status({name: 'server', status: '1'});*/

    dashboard.add_status_item({ name: 'running', item_name: 'error', color: [255,255,0],  text: 'Ошибка!'});
    dashboard.change_status({name: 'running', status: 'error'});
    dashboard.change_text_item({name: 'running', item_name: 'error', text: 'Измененная ошибка'});
    //dashboard.change_status({name: 'running', status: 'on'});
/*
    dashboard.add_status({   
        name: 'welcome',
        text: 'добро пожаловать',
        status: 'first',
        values: [
            {name: 'first', color: [0,0,255], text: 'к нам'},
            {name: 'second', color: [0,0,0], text: 'к тем'},
        ]
    });

    dashboard.change_status('welcome', 'second');

    dashboard.change_status('running', 'off');

    /*dashboard.create_feed({feedname: 'main_feed'});
    let i = 1;

    dashboard.css_apply({selector: '.feed', prop: 'background-color', value: '#ccc'});

    setInterval( () => {
        
        dashboard.emit_event({feedname: 'main_feed', type: 'test', title: 'test', desc: 'ya lublu'});


        dashboard.change_event_prop({feedname: 'main_feed', type: 'last', propname: 'url', value: `${i}`});
        dashboard.change_event_prop({feedname: 'main_feed', type: 'last', propname: 'url', value: ``});
        i++
    }, 2000);
*/
}

main();