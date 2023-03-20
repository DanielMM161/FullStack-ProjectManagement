namespace backend.src.DTOs.User;

public class UserUpdateDTO
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;    
    public string Email { get; set; } = null!;
}