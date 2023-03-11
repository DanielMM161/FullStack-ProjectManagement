namespace backend.Models;

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

public class User : IdentityUser<int>
{
    [MaxLength(60)]
    public string FirstName { get; set; } = null!;

    [MaxLength(60)]
    public string LastName { get; set; } = null!;

    public ICollection<Project>? Projects { get; set; }

}