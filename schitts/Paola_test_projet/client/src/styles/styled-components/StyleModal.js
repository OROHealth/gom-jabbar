import styled from 'styled-components';

export const StyleModal = styled.div `
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 12%;
    width: 500px;
    height: 250px;
    background: white;
}

h4{
    margin-top: -30px;
    font-size: 30px;
}

form{
    margin-left: 23%;
    width: 300px;
}

#buttons{
    display: flex;
    justify-content: space-evenly;
    margin-top: 25px;
}

.button1{
    background: green;
    height: 30px;
    width: 70px;
}

.button2{
    background: red;
    height: 30px;
    width: 70px;
}

.button1:hover, .button2:hover{
    opacity: 0.5;
    cursor: pointer;
}


@media screen and (max-width: 375px) {
    .container{
        margin-top: 62%;
        width: 250px;
        height: 150px;
        background: white;
    }
    h4{
        margin-top: -5px;
        font-size: 20px;
    }
    
    form{
        margin-left: 30%;
        width: 100px;
    }
    #buttons{
        justify-content: space-between;
        margin-top: 15px;
    }
}
`;
