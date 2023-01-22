$("#randogift").click(() => {
    axios.get("http://127.0.0.1:3000/api/randoGift").then((prop) => {
        $("#rGift")
            .empty()
            .append($("<h1>").html(prop.data.name))
            .append($("<p>").html(prop.data.cost))
            .append($("<p>").html(prop.data.joy))
    })
})