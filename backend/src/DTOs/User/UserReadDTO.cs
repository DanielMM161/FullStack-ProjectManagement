namespace backend.src.DTOs.User;

public class UserReadDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;    
    public string Email { get; set; } = null!;
    public byte[] ImageProfile { get; set; } = null!;
}