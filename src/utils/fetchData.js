const BASE_URL = "https://api.euskadi.eus/culture/events/v1.0";

 
async function fetchData(route, method = "GET", data = null) {
    const url = BASE_URL + route; //route ruta especifica del endpoint, ej: /events

    const options = {  // objeto que configura cómo se debe realizar la solicitud HTTP, el método, los encabezados y cuerpo de la solcitud
        method: method,
        headers: {
            'Accept': 'application/json; charset=utf-8', //para que vuelvan con caracteres en español
          },
    };

    // Si hay datos, se agregan al cuerpo de la solicitud y se establece el Content-Type
    if (data) {
        options.headers["Content-Type"] = "application/json"; //indica q los datos se envian en formato json en el cuerpo de la solicitud, avisa al servidor q recibirá y p/q sepa como procesaro
        options.body = JSON.stringify(data);//convierte el objeto de js como: const data = { name: "Evento", date: "2025-12-31" }; en json
    }

    try {
    
        const response = await fetch(url, options);

        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText || 'Error desconocido'}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        throw error; //propago el error al handler
    }
}

export default fetchData;
