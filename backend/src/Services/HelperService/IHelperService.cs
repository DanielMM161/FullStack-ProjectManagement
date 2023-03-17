namespace backend.src.Services.HelperService;

public interface IHelperService
{
    Task<bool> CheckUserBelongProject(int userId, int projectId);
}