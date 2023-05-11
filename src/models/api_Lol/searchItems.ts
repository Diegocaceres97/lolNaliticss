export async function searchItem(elements: string[]) {
    const idElements: string[] = [];

    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/item.json');
    const info = await response.json();
    const data = await info.data;
    const items = Object.values(data);

    elements.forEach((element, index) => {
      if(index > 0){  
        console.log(element.trim())
        const foundItem = items.find(item => item['name'] == element.trim());
        if (foundItem) {
          idElements.push(foundItem['image']['full']);
        } else {
          idElements.push(null);
        }}
      });

    if(idElements.length > 0) {
        return idElements;
    } 
}