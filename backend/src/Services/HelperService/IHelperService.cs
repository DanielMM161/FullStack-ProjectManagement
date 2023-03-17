namespace backend.src.Services.HelperService;

using backend.src.Models;

public interface IHelperService
{
    bool CheckUserBelongProject(int userId, Project project);
}