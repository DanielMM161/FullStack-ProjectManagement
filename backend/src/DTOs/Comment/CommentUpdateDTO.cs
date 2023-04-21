namespace backend.src.DTOs.Comment;

using System.ComponentModel.DataAnnotations;
using backend.src.Models;

public class CommentUpdateDTO : BaseDTO<Comment>
{
    [Required]
    public string Message { get; set; } = null!;
}