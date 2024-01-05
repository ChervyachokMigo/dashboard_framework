const dashboard = require('../index');



const main = async () => {
    dashboard.prepare([
        {   
            name: 'running',
            status: 'on',
            values: [
                {name: 'on', color: [0,255,0]}, 
                {name: 'off', color: [255,0,0]}
            ]
        }
    ]);
    
    await dashboard.run(3121, 3122);
    
    const vals = ['on', 'off', 'test'];
    let i = 0;

    setInterval( ()=> {
        i = (i + 1) % vals.length;
        console.log(vals[i]);
        dashboard.change_status_item('running', vals[i]);
        
    }, 3000)

    



}

main();