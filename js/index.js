let flagNombre = false;
let flagApellido = false;
let flagEdad = false;
let flagTelefono = false;
let flagDni = false;
let flagEmail = false;
let flagObraSocial = false;

let opcion;
let validacion;
let observacion;
let edad;
let telefono;
let contadorintentos =0;
let turnoAsignado;
const costoConsulta = 27000;
let precioConDescuentoObraSocial;


//--------------------Clases y Constructores------------------

//Representa un turno
class Turno{
    constructor(fecha,usuario=null)
    {
        this.fecha=fecha;
        this.usuario=usuario;
    }
}
//Representa a un usuario
class Usuario{
    constructor(nombre,apellido,edad,dni,telefono,email,obraSocial)
    {
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.dni=dni;
        this.telefono=telefono;
        this.email=email;
        this.obraSocial = obraSocial;
    }
}

//---------------------------Funciones---------------------------

//Funcion de validacion de letras, numeros y correo electronico
function validar(nombre,opcion)
{
    const VALIDAR=1;    
    
    let regex = new RegExp('^[A-Z]+$', 'i')
    let regexNum = new RegExp('^[0-9]+$', 'i')
    let regexEmail = new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$','i');
    let retorno = false;

    if(opcion==VALIDAR)
    {       
        if(regex.test(nombre))
            retorno=true;
    }
    else if(opcion==2)
    {
        if(regexNum.test(nombre))
            retorno=true;
    }
    else{
        if(regexEmail.test(nombre))
            retorno=true;
    }
    return retorno;   
}

//lista de turnos disponibles para los proximos tres meses
function generarTurnosDisponibles()
{
    const turnos = [];
    const diasEnTresMeses=90;
    const turnosPorDia=10;
    let fechaActual = new Date();

    for(let i=0;i<diasEnTresMeses;i++)
    {
        for(let j=0;j<turnosPorDia;j++)
        {
            let turno = new Turno(new Date(fechaActual));
            turnos.push(turno);
        }
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return turnos;
}

const obtenerObservacion = (edad) =>{
    if(edad ===0)
        return "Infante";
    else if(edad > 70 && edad < 100)
        return "Adulto Mayor";
    else
        return "---";
}
//LLenado de Datos Usuario
function obtenerDatosUsuario()
{
    let nombre;
    let apellido;
    let dni;
    let obraSocial;
    let email;

    while(true)
    {
        if(flagNombre == false)
        {
            nombre=prompt("Ingrese su nombre");
            if(nombre!=null && nombre!="")
            {
                opcion=1;
                validacion = validar(nombre,opcion);
                if(validacion)
                    flagNombre=true;
                
            }
        }
        if(flagNombre == true && flagApellido==false)
        {
            apellido=prompt("Ingrese su Apellido");
            if(apellido!=null && apellido!="")
            {
                opcion=1;
                validacion = validar(apellido,opcion);
                if(validacion)
                    flagApellido=true;
                    
            }
        }
        if(flagEdad==false && flagApellido==true)
        {
            edad = prompt("Ingrese su edad");
            if(edad!=null && edad!="")
            {
                
                opcion=2;
                validacion = validar(edad,opcion);
                if(validacion)
                {
                    edad=parseInt(edad);                    
                    if(edad>=0 && edad<100)
                    {
                        observacion=obtenerObservacion(edad);
                        flagEdad=true;
                    }
                    else
                    {
                        flagEdad=false;
                        alert("Debe Ingresar una edad valida");       
                    }
                
                }
            }
            
        }
        if(flagDni==false && flagEdad==true)
        {
            dni = prompt("Ingrese su nro de dni","sin espacion ni puntos");
            opcion=2;
            if(dni!=null && dni!="")
            {
                validacion=validar(dni,opcion);
                    if(validacion)
                    {
                        if(dni.length>=8 && dni.length<=10)
                            flagDni=true;
                        else
                        {
                            flagDni=false;
                            alert("Ingrese un Dni valido");
                        }
                    
                    }                            
            }
        }
            
        
        if(contadorintentos<2)
        {
            if(flagTelefono==false && flagDni==true)
                {
                    telefono = prompt("Ingrese su nro de telefono","3475210566");
            
                    if(telefono==null || telefono=="")
                        telefono="Sin Registro";
                    else
                    {
                        opcion=2;
                        validacion=validar(telefono,opcion);
                        if(validacion)
                        {
                            if(telefono.length>=8 && telefono.length<=10)
                                flagTelefono=true;
                            else
                                alert("Ingrese un Telefono valido");
                                
                        }
                    }
                    
                }
                if(flagEmail==false && flagDni==true )
                {
                    email = prompt("Por favor, ingresa tu direccion de correo electronico: ");
                    if(flagTelefono==true)
                    {
                        if(email==null || email=="")
                            email="Sin Registro";
                        else
                        {
                            opcion=3;
                    
                            validacion = validar(email,opcion);
                            if(validacion)
                                flagEmail=true;
                            else
                                alert("Ingrese un Email valido...");
                        }
                    }
                    else
                    {
                        if(email==null || email=="")
                        {
                            email="Sin Registro"
                            if(contadorintentos<1)
                                alert("Debe ingresar un correo de contacto\nO un número de Telefono para realizar la asignación de turno");
                        }
                        else
                        {
                            opcion=3;
                            validacion = validar(email,opcion);
                            if(validacion)
                                flagEmail=true;
                            else
                                alert("Ingrese un Email valido...");
                        }
                    }
                }
            contadorintentos++;
        }
        if(contadorintentos==2 && flagTelefono==false && flagEmail==false)
        {
            alert("No es posible asignarle Turno sin registro de Telefono y/o correo Electronico!...")
            telefono=email=null;
            obraSocial=null;
            break;
        }
        if(flagObraSocial == false && (flagEmail==true||flagTelefono==true))
        {
                obraSocial = (prompt("¿Tiene obra Social? (si/no):").toLocaleLowerCase()==="si" ? prompt("Ingrese el nombre de su obra Social:") : "Ninguna").toLocaleUpperCase();
                flagObraSocial=true;
                break;
        }
    }
    return new Usuario(nombre,apellido,edad,dni,telefono,email,obraSocial);   
}

// Asigna un turno a un usuario

function asignarTurno(turnos,usuario)
{
    let flagTurno;

    const turnosDisponibles = turnos.filter(turno=>!turno.usuario);
    
    if(turnosDisponibles.length === 0)
    {
        alert("Lo siento, no hay turnos disponibles en los proximos tres meses.");
        return;
    }

    do{
        let mensaje = "Seleccione una fecha para su turno:\n";
    turnosDisponibles.slice(0,5).forEach((turno,index) => {
        mensaje += `${index + 1}.${turno.fecha.toLocaleDateString()}\n`;
    });

    const seleccion = parseInt(prompt(mensaje)) - 1;
    
    if(seleccion >=0 && seleccion<5)
    {
        turnosDisponibles[seleccion].usuario = usuario;
        flagTurno=true;
        alert(`Turno asignado para el ${turnosDisponibles[seleccion].fecha.toLocaleDateString()}.`);
        return(turnosDisponibles[seleccion].fecha.toLocaleDateString());
    }
    else
    {
        flagTurno=false;
        alert("Selección Invalida. Seleccion un turno de la lista");

    }

    }while(flagTurno==false)
}

// Funcion para calcular el descuento por obra social..

const calculoDescuentoOS = function(obraSocial){

    switch(obraSocial){
        case 'OSDE':
            return 0.60;
        case 'PAMI':
            return 0.45;
        case 'MONOTRIBUTO':
            return 0.20;
        default:
            return 0;
    }
}


function obtenerTotal(obraSocial,formaDepago)
{
   

    //Precio con el descuento de la obra social
    precioConDescuentoObraSocial = costoConsulta * ( 1 - calculoDescuentoOS(obraSocial));


    // Aplicar descuento o incremento segun la forma de pago

    let precioFinal;

    if(formaDepago==='efectivo'){
        precioFinal = precioConDescuentoObraSocial * (1 - 0.10); // Descuento del 10%
    }else if(formaDepago === 'tarjeta'){
        precioFinal = precioConDescuentoObraSocial * (1 + 0.10); // Incremento del 10%
    }

    return precioFinal;

}

function imprimirTicket(usuario,tasignado,descobrasocial,descefectivo,desctarjeta)
{
    console.log("-----------------------------------------------------------------");
    console.log("           Se envia ticket de Reserva de turno"                    )
    console.log("------------------------------------------------------------------");
    console.log(`Nombre:${usuario.nombre} Apellido:${usuario.apellido}`);
    console.log(`DNI:${usuario.dni} ObraSocial:${usuario.obraSocial}`);
    console.log("observaciones: " + observacion);
    console.log("------------------------------------------------------------------");
    console.log(`Turno Asignado para:${tasignado}`);
    console.log("Precio Consulta: " + costoConsulta);
    if(usuario.obraSocial==="NINGUNA")
    {
        console.log("No posee Descuento por obra social");
    }
    else
        console.log(`Descuento por ${usuario.obraSocial}:${descobrasocial*100}%`);
    console.log("Recuerde que pagando en efectivo tiene un descuento adicional del 10%");
    console.log("Recuerde que pagando con tarjeta tiene un incremento adicional del 10%");
    console.log(`Precio Descuento Obra:${Math.round(precioConDescuentoObraSocial)} \t Pago Efectivo:${Math.round(descefectivo)}\t Pago Tarjeta:${Math.round(desctarjeta)}`);
    console.log("Gracias por preferirnos...Lo esperamos....");
    console.log("--------------------------------------------------------------------");
}

function principal()
{
    const turnos = generarTurnosDisponibles();
    const usuario = obtenerDatosUsuario();

    if(usuario.telefono==null && usuario.email==null)
    {
        console.log("Faltan Datos para asignar turno...");
    }
    else
    {
        turnoAsignado = asignarTurno(turnos,usuario);
        const descuentoObraSocial = calculoDescuentoOS(usuario.obraSocial);
        const totalEfectivo = obtenerTotal(usuario.obraSocial,'efectivo');
        const totalTarjeta = obtenerTotal(usuario.obraSocial,'tarjeta');  

        imprimirTicket(usuario,turnoAsignado,descuentoObraSocial,totalEfectivo,totalTarjeta);
    }
}

let bienvenido = confirm("BIENVENIDO AL SISTEMA DE GESTION DE TURNOS DE UNILAB\n\n Deseas Agendar un turno con Nosotros? 📆");
if(bienvenido)
{
    principal(); 
}
else
{
    alert("💫 Regresa cuando lo necesites......")
}