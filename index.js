const modal = $.modal({
    title:"Alex modal",
    content:`<p>Lorem ipsum dolor sit.</p>
            <p>Lorem ipsum dolor sit.</p>`,
    closable:true,
    width: '400px',
    footerButtons : [
        {text:"Ok",type:'primary',handler(){
                console.log("Button OK clicked")
                modal.close()
            }},
        {text:"Cancel",type:'danger',handler(){
                console.log("Button Cancel clicked")
                modal.close()
            }}
    ]

})

const priceModal = $.modal({
    title:"Price modal",
    content:`<p>Цена ${fruit.title} : ${fruit.price}</p>`,
    closable:true,
    width: '400px',
    footerButtons : [
        {text:"Ok",type:'primary',handler(){
                priceModal.close()
            }}
    ]

})
// Обращаемся к условной библиотеке и вызываем фунуцию modal



const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
]

const toHtml = fruit =>
    `<div class="col">
            <div class="card"  >
                <img style="width: 300px" src=${fruit.img} class="card-img-top" >
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id=`${fruit.id}`>Посмотреть цену</a>
                    <a href="#" class="btn btn-danger">Удалить</a>
                </div>
            </div>
        </div>`


function render() {
    const html = fruits.map(toHtml).join('')
    document.body.querySelector('#fruits').innerHTML = html

}
render()

document.addEventListener("click",event =>{
    event.preventDefault()
const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
const fruit = fruits.filter(fruit => fruit.id === id)
    if ( btnType === "price"){
        priceModal.setContent(fruit)
        priceModal.open()
    }
    }
    )




