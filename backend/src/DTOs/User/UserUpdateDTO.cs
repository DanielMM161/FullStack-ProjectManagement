namespace backend.src.DTOs.User;

using backend.src.Models;

public class UserUpdateDTO
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;    
    public string Email { get; set; } = null!;

    public void UpdateModel(User model)
    {
        model.FirstName = FirstName;
        model.LastName = LastName;
        model.Email = Email;        
    }
}