$.confirm = function(options){
return new Promise( (resolve,reject) => {
    const modal = $.modal({
        title:options.title,
        width: "400px",
        closable:false,
        content:options.content,
        footerButtons : [
            {text:"Cancel",type:'secondary',handler(){
                modal.close()
                reject()
                }},
                {text:"Close",type:'danger',handler(){
                    modal.close()
                    resolve()
                }}
        ]
    })
    modal.open()

} )
}