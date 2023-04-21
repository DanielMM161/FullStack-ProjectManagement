namespace backend.src.Repositories.CommentRepo;

using backend.src.Db;
using backend.src.Models;
using backend.src.Repositories.BaseRepo;
using Microsoft.EntityFrameworkCore;

public class CommentRepo : BaseRepo<Comment>, ICommentRepo
{
    public CommentRepo(AppDbContext context) : base(context)
    {}

    public async Task<ICollection<Comment>> GetCommentByTask(int taskId)
    {
        return await _context.Comments
            .AsNoTracking()
            .Where(c => c.TaskId == taskId)
            .ToArrayAsync();
    }
}