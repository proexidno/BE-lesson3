$("#Send").click(function () {
    let formData = { title: $("title").text() }
    $("input").each(function () {
        if ($(this).attr("type") == "radio" && $(this).is(':checked')) {
            formData[$(this).attr("name").split("_")[1]] = $(this).attr("id").split("_")[1]
        } else
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
        localStorage.setItem(`Test ${$("title").text().split(" ")[1]} result`, Number(data))
        window.location.href = `/result/${$("title").text().split(" ")[1]}`
    })
})

window.onload = function () {
    if (!window.location.href.includes("/result/")) {
        return
    }
    $("#result").text(localStorage.getItem(`${$("#title").text()} result`))
    setTimeout(() => {
        let percent = localStorage.getItem(`${$("#title").text()} result`), currPercent = 0, degrs = percent * 1.8;
        $(".percentShower").css("transform", `rotate(${degrs}deg)`)
        let interval = setInterval(() => {
            $(".overlayC>div").text(`${currPercent}%`)
            currPercent += 1
            if (currPercent > percent) {
                clearInterval(interval)
            }
        }, 3400 / percent)
    }, 1)
}