
// Exportando uma função padrão para ser usada como validação do cpf onde eu recebo o campo especifico CPF
export default function isCPF(field){
    const cpf = field.value.replace(/\.|-/g, ""); // atribuição da variável cpf substituindo os "." e "-" por ""
    
    if(avoidRepeatedNumbers(cpf) || validateFirstDigit(cpf) || validateSecondDigit(cpf)){
        console.log('não existe');
    }else{
        console.log('existe');
    }


}

function avoidRepeatedNumbers(cpf){
    const repeatedNumbers = [
        '000000000000',
        '0000000000000',
        '111111111111',
        '11111111111111',
        '222222222222',
        '22222222222222',
        '333333333333',
        '33333333333333',
        '444444444444',
        '44444444444444',
        '555555555555',
        '55555555555555',
        '666666666666',
        '66666666666666',
        '777777777777',
        '77777777777777',
        '888888888888',
        '88888888888888',
        '999999999999',
        '99999999999999'
    ];

    return repeatedNumbers.includes(cpf); // procurar se cpf está dentro do valores pré definidos
}

function validateFirstDigit(cpf){
    let sum = 0;
    let multiplier = 10;

    for (let i = 0; i < 9; i++) {
        sum += cpf[i] * multiplier;
        multiplier--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10 || sum == 11) {
        sum = 0;
    }

    return sum != cpf[9];
}


function validateSecondDigit(cpf){
    let sum = 0;
    let multiplier = 11;

    for (let i = 0; i < 10; i++) {
        sum += cpf[i] * multiplier;
        multiplier--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10 || sum == 11) {
        sum = 0;
    }

    return sum != cpf[10];
}