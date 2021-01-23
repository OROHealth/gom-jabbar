import styled from 'styled-components';

export const StyleAddCustomers = styled.div`
.container{
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 10%;
    background: lightgrey;
    height: 350px;
    width: 400px;
    border-radius: 5px;
}

h4{
    color: darkorange;
    font-family: cursive;
}

form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    width: 230px;
    height: 200px;
    margin-top: 4%;
    margin-left: 22%;
}

input{
    background: white;
}

label{
    font-size: 18px;
    font-weight: bold;
    color: black;
    opacity: 0.7;
}

.button{
    background: darkorange;
    height: 30px;
    width: 70px;
}

.button1{
    background: darkorange;
    height: 30px;
    width: 200px;
    justify-content: center;
}

#bout{
    margin-top: 6%;
}

.button:hover, .button1:hover{
    opacity: 0.5;
    cursor: pointer;
}

.containerfluide{
    display: flex;
    justify-content: center;
}

.results{
    border-radius: 5px;
    background: lightgrey;
    width: 450px; 
    margin-top: 20px;
    text-align: center;
}

@media screen and (max-width: 375px) {
    .container{
        margin-top: 14%;
        height: 230px;
        width: 270px;
    }
    .container-fluide{
        width: 270px;
        margin-left: 3%;
        text-align: center;
    }
    h4{
        font-size: 24px;
    }
    form{
        width: 130px;
        height: 150px;
        margin-top: 4%;
        margin-left: 28%;
    }
}
`;