$("form").submit(function (event) {
    event.preventDefault()
    let formData = {};
    $(this).children("input").each(function () {
        if ($(this).val() == "") {
            throw "ERROR: inputs mustn't be empty"
        }
        formData[$(this).attr("name")] = $(this).val()
    })
    let page = $(this).children("h1").text()
    $.post(`/api/${page}`, formData)
        .done(function (data) {
            if (data == "Succesfuly authenticated") {
                window.location.href = "http://localhost:3000/"
            } else {
                alert(data)
            }
        })
})