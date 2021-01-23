import styled from 'styled-components';

export const StyleHome = styled.div `
h3{
    text-align: center;
    font-family: cursive;
    color: darkred;
}

.contain{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.table{
    width: 50%;
    text-align: center;
}

.table1{
    width: 100%;
    text-align: center;
}

img{
    width: 100px;
}

img:hover{
    opacity: 0.5;
    cursor: pointer;
}

h5{
    color: darkred;
}

#numberModal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

#orderModal{
    display: none;
}
`;

