let button = document.getElementById("Main");
let chartCanvas = document.getElementById('chart');



let data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
];

class dataClass {
    constructor(year, count) {
        this.year = year;
        this.count = count;
    }
}

button.onclick = buttonClicked;

function buttonClicked() {
    console.log("Clicked")
    eel.my_python_function();
    eel.print_a_word("Pão");
    gettingValueFromPython()
}

(async function () {

    new Chart(
        chartCanvas,
        {
            type: 'line',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count),
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 2

                    }
                ]
            },
            options: {
                responsive: true,

                interaction: {
                    intersect: false,
                }
            }



        }
    );
})();

async function gettingValueFromPython() {
    // Essa função possui um return, ou seja um callback assincrono
    // Por isso ela deverá estar dentro de uma função async
    let retornoDoPython = await eel.get5()()
    alert(retornoDoPython)
    console.log(retornoDoPython)
    eel.print_a_word(retornoDoPython)
}

gettingValueFromPython();