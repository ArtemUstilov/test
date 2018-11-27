
export const animateIcon = () => {
   let cartIcon = document.getElementById('icon-cart')
    cartIcon.classList.add('bigger');
    let time = 0;
    let int = setInterval(()=>{
        if(time%200===0)
            cartIcon.classList.remove('bigger')
        else cartIcon.classList.add('bigger')
        time+=100;
        if(time > 800)clearInterval(int)
    }, 100)

}