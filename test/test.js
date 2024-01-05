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
                {name: 'test', color: [0,0,50], text: 'test'}
            ]
        }
    ]);
    
    await dashboard.run(3121, 3122);
    
    const vals = ['on', 'off', 'test'];
    let i = 0;

    setInterval( ()=> {
        i = (i + 1) % vals.length;
        dashboard.change_status_item('running', vals[i]);
        
    }, 2000)

    



}

main();