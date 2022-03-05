const baseUrl = 'https://platzi-avo.vercel.app';
const appNode = document.querySelector('#app');

// web api
// Conectarnos al servidor
// Procesar la respuesta y convertirla en JSON
// JSON -> Data -> Renderizar info browser

const formatPrice = (price) => {

    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price);

    return newPrice;
}

const fetchData = async (api_url) => {
    const response = await fetch(api_url, { 'mode': 'cors', 'headers': { 'Access-Control-Allow-Origin': '*' } });
    const json = await response.json();

    const todosLosItems = [];
    json.data.forEach((item) => {
        // Crear imagen
        const imagen = document.createElement('img');
        imagen.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';
        imagen.src = `${baseUrl}${item.image}`;

        // Crear título
        const title = document.createElement('h2');
        title.className = 'text-lg';
        title.textContent = item.name;

        // Crear precio
        const price = document.createElement('div');
        price.className = 'text-gray-600';
        price.textContent = formatPrice(item.price);

        // Price and title (div)
        const priceAndTitle = document.createElement('div');
        priceAndTitle.className = 'text.center md:text-left';
        priceAndTitle.append(title, price);

        // Wrap Image and priceAndTitle
        const card = document.createElement('div');
        card.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300';
        card.append(imagen, priceAndTitle);

        const container = document.createElement('div');
        container.append(card);

        todosLosItems.push(container);

    });

    appNode.append(...todosLosItems);
}

fetchData(`${baseUrl}/api/avo`);