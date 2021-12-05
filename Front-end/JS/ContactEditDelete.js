class EditDeleteContact {
    constructor(element, info) {
        this.element = element;
        this.info = info;
        console.log(this.element);
        console.log(this.info);
        this.element.innerHTML = this.optionsConstructor();
        this.element.classList.add( 'container');
        this.addEventListener();
    }
    optionsConstructor(){
        const optionsHTML = 
        `
        <div class='options'>
            <div class='menu-optiones'> 
                <div class='row-options' id = 'edit-${this.info.id}'><p>Editar</p></div>
                <div class='row-options' id = 'delete-${this.info.id}'><p>Borrar</p></div>
            </div>
        </div>
        `
        return (optionsHTML)
    }
    addEventListener(){

    }
}
export{EditDeleteContact}