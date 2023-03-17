namespace backend.src.Services.HelperService;

using backend.src.Models;
using backend.src.Repositories.ProjectRepo;
using backend.src.Repositories.UserRepo;

public class HelperService : IHelperService
{
    private readonly IProjectRepo _projectRepo;
    private readonly IUserRepo _userRepo;

    public HelperService(IProjectRepo projectRepo, IUserRepo userRepo)
    {
        _projectRepo = projectRepo;
        _userRepo = userRepo;
    }

    public bool CheckUserBelongProject(int userId, Project project)
    {
        return project.Users.Select(u => u.Id).Contains(userId);
    }
}