module.exports = (page, totalPages, delta = 2) =>{
    const pages = [];
    const leftPage = page - delta;
    const rightPage = page + delta;
    for(let i = 1; i <= totalPages; i++){
        if(
            i===1 ||
            i=== totalPages ||
            (i >= leftPage && i <= rightPage) 
        ){
            pages.push(i);
        }
        else if(
            i === leftPage -1 ||
            i === rightPage + 1)
            {
                pages.push('...');
            }
    }
    return pages;

}