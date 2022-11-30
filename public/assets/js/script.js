const parseNumber = (currency) => Number(currency.replace(/[^0-9\.-]+/g,""));

const updateServerMoney = (update) => {
    fetch("/api/money", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({money: update}),
    }).then(response => response.json())
      .then((data) => {
        console.log(data);
      })
}

const getMoney = async () => {
    return await fetch("/api").then(response => response.json()).then((data) => data.money)
}

const updateMoney = (update) => {
    if (update < 0) {
        document.querySelector("#bank").innerHTML = "-$" + Math.abs(update);
        document.querySelector("#bank").style.backgroundColor = "#C41E3A";
        document.querySelector("#bank").style.color = 'black';
    } else {
        document.querySelector("#bank").innerHTML = "$" + update;
        document.querySelector("#bank").style.backgroundColor = '#118C4F';
        document.querySelector("#bank").style.color = 'white';
    }
}

window.onload = async () => {
    let money = await getMoney();
    updateMoney(money);
    document.getElementById("newbill").addEventListener("submit", async (event) => {
        event.preventDefault();
        // let money = parseNumber(document.querySelector("#bank").innerHTML);
        let money = await getMoney()
        let spent = parseNumber(document.querySelector("#currency-field").value);
        console.log(money, spent);
        let newmoney = money - spent;
        updateServerMoney(-spent)
        updateMoney(newmoney)

        document.querySelector("#currency-field").value = '';
    });
}

