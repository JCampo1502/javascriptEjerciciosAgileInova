export class AppTask22Component extends HTMLElement{
    #state = {
        height:0,
        width:0
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:perimeter',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:perimeter',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','perimeter');

        /* Add Content */
        Table.heads = ["Anchura", "Altura", "Area", "Perimetro"]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: "width", 
                description: "Anchura", 
                value:this.#state.width, 
                type:"number"
            },
            {
                name: "height", 
                description: "Longitud", 
                value:this.#state.height, 
                type:"number"
            },
        ]

        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article').append(Control, Table);
    }

    #updateTable(e){
        const Obj = new Object();
        const Table = this.querySelector('.section__table');
        let value = e.detail.value;
        let name = e.detail.name;

        /* Validations */
        if(
            !Table || 
            !Object.hasOwn(this.#state, name) || 
            !value || this.#state[name] == value
        )return;

        /* Update State */
        Obj[name] = parseFloat(value);
        this.#updateState(Obj);

        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        let {width, height} = this.#state;
        return [[            
            width.toFixed(2),
            height.toFixed(2),
            (width * height).toFixed(2),
            (2*width + 2*height).toFixed(2)
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #3 - Perímetro
                </h2>
                <p class='section__description'>
                    Hallar el área y el perímetro de un rectángulo. Implementar funciones.
                </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-22',AppTask22Component)