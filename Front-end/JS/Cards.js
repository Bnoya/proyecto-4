async function createRows(contacts) {
    
    let container = document.createElement('div');
    
    for (let i = 0; i < contacts.length; i++) {

        try{
            let url1 = ''
            let options = {
                type: 'GET',
                headers: {
                    'Authorization': `Bearer ${ver}`,
                    'Content-Type': 'application/json'
                },
            };
            const response= await fetch(url, options);
            const info = await response.json();
        } catch{

        }

        let row = document.createElement('div');
        let check = document.createElement('div');
        let 
        
    }
    
    
    
    //actions logo
    //<i class="fas fa-ellipsis-h"></i>
}