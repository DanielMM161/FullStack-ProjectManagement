namespace backend.src.Models;

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

public class User : IdentityUser<int>
{
    [MaxLength(60)]
    public string FirstName { get; set; } = null!;
    [MaxLength(60)]
    public string? LastName { get; set; }
    public ICollection<Project>? Projects { get; set; }
    public ICollection<TaskList>? Tasks { get; set; } = null!;
    public ICollection<TaskList>? Creator { get; set; } = null!;
    public ICollection<Comment>? Comments { get; set; } = null!;
    public bool SessionActive { get; set; } = false;
}