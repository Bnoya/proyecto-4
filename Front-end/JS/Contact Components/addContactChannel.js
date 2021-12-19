class AddChannel {
    constructor(element, infoChannel, count) {
        console.log('entre a add channel');
        this.element = element;
        this.channel = infoChannel;
        this.count = count
        this.element.innerHTML = this.channelConstructor()
        this.addEventListener();
        }
        
    channelConstructor() {
        let contactHTML = '';
        contactHTML= contactHTML + `
        <div class='container' >
        <div class="contactCont"> 
        <label for="contact">Canal de Contacto: </label>
        <select name="contact" id="contChannel-${this.count}">
        <option value='not'>Seleccione una...</option>
        `
        for (let i = 0; i < this.channel.length; i++) {
            let channel = this.channel[i];
            contactHTML = contactHTML + `
            <option value="${channel.id}"> ${channel.channel} </option>
            `
        }
        
        contactHTML = contactHTML + `
        </select>
        </div>
        <div class="userAccount">
        <label for="account">Cuenta del Usuario: </label>
        <input type="text" name="account" id="account-${this.count}" placeholder="@ejemplo">
        </div>
        <div class="preffCont">
        <label for="preff">Preferencias: </label>
        <select name="preff" id="preff-${this.count}">
        <option value='0'>Seleccionar una...</option>
        <option value='1'>Canal Favorito <i class="fas fa-heart"></i> </option>
        <option value='2'>No Molestar <i class="far fa-times-circle"></i> </option>
        <option value='3'>Solo Emergencias <i class="fas fa-exclamation-triangle"></i> </option>
        </select>
        </div>
        </div>
        `
        return (contactHTML);
    }
    addEventListener() {
        
    }
}
export {AddChannel}