$("form").submit(function (event) {
    let formData = {}
    $(this).children("input").each(function (val) {
        formData[$(this).attr("name")] = $(this).val()
    })

    $.post(`${$(this).attr("action")}`, formData)
    .done( function (data) {
        alert(data)
    })

    event.preventDefault()
})