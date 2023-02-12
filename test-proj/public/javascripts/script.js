let percent = Number($("#result").text()), currPercent = 0, degrs = percent * 1.8;
setTimeout(() => {
    $(".percentShower").css("transform", `rotate(${degrs}deg)`)
    let interval = setInterval(() => {
        $(".overlayC>div").text(`${currPercent}%`)
        currPercent += 1
        if (currPercent > percent) {
            clearInterval(interval)
        }
    }, 3400 / percent)
}, 400)