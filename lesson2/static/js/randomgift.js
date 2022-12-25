$("#randogift").click(() => {
    axios.get("http://127.0.0.1:3000/api/randoGift").then((data) => {
        $("#rGift")
            .empty()
            .append($("<h1>").html(data.data.name))
            .append($("<p>").html(data.data.cost))
            .append($("<p>").html(data.data.joy))
    })
})