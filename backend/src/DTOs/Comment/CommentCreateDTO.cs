namespace backend.src.DTOs.Comment;

using System.ComponentModel.DataAnnotations;
using backend.src.Models;

public class CommentCreateDTO : BaseDTO<Comment>
{
    [Required]
    public string Message { get; set; } = null!;
    [Required]
    public int TaskId { get; set; }
    [Required]
    public int UserId { get; set; }
}