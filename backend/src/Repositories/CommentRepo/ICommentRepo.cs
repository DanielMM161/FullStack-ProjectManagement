namespace backend.src.Repositories.CommentRepo;

using backend.src.Models;
using backend.src.Repositories.BaseRepo;

public interface ICommentRepo : IBaseRepo<Comment>
{
    Task<ICollection<Comment>> GetCommentByTask(int taskId);
}