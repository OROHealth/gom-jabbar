import styled from 'styled-components';

export const StyleNavbar = styled.div`
nav{
    background-color:  lightgrey;
}
.nav-wrapper{
    display: flex;
    justify-content: space-evenly;
}
.navIcon{
    display: flex;
    justify-content: space-between;
    width: 400px;
}

img {
    margin: 12px;
}
#img1{

    width: 45px;
}
#img2{

    width: 73px;
}
#img3{
    width: 57px;
}

@media screen and (max-width: 1187px) {
    .brand-logo{
        margin-left: 0px;
    }
}

@media screen and (max-width: 768px) {
    .brand-logo{
        margin-left: 0px;
    }
    a.brand-logo{
        font-size: 25px;
    }
}


@media screen and (max-width: 375px) {
    .nav-wrapper{
        width: 300px;
        margin-left: -90px;
        justify-content: space-between;
    }
    .navIcon{
        justify-content: center;
        width: 10px;
    }

    #img1{
        width: 25px;
    }
    #img2{
    
        width: 43px;
    }
    #img3{
        width: 33px;
    }

}
`;
export const StyleLogo = styled.a`

span{
    color:black;
    font-weight: bold;
    font-size: 20px;
    font-family: "cursive";
}

@media screen and (max-width: 375px) {
    span{
        font-size: 10px;
        font-style: italic;
    }
}
`;