namespace backend.src.DTOs.User;

public class UserReadDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;    
    public string Email { get; set; } = null!;
    public byte[] PictureProfile { get; set; } = null!;
    public string Token { get; set; } = null!;
    public DateTime TokenExpiration { get; set; }
}