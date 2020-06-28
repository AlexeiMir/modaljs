Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {
}

function _createModalFooter(buttons=[]) {
    if (buttons.length === 0){
        return document.createElement('div')
    }

const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')
    buttons.map(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop
        wrap.appendChild($btn)
    })
    return wrap
}

function _createModal(options) {
    // как параметр получаем объект с опциями , которые будут настраивать данное модальное окно. По итогу когда вызовем данный плагин
    // хотим получить инстанс модального окна с которыми хотим делать: закрывать , открывать, изменять ему контент
    // должна вернуть объект , где будут храниться определенные методы, позволяющие взаимодействовать с инстансом
const modal = document.createElement("div") // чтобы взимодействовать с инстансом модального окна
    modal.classList.add("vmodal")
modal.insertAdjacentHTML("afterbegin",`<div class="modal-overlay" data-close="true">
<div class="modal-window">
        <div class="modal-header">
            <span class="modal-title">${options.title || ""} </span>
            <span class="modal-close" data-close="true">&times</span>
        </div>
        <div class="modal-body" data-content>
            ${options.content || ""}
        </div>
        </div>
    </div>`)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))

    document.body.appendChild(modal)
    return modal
}

$.modal = function (options) {
    const ANIMATION_SPEED = 1000
let closing = false
    let destroyed = false
    const $modal = _createModal(options) // $modal - DOM - node элемент. В него заносим рез-т работы ф-и
    // в замыкании доступны приватные переменные которые могут быть функциями

    const modal = {
        open(){
            !closing && $modal.classList.add("open")
        },
        close(){
            $modal.classList.remove("open")
            $modal.classList.add("hide")
            closing = true
            setTimeout(() => {
                $modal.classList.remove("hide")
                closing = false
            },ANIMATION_SPEED)
        }
    }

    const listener = function(event){
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener("click", listener)
    return Object.assign(modal,{
        destroy(){
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener("click", listener)
            destroyed = true
        },
        setContent(html){
            document.querySelector('[data-content]').innerHTML = html
        }
    })
}

