namespace backend.src.Helpers;

public static class PasswordGenerator
{
    private const string _validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_-+={}[]|\\:;\"'<>,.?/";

    public static string Generate()
    {
        var random = new Random();
        var password = new char[12]; // aumentamos la longitud de la contraseña a 12 para incluir los requisitos mínimos
        
        // Agregamos los caracteres requeridos a la contraseña
        password[0] = _validChars[random.Next(62, _validChars.Length)]; // carácter especial
        password[1] = (char)random.Next(1, 10); // dígito
        password[2] = _validChars[random.Next(10, 35)]; // letra minúscula
        password[3] = _validChars[random.Next(36, 61)]; // letra mayúscula
        password[4] = (char)random.Next(1, 10); // dígito
        password[5] = _validChars[random.Next(10, 35)]; // letra minúscula
        password[6] = _validChars[random.Next(36, 61)]; // letra mayúscula
        password[7] = (char)random.Next(1, 10); // dígito
        password[8] = _validChars[random.Next(10, 35)]; // letra minúscula
        password[9] = _validChars[random.Next(36, 61)]; // letra mayúscula
        password[10] = _validChars[random.Next(_validChars.Length)]; // cualquier caracter válido
        password[11] = _validChars[random.Next(_validChars.Length)]; // cualquier caracter válido
        
        // Barajamos los caracteres de la contraseña
        for (int i = password.Length - 1; i > 0; i--)
        {
            int j = random.Next(i + 1);
            char temp = password[i];
            password[i] = password[j];
            password[j] = temp;
        }
        
        return new string(password);
    }
}