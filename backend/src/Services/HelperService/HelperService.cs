using backend.src.Repositories.ProjectRepo;
using backend.src.Repositories.UserRepo;

namespace backend.src.Services.HelperService;

public class HelperService : IHelperService
{
    private readonly IProjectRepo _projectRepo;
    private readonly IUserRepo _userRepo;

    public HelperService(IProjectRepo projectRepo, IUserRepo userRepo)
    {
        _projectRepo = projectRepo;
        _userRepo = userRepo;
    }

    public async Task<bool> CheckUserBelongProject(int userId, int projectId)
    {
        var user = _userRepo.GetById(userId);
        if (user is null)
        {
            return false;
        }

        var project = _projectRepo.GetByIdAsync(projectId);
        if (project is null)
        {
            return false;
        }
        return true;
    }
}