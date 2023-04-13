import isCPF from "./cpfValidation.js";
import isValidAge from "./ageValidation.js";

const formFields = document.querySelectorAll("[required]");
const form = document.querySelector("[data-formulario]");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const respostList = {
        "nome": event.target.elements['nome'].value,
        "email": event.target.elements['email'].value,
        "rg": event.target.elements['rg'].value,
        "cpf": event.target.elements['cpf'].value,
        "aniversario": event.target.elements['aniversario'].value,
    }

    localStorage.setItem("register", JSON.stringify(respostList));
    window.location.href = "./abrir-conta-form-2.html";
}) 

formFields.forEach(field => {
    field.addEventListener("blur", () => fieldVerify(field));
    field.addEventListener("invalid", event => event.preventDefault());
})

const errorsType = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const messages = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function fieldVerify(field){
    let message = "";
    field.setCustomValidity('');

    if(field.name === "cpf" && field.value.length >= 11){
        isCPF(field);
    }else if (field.name === "aniversario" && field.value !== ""){
        isValidAge(field);
    }

    errorsType.forEach(error => {
        if(field.validity[error]){
            message = messages[field.name][error];
            console.log(message);
        }
    })

    const messageError = field.parentNode.querySelector('.mensagem-erro');
    const inputValidator = field.checkValidity();

    if(!inputValidator){
        messageError.textContent = message;
    }else{
        messageError.textContent = "";
    }
}
