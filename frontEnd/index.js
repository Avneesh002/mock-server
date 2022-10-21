const url = 'http://localhost:3000/api/todo'

let cont = document.getElementById('container')

let page = 1;

let getData = async () =>{

    console.log(page)
    let res = await fetch(`${url}?_page=${page}&_limit=2`);
    res = await res.json()
    // console.log(res)
    renderDom(res)
}
getData()

let card = (t,s,id) => {

    let div = document.createElement('div')
    let h3 = document.createElement('h3')
    h3.innerText = t;

    let p = document.createElement('p')
    p.innerText = s

let toggle = document.createElement('button')
toggle.innerText = 'Toggle'
toggle.onclick = () => {
    toggleTodo(id)
}

    let dlt = document.createElement('button')
    dlt.innerText = 'Delete'
    dlt.onclick = () => {
        dltBtn(id)
    }

    div.append(h3, p, toggle, dlt)
    return div;


}

let renderDom = (data) => {
    cont.innerHTML = null;
    data.forEach(({title, status, id}) => {
        let todo = card(title, status, id);
        cont.append(todo)
    })
}


//post method

let addTodo = async () => {

    let t = document.getElementById('todo').value

    let todo = {
        title : t,
        id : Date.now() + t,
        status: false
    }

    let res = await fetch(url , {

        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    getData()
}

//Put and Patch
// Put means to replace whole content, patch means to replace a word

let toggleTodo = async (id) => {

    let todo = await fetch(`${url}/${id}`);
    todo = await todo.json()

    let data = {status : !todo.status};

    let res = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    getData()


}

let dltBtn = async (id) => {

    
    let RES = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    getData()


}


let sort = async () => {

    // using json server so go to json github and find sort

    let res = await fetch(`${url}?_sort=title&_order=desc`)
    res = await res.json()

    renderDom(res)
}

let filter = async () => {

    let res = await fetch(`${url}?status=true`)
    res = await res.json()

    renderDom(res)
}

let prev = async () => {

    page--

    getData()

}

let next = async () => {

    page++

    getData()

}