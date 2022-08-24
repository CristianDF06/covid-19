window.onload = () => {
    let url = 'http://localhost:3000/api/total';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let orden1 = JSON.parse(JSON.stringify(data));

            orden1.sort((a, b) => b.active - a.active);
            orden1.length = 10;//indicamos la cantidad de elementos que queremos mostrar
            console.log(orden1);
            //console.log(orden1[0].country);//accedemos a la propiedad country

            let datos = orden1.map((dato) => {
                return { label: dato.country, y: dato.deaths };
            });
            //console.log(datos)
            cargarGrafico(datos);

            let infoCovid = {//creamos un objeto para mostrar todos los objetos del array
                nombre: orden1[0].country,
                activos: orden1[0].active,
                confirmados: orden1[0].confirmed,
                muertes: orden1[0].deaths,
                recuperados: orden1[0].recovered
            }
            //console.log(infoCovid)
        })
        .catch((error) => console.log(`ha ocurrido un error ${error}`));

    const cargarGrafico = (infoCovid) => {
        //console.log(datos)
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Situación Covid a nivel mundial"
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
                dataPoints: infoCovid//aca hay que incluir los datos para mostrarlo al grafico
            },
            {
                type: "column",
                name: "Casos confirmados",
                legendText: "Casos confirmados",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: infoCovid
            },
            {
                type: "column",
                name: "Recuperados",
                legendText: "Recuperados",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: [
                    { label: "Saudi", y: 3.46 },
                    { label: "Venezuela", y: 7.27 },
                    { label: "Iran", y: 15.99 },
                    { label: "Iraq", y: 4.45 },
                    { label: "Kuwait", y: 2.92 },
                    { label: "UAE", y: 3.1 },
                    { label: "Chile", y: 10.1 }
                ]
            }, 
            {
                type: "column",
                name: "Fallecidos",
                legendText: "Fallecidos",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: [
                    { label: "Saudi", y: 10.46 },
                    { label: "Venezuela", y: 2.27 },
                    { label: "Iran", y: 3.99 },
                    { label: "Iraq", y: 4.45 },
                    { label: "Kuwait", y: 2.92 },
                    { label: "UAE", y: 3.1 },
                    { label: "Chile", y: 24.1 }
                ]
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
