const dashboard = require('../index');



const main = async () => {
    dashboard.prepare([
        {   
            name: 'running',
            text: 'Рабочая панель',
            status: 'on',
            values: [
                {name: 'on', color: [0,255,0], text: 'вкл'}, 
                {name: 'off', color: [255,0,0], text: 'выкл'},
                {name: 'test', color: [0,0,50], text: 'test'},
                {name: 'load', color: [150,150,0], text: 'Загрузка'}
            ]
        }
    ]);
    
    await dashboard.run(3121, 3122);
    
    const vals = ['on', 'off', 'test', 'load'];
    let i = 0, j = 0;

    /*setInterval( ()=> {
        i = (i + 1) % vals.length;

        dashboard.change_status_item('running', vals[i]);
        
        if (i === 0){
            dashboard.change_text_item('running', 'on', 'вкл 1');
        } else if (i === 1) {
            dashboard.change_text_item('running', 'off', 'выкл 2');
        } else if (i === 2) {
            dashboard.change_text_item('running', 'on', 'вкл 3');
        }

        dashboard.change_status_text('running', 'Рабочая лошадь')
        
    }, 2000)*/

    dashboard.change_status_item('running', 'load');
    dashboard.change_status_text('running', 'Рабочая лошадь')

    /*const load_interval = setInterval( ()=> {
        if (j < 100) {
            j = j + 1;
            dashboard.change_text_item('running', 'on', 'загрузка '+ j +' %');
        } else {
            dashboard.change_text_item('running', 'on', 'загрузка завершена');
            clearInterval(load_interval);
        }

    }, 100)*/

    



}

main();