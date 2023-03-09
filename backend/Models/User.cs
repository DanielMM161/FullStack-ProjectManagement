using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class User : IdentityUser<int>
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
}