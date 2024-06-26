export class AppTask21Component extends HTMLElement{
    #state = {
        age:0,
        time:0
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:imss',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:imss',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','imss');

        /* Add Content */
        Table.heads = ["Tipo Jubilacion" ]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: 'age', 
                description: 'Ingresa la edad de la persona en años', 
                value:this.#state.age, 
                type:'number'
            },
            {
                name: 'time', 
                description: 'Antigüedad en su empleo en años', 
                value:this.#state.age, 
                type:'number'
            }
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
            isNaN(value) ||
            !Table || 
            !Object.hasOwn(this.#state, name) || 
            !value || this.#state[name] == value
        )return;

        /* Update State */
        Obj[name] = parseInt(value);
        this.#updateState(Obj);

        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        let {age, time}=this.#state;
        let type = 'No Cumple';
        if(
            age > 60 &&
            time < 25
        ){
            type = 'Jubilación por edad'
        }else if(
            age <= 60 &&
            time >= 25
        ){
            type= "Antiguedad Joven";
        }else if (
            age >= 60 &&
            time >= 25
        ){
            type = "Antiguedad Adulta"
        }

        return [[type]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
                <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #2 - IMSS
                </h2>
                <p class='section__description'>
                    El IMSS requiere clasificar a las personas que se jubilarán en el año de 1997. Existen tres tipos de jubilicación:            
                </p>
                <ol class="section__list section__list--ol">
                    <li class="section__item">
                        Edad
                    </li>
                    <li class="section__item">
                        Antigüedad joven
                    </li>
                    <li class="section__item">
                        Antigüedad adulta        
                    </li>
                </ol>
                <ul class="section__list section__list--ul">
                    <li class="section__item">
                        Las personas adscritas a la jubilación por edad deben de tener 60 años o más y una antigüedad en su empleo de menos de 25 años.
                    </li>
                    <li class="section__item">
                        Las personas adscritas a la jubilación por antigüedad joven deben tener menos de 60 años y una antigüedad en su empleo de 25 años o más.
                    </li>
                    <li class="section__item">
                        Las personas adscritas a la jubilación por antigüedad adulta deben tener 60 años o más y una antigüedad en su empleo de 25 años o más.                    
                    </li>
                </ul>
                <strong>Realizar el ejercicio implementando funciones.</strong>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-21',AppTask21Component)