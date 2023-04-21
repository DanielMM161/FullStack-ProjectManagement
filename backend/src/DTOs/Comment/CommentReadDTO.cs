namespace backend.src.DTOs.Comment;

using backend.src.Models;

public class CommentReadDTO : BaseDTO<Comment>
{
    public string Message { get; set; } = null!;
    public string UserName { get; set; } = null!;

}