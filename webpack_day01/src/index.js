import IMG from './2.JPG';

const Img = new Image();
Img.src = IMG;
Img.onload = ()=>{
    Img.width = 300;
    document.body.appendChild(Img);
};
