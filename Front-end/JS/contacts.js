class Contact {
    constructor(element, selectedOption) {
        this.element = element
        this.element.innerHTML = `
        <div class='fullsize'>
        <div class='newCard'>
        <form class='addContact'>
            <div class='cross'><i class="fas fa-times"></i></div>
                <div class="importantData">
                    <img class='imgCont'>
                    <div class='nameCont'>
                        <label for= 'name'> Nombre: </Label>
                        <input type="text" name="name">
                    </div>
                    <div class="lastCont">
                        <label for="last">Apellido: </label>
                        <input type="text" name="last">
                    </div>
                    <div class="jobCont">
                        <label for="job">Cargo: </label>
                        <input type="text" name="job">
                    </div>
                    <div class="emailCont">
                        <label for="email">Email: </label>
                        <input type="text" name="email">
                    </div>
                    <div class="companyCont">
                        <label for="company">Compania: </label>
                        <input type="text" name="company">
                    </div>
                </div>
                <div class="secondaryData">
                    <div class="regionCont">
                        <label for="region">Region: </label>
                        <select name="region" id="regionSelect">

                        </select>
                    </div>
                    <div class="countryCont">
                        <label for="country">Pais: </label>
                        <select name="country" id="countrySelect">

                        </select>
                    </div>
                    <div class="cityCont">
                        <label for="city">Ciudad: </label>
                        <select name="city" id="citySelector">

                        </select>
                    </div>
                    <div class="addressCont">
                        <label for="address">Direccion: </label>
                        <input type="text" name="address">
                    </div>
                    <div class="intrestCont">
                        <label for="intrest">Interes: </label>
                        <div class='inputCont'>
                        <div class="selector"></div>
                        <select name="intrest" id="intrest">
                        <option value="0">0%</option>
                        <option value="25">25%</option>
                        <option value="50">50%</option>
                        <option value="75">75%</option>
                        <option value="100">100%</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div class='thirdData'>
                    <div class="contactCont">
                        <label for="contact">Canal de Contacto: </label>
                        <select name="contact" id="contChannel">

                        </select>
                    </div>
                    <div class="userAccount">
                        <label for="account">Cuenta del Usuario: </label>
                        <input type="text" name="account" id="account" placeholder="@ejemplo">
                    </div>
                    <div class="preffCont">
                        <label for="preff">Preferencias: </label>
                        <select name="preff" id="preff">

                        </select>
                    </div>
                    <div class="addCont">
                        <button id="addChannel">+ Agregar Canal</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        `
        this.element.classList.add('contacts-window');
        document.getElementById(`contacts${selectedOption}`).classList.add('selected');
    }
}

export {Contact}