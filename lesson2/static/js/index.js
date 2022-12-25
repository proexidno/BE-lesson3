$("#getgift").click(() => {
    axios.get("http://127.0.0.1:3000/api/gift").then((data) => {
        data.data.list.forEach(element => {
            let a = $("<div>")
            let h1 = $("<h1>").text(element.name)
            let cost = $("<p>").text(element.cost)
            let joy = $("<p>").text(element.joy)
            a.append(h1).append(cost).append(joy)
            console.log(a);
            $("#gifts").append(a)
        });
    })
})