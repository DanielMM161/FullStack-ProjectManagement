namespace backend.src.Helpers;

public static class PasswordGenerator
{
    private const string _validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_-+={}[]|\\:;\"'<>,.?/";

    public static string Generate()
    {
        var random = new Random();
        var password = new char[8];
        
        // Add the required characters to the password
        password[0] = _validChars[random.Next(_validChars.Length)];
        password[1] = char.ToUpper(_validChars[random.Next(26)]);
        password[2] = _validChars[random.Next(14, 26)];
        password[3] = _validChars[random.Next(26, 38)];
        
        // Add the remaining characters to the password
        for (int i = 4; i < password.Length; i++)
        {
            password[i] = _validChars[random.Next(_validChars.Length)];
        }
        
        // Shuffle the password characters
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