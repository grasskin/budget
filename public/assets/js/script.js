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

window.onload = () => {
  console.log('Page has loaded.')
  document.getElementById("newbill").addEventListener("submit", async (event) => {
    event.preventDefault();
    // let money = parseNumber(document.querySelector("#bank").innerHTML);
    let money = await fetch("/api").then(response => response.json()).then((data) => data.money)
    let spent = parseNumber(document.querySelector("#currency-field").value);
    console.log(money, spent);
    let newmoney = money - spent;
    updateServerMoney(-spent)
    if (newmoney < 0) {
        document.querySelector("#bank").innerHTML = "-$" + Math.abs(newmoney);
        document.querySelector("#bank").style.backgroundColor = "#C41E3A";
        document.querySelector("#bank").style.color = 'black';
    } else {
        document.querySelector("#bank").innerHTML = "$" + newmoney;
        document.querySelector("#bank").style.backgroundColor = '#118C4F';
        document.querySelector("#bank").style.color = 'white';
    }

    document.querySelector("#currency-field").value = '';
});
}

