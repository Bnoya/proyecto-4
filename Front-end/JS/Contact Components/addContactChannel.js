class AddChannel {
    constructor(element, infoChannel) {
        console.log('entre a add channel');
        this.element = element;
        this.channel = infoChannel;
        this.element.innerHTML = this.channelConstructor()
        this.element.classList.add( 'container');
        this.addEventListener();
        }
        
    channelConstructor() {
        let contactHTML = '';
        contactHTML= contactHTML + `
        <div class="contactCont"> 
            <label for="contact">Canal de Contacto: </label>
            <select name="contact" id="contChannel">
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
            <input type="text" name="account" id="account" placeholder="@ejemplo">
        </div>
        <div class="preffCont">
            <label for="preff">Preferencias: </label>
            <select name="preff" id="preff">
            <option>Canal Favorito <i class="fas fa-heart"></i> </option>
            <option>No Molestar <i class="far fa-times-circle"></i> </option>                                                           </option>
            <option>Solo Emergencias <i class="fas fa-exclamation-triangle"></i> </option>
            </select>
        </div>
        `
        return (contactHTML);
    }
    addEventListener() {
        
    }
}
export {AddChannel}