export default function isValidAge(field){
    const date = new Date(field.value);

    if(!ageValidation(date)){
        field.setCustomValidity('Menores de idade não podem se cadastrar');
    };
}

function ageValidation(date){
    const currentDate = new Date();
    const date18plus = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate())

    return currentDate >= date18plus;
}