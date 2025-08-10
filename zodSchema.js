import z from "zod";




const registrarUsuarioSchema = z.object({
    nombreDeUsuario: z.string("el nombre debe ser un texto").min(3, "muy corto el nombre (min: 3 characters)").max(20, "muy largo el nombre(max: 20 characters)").refine(
        (val) => !val.includes(" "),
        "El usuario no puede contener espacios"
    ),


    email: z.email("tiene que ser un formato mail").min(4).max(100),


    edad: z.number("tiene que ser un numero").min(18, "solo mayores de 18").max(122, "no creo que seas tan viejo/a"),


    contraseña: z.string().min(5, "contraseña muy corta(min: 5 characters)")
})



const cambiarNombreDeUsuarioSchema = z.object({
    nuevoNombreDeUsuario: z.string("el nuevo nombre debe ser un texto").min(3, "muy corto el nuevo nombre (min: 3 characters)").max(20, "muy largo el nuevo nombre(max: 20 characters)").refine(
        (val) => !val.includes(" "),
        "El nuevo usuario no puede contener espacios"
    )
})


export {registrarUsuarioSchema, cambiarNombreDeUsuarioSchema}
