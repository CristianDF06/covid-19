window.onload = () => {
    let url = 'http://localhost:3000/api/total';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let orden1 = JSON.parse(JSON.stringify(data));

            orden1.sort((a, b) => b.active - a.active);
            orden1.length = 10;
            console.log(orden1)

            let activos = [];
            let confirmados = [];
            let recuperados = [];
            let fallecidos = [];

            orden1.forEach((objeto) => {
                activos.push({ label: objeto.country, y: objeto.active });
                confirmados.push({ label: objeto.country, y: objeto.confirmed });
                recuperados.push({ label: objeto.country, y: objeto.recovered });
                fallecidos.push({ label: objeto.country, y: objeto.deaths });
            });
            
            cargarGrafico (activos, confirmados, recuperados, fallecidos)

        })
        .catch((error) => console.log(`ha ocurrido un error ${error}`));

    const cargarGrafico = (activos, confirmados, recuperados, fallecidos) => {


        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Situación Covid-19 a nivel mundial"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [{
                type: "column",
                name: "Casos activos",
                legendText: "Casos activos",
                showInLegend: true,
                dataPoints: activos,
            },
            {
                type: "column",
                name: "Casos confirmados",
                legendText: "Casos confirmados",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: confirmados,
            },
            {
                type: "column",
                name: "Recuperados",
                legendText: "Recuperados",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: recuperados,
            },
            {
                type: "column",
                name: "Fallecidos",
                legendText: "Fallecidos",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: fallecidos,
            }]
        });

        chart.render();

        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }
    }
}