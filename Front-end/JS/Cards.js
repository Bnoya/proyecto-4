// card contacts 

function addContact(params) {

    //Elements
    let home = document.getElementById('contacts');
    let container = document.createElement('div');
    let form = document.createElement('form');
    let data1 = document.createElement('div');
    let data2 = document.createElement('div');

    let img = document.createElement('img');
    let dname = document.createElement('div');
    let lName = document.createElement('label');
    let iName = document.createElement('input');
    let dLastname = document.createElement('div');
    let lLastname = document.createElement('label');
    let iLastname = document.createElement('input');
    let djob = document.createElement('div');
    let ljob = document.createElement('label');
    let ijob = document.createElement('input');
    let dEmail = document.createElement('div');
    let lEmail = document.createElement('label');
    let iEmail = document.createElement('input');
    let dcompany = document.createElement('div');
    let lcompany = document.createElement('label');
    let iCompany = document.createElement('input');
    let dRegion = document.createElement('div');
    let lRegion = document.createElement('label');
    let sRegion = document.createElement('select');
    let dcountry = document.createElement('div');
    let lcountry = document.createElement('label');
    let scountry = document.createElement('select');
    let dcity = document.createElement('div');
    let lcity = document.createElement('label');
    let scity = document.createElement('select');
    let dAddress = document.createElement('div');
    let lAddress = document.createElement('label');
    let iAddress = document.createElement('input');
    let dIntrest = document.createElement('div');
    let lIntrest = document.createElement('label');
    let barDiv = document.createElement('div');
    let sIntrest = document.createElement('select');
    let dchannel = document.createElement('div');
    let lChannel = document.createElement('label');
    let schannel = document.createElement('select');
    let daccount = document.createElement('div');
    let laccount = document.createElement('label');
    let iaccount = document.createElement('input');
    let dPreff = document.createElement('div');
    let lPreff = document.createElement('label');
    let sPreff = document.createElement('select');
    let dplus = document.createElement('div');
    let plusbutton = document.createElement('button');


    let cancel = document.createElement('button');
    let save = document.createElement('button');


    //appends
    home.append(container);
    container.append(form);
    form.append(data1);
    form.append(data2);
    container.append(cancel);
    container.append(save);


    data1.append(img);
    data1.append(dname);
    data1.append(dLastname);
    data1.append(djob);
    data1.append(dEmail);
    data1.append(dcompany);
    
    data2.append(dRegion);
    data2.append(dcountry);
    data2.append(dcity);
    data2.append(dAddress);
    data2.append(dIntrest);
    data2.append(dchannel);
    data2.append(daccount);
    data2.append(dPreff);
    data2.append(dplus);
    
    
    
    dname.append(lName);
    dname.append(iName);
    dLastname.append(lLastname);
    dLastname.append(iLastname);
    djob.append(ljob);
    djob.append(ijob);
    dEmail.append(lEmail);
    dEmail.append(iEmail);
    dcompany.append(lcompany);
    dcompany.append(iCompany);
    dRegion.append(lRegion);
    dRegion.append(sRegion);
    dcountry.append(lcountry);
    dcountry.append(scountry);
    dcity.append(lcity);
    dcity.append(scity);
    dAddress.append(lAddress);
    dAddress.append(iAddress);
    dIntrest.append(lIntrest);
    dIntrest.append(barDiv);
    dIntrest.append(sIntrest);
    dchannel.append(lChannel);
    dchannel.append(schannel);
    daccount.append(laccount);
    daccount.append(iaccount);
    dPreff.append(lPreff);
    dPreff.append(sPreff);
    dplus.append(plusbutton);
    


}







// cards companies


// cards users


// 