$("#Send").click(function () {
    let formData = {title: $("title").text()}
    $("input").each( function () {
        if ($(this).attr("type") == "radio" && $(this).is(':checked')) {
            formData[$(this).attr("name").split("_")[1]] = $(this).attr("id").split("_")[1]
        }else 
        if ($(this).attr("type") == "checkbox" && $(this).is(':checked')) {
            try {
                formData[$(this).attr("name").split("_")[1]].push($(this).attr("id").split("_")[1])
            }
            catch (err) {
                if (err.name == "TypeError") {
                    formData[$(this).attr("name").split("_")[1]] = [$(this).attr("id").split("_")[1]]
                }
            }
        }
    })
    $("textarea").each(function () {
        formData[$(this).attr("name").split("_")[1]] = $(this).val()
    })
    
    $.post("/api/resultChecker", formData, function (data) {
        localStorage[`Test ${$("title").text().split(" ")[1]} result`] = Number(data)
        window.location.href = `/result/${$("title").text().split(" ")[1]}`
    })
})